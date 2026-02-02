const cloudinary = require("../config/cloudinary");
const Application = require("../models/application");
const streamifier = require("streamifier");

// Apply Job
exports.applyJob = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Resume required ❌" });
    }

    // Upload using stream
    const uploadFromBuffer = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: "auto" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await uploadFromBuffer();

    // Save application
    const application = await Application.create({
      job: req.params.jobId,
      user: req.userId,
      resumeUrl: result.secure_url,
    });

    res.status(201).json({
      message: "Applied Successfully ✅",
      application,
    });

  } catch (err) {
    console.log("Apply Error:", err);
    res.status(500).json({ error: err.message });
  }
};
exports.getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ user: req.userId })
      .populate("job", "title company location salary");

    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
