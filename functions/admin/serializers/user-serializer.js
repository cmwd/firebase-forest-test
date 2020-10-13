const util = require("util");
const JSONAPI = require("jsonapi-serializer");

const UserSerializer = new JSONAPI.Serializer("user", {
  id: "uid",
  attributes: [
    "email",
    "emailVerified",
    "displayName",
    "creationTime",
    "lastSignInTime",
  ],
  keyForAttribute: "underscore_case",
  transform(record) {
    return { ...record, ...record.metadata };
  },
});

const UserDeserializer = new JSONAPI.Deserializer({
  keyForAttribute: "camelCase",
});

UserDeserializer.deserialize = util.promisify(
  UserDeserializer.deserialize.bind(UserDeserializer)
);

module.exports = {
  serialize: (...args) => UserSerializer.serialize(...args),
  deserialize: (...args) => UserDeserializer.deserialize(...args),
};
