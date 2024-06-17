const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../model/User.js");

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

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(200).json({
      email: email,
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
        .json({ message: "Invalid email or the passsword" });
    }
    if (password !== user.password) {
      return res
        .status(401)
        .json({ message: "Invalid email or the passsword" });
    }
    res.status(200).json({
      isOK: true,
      message: "Successfully Login",
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(501).json({
      isOK: false,
      message: "Please input valid email and the password",
    });
  }
});

module.exports = router;
