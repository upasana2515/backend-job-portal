// const Job = require("../models/job");

// // Create Job
// exports.createJob = async (req, res) => {
//   try {
//     const job = await Job.create({
//       ...req.body,
//       createdBy: req.userId,
//     });

//     res.status(201).json({
//       message: "Job Posted ✅",
//       job,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Get All Jobs
// exports.getJobs = async (req, res) => {
//   try {
//     const jobs = await Job.find().populate("createdBy", "name email");

//     res.status(200).json(jobs);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.deleteJob = async (req, res) => {

//   try {

//     console.log("DELETE ROUTE HIT");

//     await Job.findByIdAndDelete(req.params.id);

//     res.status(200).json({
//       message: "Job Deleted"
//     });

//   } catch (err) {

//     res.status(500).json({
//       error: err.message
//     });

//   }
// };


const Job = require("../models/job");

exports.createJob = async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, createdBy: req.userId });
    res.status(201).json({ message: "Job Posted ✅", job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const { search, location, type } = req.query;
    let filter = {};
    if (search) filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
    if (location) filter.location = { $regex: location, $options: "i" };
    if (type) filter.type = type;

    const jobs = await Job.find(filter).populate("createdBy", "username email").sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job Deleted ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.toggleJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    job.isOpen = !job.isOpen;
    await job.save();
    res.json({ message: `Job ${job.isOpen ? "opened" : "closed"} ✅`, job });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

