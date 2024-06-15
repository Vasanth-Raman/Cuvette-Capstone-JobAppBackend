const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("../capstone-backend-app/config/dbConifg.js");

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Good to go",
  });
});

app.listen(PORT, () => {
  connectDb();
});
