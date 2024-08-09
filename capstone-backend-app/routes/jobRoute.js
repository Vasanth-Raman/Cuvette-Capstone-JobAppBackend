const express = require("express");
const jobRouter = express.Router();
const validateNewJob = require("../middlewares/validateNewJob.js");
const verifyToken = require("../middlewares/verifyToken.js");
const {
  getFilteredJob,
  getJobById,
  addNewJob,
  updateExistingJob,
  deleteJob,
} = require("../controllers/jobController.js");

jobRouter.get("/", getFilteredJob);

jobRouter.get("/:id", getJobById);

jobRouter.post("/add", verifyToken, validateNewJob, addNewJob);

jobRouter.put("/update/:id", verifyToken, validateNewJob, updateExistingJob);

jobRouter.delete("/delete/:id", verifyToken, deleteJob);

module.exports = jobRouter;

// companyName,
//     title,
//     description,
//     logoUrl,
//     salary,
//     location,
//     duration,
//     locationType,
//     information,
//     jobType,
//     skills,
//     refUserId,
