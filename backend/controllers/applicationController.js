// const cloudinary = require("../config/cloudinary");
// const Application = require("../models/application");
// const streamifier = require("streamifier");

// // GET MY APPLICATIONS
// exports.getMyApplications = async (req, res) => {
//   try {

//     console.log("ROUTE HIT ✅");

//     const applications = await Application.find({
//       user: req.userId,
//     }).populate("job", "title company location salary");

//     console.log("USER:", req.userId);
//     console.log("APPLICATIONS:", applications);

//     res.status(200).json(applications);

//   } catch (err) {
//     console.log(err);

//     res.status(500).json({
//       error: err.message,
//     });
//   }
// };

// // APPLY JOB
// exports.applyJob = async (req, res) => {
//   try {

//     if (!req.file) {
//       return res.status(400).json({
//         message: "Resume required ❌",
//       });
//     }

//     const uploadFromBuffer = () => {
//       return new Promise((resolve, reject) => {

//         const stream = cloudinary.uploader.upload_stream(
//           { resource_type: "raw" },

//           (error, result) => {
//             if (error) reject(error);
//             else resolve(result);
//           }
//         );

//         streamifier
//           .createReadStream(req.file.buffer)
//           .pipe(stream);

//       });
//     };

//     const result = await uploadFromBuffer();

//     const application = await Application.create({
//       job: req.params.jobId,
//       user: req.userId,
//       resumeUrl: result.secure_url,
//     });

//     res.status(201).json({
//       message: "Applied Successfully ✅",
//       application,
//     });

//   } catch (err) {

//     console.log("Apply Error:", err);

//     res.status(500).json({
//       error: err.message,
//     });
//   }
// };

// // GET ALL APPLICATIONS
// exports.getApplications = async (req, res) => {
//   try {

//     const applications = await Application.find()
//       .populate("user", "name email")
//       .populate("job", "title");

//     res.status(200).json(applications);

//   } catch (err) {

//     res.status(500).json({
//       error: err.message,
//     });
//   }
// };


// const cloudinary = require("../config/cloudinary");
// const Application = require("../models/application");
// const streamifier = require("streamifier");

// exports.applyJob = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "Resume required ❌" });

//     // Check if already applied
//     const existing = await Application.findOne({ job: req.params.jobId, user: req.userId });
//     if (existing) return res.status(400).json({ message: "You have already applied for this job ❌" });

//     const uploadFromBuffer = () =>
//       new Promise((resolve, reject) => {
//        const stream = cloudinary.uploader.upload_stream(
//   { resource_type: "raw", folder: "resumes" },
//   (error, result) => (error ? reject(error) : resolve(result))
// );
//         streamifier.createReadStream(req.file.buffer).pipe(stream);
//       });

//     const result = await uploadFromBuffer();

//     const application = await Application.create({
//       job: req.params.jobId,
//       user: req.userId,
//       resumeUrl: result.secure_url,
//     });

//     res.status(201).json({ message: "Applied Successfully ✅", application });
//   } catch (err) {
//     if (err.code === 11000) {
//       return res.status(400).json({ message: "You have already applied for this job ❌" });
//     }
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getMyApplications = async (req, res) => {
//   try {
//     const applications = await Application.find({ user: req.userId })
//       .populate("job", "title company location salary type isOpen");
//     res.status(200).json(applications);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getApplications = async (req, res) => {
//   try {
//     const applications = await Application.find()
//       .populate("user", "username email")
//       .populate("job", "title company location");
//     res.status(200).json(applications);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.checkApplied = async (req, res) => {
//   try {
//     const existing = await Application.findOne({ job: req.params.jobId, user: req.userId });
//     res.json({ applied: !!existing });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


const Application = require("../models/application");

exports.applyJob = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Resume required ❌" });

    const existing = await Application.findOne({ job: req.params.jobId, user: req.userId });
    if (existing) return res.status(400).json({ message: "You have already applied ❌" });

    const resumeUrl = `http://localhost:5000/uploads/${req.file.filename}`;

    const application = await Application.create({
      job: req.params.jobId,
      user: req.userId,
      resumeUrl,
    });

    res.status(201).json({ message: "Applied Successfully ✅", application });
  } catch (err) {
    console.error("Apply error:", err.message);
    if (err.code === 11000)
      return res.status(400).json({ message: "You have already applied ❌" });
    res.status(500).json({ error: err.message });
  }
};

exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.userId })
      .populate("job", "title company location salary type isOpen");
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("user", "username email")
      .populate("job", "title company location");
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.checkApplied = async (req, res) => {
  try {
    const existing = await Application.findOne({ job: req.params.jobId, user: req.userId });
    res.json({ applied: !!existing });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const app = await Application.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!app) return res.status(404).json({ message: "Application not found" });
    res.json({ message: "Status updated ✅", app });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const app = await Application.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!app) return res.status(404).json({ message: "Not found or unauthorized" });
    res.json({ message: "Application withdrawn ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};