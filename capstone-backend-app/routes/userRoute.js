const express = require("express");
const router = express.Router();
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
    const newUser = await User.create({
      name,
      email,
      password,
    });

    res.status(200).json({
      //   user: newUser,
      status: "success",
      message: "User created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: "Please provide required info",
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
