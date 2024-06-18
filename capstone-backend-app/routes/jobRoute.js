const express = require("express");
const router = express.Router();
const Job = require("../model/Job.js");
const validateNewJob = require("../middlewares/validateNewJob.js");

router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find({}).lean();
    res.status(200).json({
      status: "ok",
      message: "Working fine data fetched",
      jobs: jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "internal server error",
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findOne({ _id: id }).lean();
    if (!job) {
      return res.status(400).json({
        message: "Job not found",
      });
    }
    res.status(200).json({
      status: "ok",
      job: job,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "internal server error",
    });
  }
});

router.post("/add", validateNewJob, async (req, res) => {
  const {
    companyName,
    logoUrl,
    jobPosition,
    monthlySalary,
    jobType,
    remote,
    location,
    jobDescription,
    aboutCompany,
    skillsRequired,
    additionalInformation,
    author,
  } = req.body;
  try {
    const newJob = await Job.create({
      companyName,
      logoUrl,
      jobPosition,
      monthlySalary,
      jobType,
      remote,
      location,
      jobDescription,
      aboutCompany,
      skillsRequired,
      additionalInformation,
      author,
    });
    res.status(201).json({
      status: "ok",
      message: "Job added successfully",
      jobId: newJob._id,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      message: "internal server error",
    });
  }
});

module.exports = router;
