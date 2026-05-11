// const express = require("express");
// const { createJob, getJobs, deleteJob } = require("../controllers/jobController");
// const auth = require("../middleware/auth");

// const router = express.Router();

// // Protected: only logged user can post
// router.post("/", auth, createJob);

// // Public: anyone can see jobs
// router.get("/", getJobs);

// // Protected: only logged user can delete
// router.delete("/:id", deleteJob);

// module.exports = router;





// const express = require("express");

// const router = express.Router();

// const jobController = require("../controllers/jobController");

// router.post("/", jobController.createJob);

// router.get("/", jobController.getJobs);

// router.delete("/:id", jobController.deleteJob);

// module.exports = router;





const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { createJob, getJobs, deleteJob, toggleJob } = require("../controllers/jobController");

router.get("/", getJobs);
router.post("/", auth, createJob);
router.delete("/:id", auth, deleteJob);
router.patch("/:id/toggle", auth, toggleJob);
module.exports = router;
