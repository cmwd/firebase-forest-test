const Firebase = require("firebase-admin");

const Serializer = require("../serializers");

async function list(request, response, next) {
  try {
    const { users } = await Firebase.auth().listUsers();

    response.send(Serializer.User.serialize(users));
  } catch (err) {
    next(err);
  }
}

async function details(request, response, next) {
  try {
    const user = await Firebase.auth().getUser(request.params.id);

    response.send(Serializer.User.serialize(user));
  } catch (err) {
    next(err);
  }
}

module.exports = { list, details };
