// const express = require("express");
// const{ applyJob , getMyApplications } = require("../controllers/applicationController");
// const auth = require("../middleware/auth");
// const upload = require("../middleware/upload");
// const router = express.Router();

// // Apply Job
// router.post("/:jobId", auth, upload.single("resume"), applyJob);
// router.get("/my", auth, getMyApplications);

// module.exports = router;











// const express = require("express");

// const router = express.Router();

// const auth = require("../middleware/auth");

// const upload = require("../middleware/upload");

// const {
//   applyJob,
//   getApplications,
//   getMyApplications,
// } = require("../controllers/applicationController");

// const {
//   applyJob,
//   getApplications,
// } = require("../controllers/applicationController");

// // Apply for a job
// router.post(
//   "/:jobId",
//   auth,
//   upload.single("resume"),
//   applyJob
// );

// // Get all applications
// router.post("/:jobId", authMiddleware, upload.single("resume"), applyJob);
// router.get("/my", authMiddleware, getMyApplications);
// router.get("/", auth, getApplications);

// module.exports = router;


// const express = require("express");
// const router = express.Router();

// const upload = require("../middleware/upload");
// const authMiddleware = require("../middleware/auth");

// const {
//   applyJob,
//   getApplications,
//   getMyApplications,
// } = require("../controllers/applicationController");

// // GET MY APPLICATIONS
// router.get("/my", authMiddleware, getMyApplications);

// // GET ALL APPLICATIONS
// router.get("/", getApplications);

// // APPLY JOB
// router.post(
//   "/:jobId",
//   authMiddleware,
//   upload.single("resume"),
//   applyJob
// );

// module.exports = router;

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const {
  applyJob,
  getMyApplications,
  getApplications,
  checkApplied,
  updateStatus,
  deleteApplication,
} = require("../controllers/applicationController");

router.get("/my", auth, getMyApplications);
router.get("/check/:jobId", auth, checkApplied);
router.get("/", getApplications);

router.post("/:jobId", auth, (req, res, next) => {
  upload.single("resume")(req, res, (err) => {
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
}, applyJob);

router.patch("/:id/status", auth, updateStatus);
router.delete("/:id", auth, deleteApplication);

module.exports = router;