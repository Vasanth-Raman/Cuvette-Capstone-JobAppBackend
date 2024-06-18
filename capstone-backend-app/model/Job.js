const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  logoUrl: {
    type: String,
    required: true,
  },
  jobPosition: {
    type: String,
    required: true,
  },
  monthlySalary: {
    type: Number,
    required: true,
  },
  jobType: {
    type: String,
    required: true,
  },
  remote: {
    type: Boolean,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  aboutCompany: {
    type: String,
    required: true,
  },
  skillsRequired: [
    {
      type: String,
      required: true,
    },
  ],
  additionalInformation: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
