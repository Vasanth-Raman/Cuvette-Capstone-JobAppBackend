const express = require("express");
const router = express.Router();
const Job = require("../model/Job.js");
const validateNewJob = require("../middlewares/validateNewJob.js");

router.get("/", async (req, res, next) => {
  const { minSalary, maxSalary, jobType, location, remote, specificSkill } =
    req.query;
  console.log(minSalary, maxSalary, jobType, location, remote, specificSkill);

  const skillArray = specificSkill ? specificSkill.split(",") : [];
  //const remoteCheck = remote === "true" ? true : false;
  try {
    const jobs = await Job.find({
      monthlySalary: {
        $gte: minSalary || 0,
        $lte: maxSalary || 99999900,
      },
      jobType: jobType || { $exists: true },
      location: location || { $exists: true },
      remote: remote === "true" || { $exists: true }, // remote
      skillsRequired:
        skillArray.length > 0 ? { $in: skillArray } : { $exists: true },
    }).lean();
    res.status(200).json({
      status: "ok",
      message: "Working fine data fetched",
      jobs: jobs,
    });
  } catch (error) {
    console.error(error); // Log the original error for debugging
    // const customError = error;
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
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
    console.error(error); // Log the original error for debugging
    // const customError = error;
    next(error);
  }
});

router.post("/add", validateNewJob, async (req, res, next) => {
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
    console.error(error); // Log the original error for debugging
    // const customError = error;
    next(error);
  }
});

module.exports = router;
