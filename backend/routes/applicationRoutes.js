const express = require("express");
const{ applyJob , getMyApplications } = require("../controllers/applicationController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();

// Apply Job
router.post("/:jobId", auth, upload.single("resume"), applyJob);
router.get("/my", auth, getMyApplications);

module.exports = router;

