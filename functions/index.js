const functions = require("firebase-functions");

const { forestadmin } = functions.config();

process.env.FOREST_AUTH_SECRET = forestadmin.auth_secret;
process.env.FOREST_ENV_SECRET = forestadmin.env_secret;

exports.admin = functions.https.onRequest(require("./admin/app"));
