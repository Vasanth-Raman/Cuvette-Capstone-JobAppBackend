const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(`DB is connected and server is running at port ${PORT}`);
  } catch (error) {
    console.error("Database connection error : ", error);
  }
}

module.exports = connectDb;
