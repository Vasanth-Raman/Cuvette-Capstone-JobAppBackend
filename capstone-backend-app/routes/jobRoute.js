const express = require("express");
const router = express.Router();
const validateNewJob = require("../middlewares/validateNewJob.js");
const verifyToken = require("../middlewares/verifyToken.js");
const {
  getFilteredJob,
  getJobById,
  addNewJob,
} = require("../controllers/jobController.js");

router.get("/", getFilteredJob);

router.get("/:id", getJobById);

router.post("/add", verifyToken, validateNewJob, addNewJob);

module.exports = router;

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
