const express = require("express");
const router = express.Router();
const validateNewUser = require("../middlewares/validateNewUser.js");
const {
  getUsers,
  createNewUser,
  userLogin,
} = require("../controllers/userController.js");

console.log(getUsers, createNewUser, userLogin);

router.get("/", getUsers);

router.post("/register", validateNewUser, createNewUser);

router.post("/login", userLogin);

module.exports = router;
