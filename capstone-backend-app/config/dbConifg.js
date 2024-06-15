const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`DB is connected and server is running`);
  } catch (error) {
    console.error("Database connection error : ", error);
  }
}

module.exports = connectDb;
