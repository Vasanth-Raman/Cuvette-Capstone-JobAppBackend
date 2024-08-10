const express = require("express");
const UserRouter = express.Router();
const validateNewUser = require("../middlewares/validateNewUser.js");
const {
  getUsers,
  createNewUser,
  userLogin,
} = require("../controllers/userController.js");

console.log(getUsers, createNewUser, userLogin);

UserRouter.get("/", getUsers);

UserRouter.post("/register", validateNewUser, createNewUser);

UserRouter.post("/login", userLogin);

module.exports = UserRouter;
