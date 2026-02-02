const Job = require("../models/job");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      createdBy: req.userId,
    });

    res.status(201).json({
      message: "Job Posted ✅",
      job,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "name email");

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
