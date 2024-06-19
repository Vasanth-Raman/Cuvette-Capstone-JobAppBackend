const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User.js");
const dotenv = require("dotenv").config();

const secret = process.env.SECRET_JWT_CODE;

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().lean();
    res.json({
      check: "ok",
      data: users,
    });
  } catch (error) {
    console.error(error); // Log the original error for debugging
    // const customError = error;
    next(error);
  }
};

const createNewUser = async (req, res, next) => {
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
    console.error(error); // Log the original error for debugging
    // const customError = error;
    next(error);
  }
};

const userLogin = async (req, res, next) => {
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
    const jsToken = jwt.sign({ userId: user._id }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({
      isOK: true,
      message: "Successfully Login",
      token: jsToken,
    });
  } catch (error) {
    console.error(error); // Log the original error for debugging
    // const customError = error;
    next(error);
  }
};

module.exports = {
  getUsers,
  createNewUser,
  userLogin,
};
