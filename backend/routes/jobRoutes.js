const express = require("express");
const { createJob, getJobs } = require("../controllers/jobController");
const auth = require("../middleware/auth");

const router = express.Router();

// Protected: only logged user can post
router.post("/", auth, createJob);

// Public: anyone can see jobs
router.get("/", getJobs);

module.exports = router;
