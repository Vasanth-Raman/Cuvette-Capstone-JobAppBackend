const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User.js");
const dotenv = require("dotenv").config();
const validateNewUser = require("../middlewares/validateNewUser.js");

const secret = process.env.SECRET_JWT_CODE;

router.get("/", async (req, res) => {
  try {
    const users = await User.find().lean();
    res.json({
      check: "ok",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "internal server error",
    });
  }
});

router.post("/register", validateNewUser, async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exist",
      });
    }

    //hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      email: newUser.email,
      status: "success",
      message: "User created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: "An error occurred during registration. Please try again.",
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not exist, Please siginup" });
    }

    //verify the hashed password
    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return res
        .status(401)
        .json({ message: "Invalid email or the passsword" });
    }

    //generating jwt token
    const jsToken = jwt.sign({ email: user.email }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({
      isOK: true,
      message: "Successfully Login",
      token: jsToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: "An error occurred during login. Please try again.",
    });
  }
});

module.exports = router;
