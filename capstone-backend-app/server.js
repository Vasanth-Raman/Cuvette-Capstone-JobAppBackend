const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConfig.js");
const userRoute = require("./routes/userRoute.js");
const jobRouter = require("./routes/jobRoute.js");
const globalCatches = require("./middlewares/globalCatches.js");
// const router = express.Router();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
// app.use(router);

app.use("/user", userRoute);
app.use("/jobs", jobRouter);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "Success",
    message: "Good to go",
    date: new Date().toLocaleDateString(),
  });
});

app.use(globalCatches);

app.listen(PORT,async () => {
  console.clear();
await connectDb();
});
