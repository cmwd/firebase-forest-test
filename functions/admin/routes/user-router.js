const express = require("express");
const { PermissionMiddlewareCreator } = require("forest-express-sequelize");

const Controller = require("../controllers/user-controller");

const router = express.Router();
const permissionMiddlewareCreator = new PermissionMiddlewareCreator("user");

router
  .get("/user", permissionMiddlewareCreator.list(), Controller.list)
  .get("/user/:id", permissionMiddlewareCreator.details(), Controller.details);

module.exports = router;
