const Job = require("../model/Job.js");

const getFilteredJob = async (req, res, next) => {
  const {
    minSalary,
    maxSalary,
    jobType,
    location,
    locationType,
    specificSkill,
  } = req.query;

  console.log(
    minSalary,
    maxSalary,
    jobType,
    location,
    locationType,
    specificSkill
  );

  const skillArray = specificSkill ? specificSkill.split(",") : [];

  try {
    const jobs = await Job.find({
      salary: {
        $gte: minSalary || 0,
        $lte: maxSalary || 99999900,
      },
      jobType: jobType || { $exists: true },
      location: location || { $exists: true },
      locationType: locationType || { $exists: true },
      skills: skillArray.length > 0 ? { $in: skillArray } : { $exists: true },
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
};

const getJobById = async (req, res, next) => {
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
};

const addNewJob = async (req, res, next) => {
  const {
    companyName,
    title,
    description,
    logoUrl,
    salary,
    location,
    duration,
    locationType,
    information,
    jobType,
    skills,
  } = req.body;

  const refUserId = req.userId;

  try {
    const newJob = await Job.create({
      companyName,
      title,
      description,
      logoUrl,
      salary,
      location,
      duration,
      locationType,
      information,
      jobType,
      skills,
      refUserId,
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
};

module.exports = {
  getFilteredJob,
  getJobById,
  addNewJob,
};

// companyName,
// title,
// description,
// logoUrl,
// salary,
// location,
// duration,
// locationType,
// information,
// jobType,
// skills,
// refUserId,
