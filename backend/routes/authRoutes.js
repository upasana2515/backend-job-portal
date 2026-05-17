// const express = require("express");
// const {register,login} = require("../controllers/authController");
// const router = express.Router();
// router.post("/register",register);
// router.post("/login",login);
// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const { register, login } = require("../controllers/authController");

// router.post("/register", register);
// router.post("/login", login);

// module.exports = router;


const express = require("express");
const router = express.Router();
// const { register, login, getMe } = require("../controllers/authController");
const { register, login, getMe, verifyOtp } = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, getMe);  // NEW
router.post("/verify-otp", verifyOtp);

module.exports = router;