#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const Commander = require("commander");
const LumberAPI = require("lumber-cli/services/api");
const LumberKeyGenerator = require("lumber-cli/services/key-generator");

const program = new Commander.Command();

program
  .storeOptionsAsProperties(false)
  .requiredOption("-n, --name <string>", "Project name")
  .requiredOption("-t --token <string>", "Forestadmin token");

const params = program.parse(process.argv).opts();

async function init(name, token) {
  try {
    const [project, authSecret] = await Promise.all([
      LumberAPI.createProject({}, token, { name }),
      new LumberKeyGenerator().generate(),
    ]);
    const envSecret = project.defaultEnvironment.secretKey;

    fs.writeFileSync(
      path.resolve(__dirname, "../functions/admin/.env"),
      [
        `FOREST_AUTH_SECRET=${authSecret}`,
        `FOREST_ENV_SECRET=${envSecret}`,
      ].join("\n")
    );
    fs.writeFileSync(
      path.resolve(__dirname, "../functions/.runtimeconfig.json"),
      JSON.stringify(
        {
          forestadmin: { auth_secret: authSecret, env_secret: envSecret },
        },
        null,
        4
      )
    );

    console.log("Ready");
  } catch (err) {
    if (err.response) {
      console.error(JSON.stringify(err.response.body, null, 4));
    } else {
      console.error(err);
    }

    process.exit(1);
  }
}

init(params.name, params.token);
