// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt=require("jsonwebtoken");

// // Register
// exports.register = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Check if user exists
//     const oldUser = await User.findOne({ email });
//     if (oldUser) {
//       return res.status(400).json({ message: "User already exists ❌" });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Save user
//     // const user = await User.create({
//     //   name,
//     //   email,
//     //   password: hashedPassword,
//     // });
//     const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//     role,
//   });

//     res.status(201).json({
//       message: "User Registered ✅",
//       user,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// exports.register = async (req, res) => {
//   try {

//     console.log(req.body);

//     const { username, email, password, role } = req.body;

//     // check existing user
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({
//         message: "User already exists",
//       });
//     }

//     // hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // create user
//     const user = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//       role,
//     });

//     res.status(201).json({
//       message: "Registration successful",
//       user,
//     });

//   } catch (error) {

//     console.log("REGISTER ERROR:", error);

//     res.status(500).json({
//       error: error.message,
//     });
//   }
// };

// // Login
// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "User not found ❌" });
//     }

//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid password ❌" });
//     }

//     // Create token
//     const token = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       message: "Login successful ✅",
//       token,
//       role: user.role,
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// exports.register = async (req, res) => {
//   try {
//     const { username, email, password, role } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ username, email, password: hashedPassword, role });

//     // Auto-login after register: create token immediately
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     res.status(201).json({
//       message: "Registration successful",
//       token,
//       role: user.role,
//       username: user.username,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found ❌" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password ❌" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     res.json({
//       message: "Login successful ✅",
//       token,
//       role: user.role,
//       username: user.username,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };





// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");

// exports.register = async (req, res) => {
//   try {
//     const { username, email, password, role } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await User.create({ username, email, password: hashedPassword, role });
//     const token = jwt.sign(
//   { id: user._id, username: user.username, role: user.role },
//   process.env.JWT_SECRET,
//   { expiresIn: "7d" }
// );

//     res.status(201).json({ message: "Registration successful", token, role: user.role, username: user.username });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found ❌" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password ❌" });

//    const token = jwt.sign(
//   { id: user._id, username: user.username, role: user.role },
//   process.env.JWT_SECRET,
//   { expiresIn: "7d" }
// );
//     res.json({ message: "Login successful ✅", token, role: user.role, username: user.username });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found ❌" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid password ❌" });

//     // Generate 6-digit OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     user.otp = otp;
//     user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
//     await user.save();

//     // Send OTP email
//     const nodemailer = require("nodemailer");
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"JobHive 🌿" <${process.env.EMAIL_USER}>`,
//       to: user.email,
//       subject: "Your JobHive Login OTP",
//       html: `
//         <div style="font-family:sans-serif;max-width:400px;margin:auto;padding:30px;border-radius:12px;border:1px solid #eee">
//           <h2 style="color:#2d6a4f">🌿 JobHive</h2>
//           <p>Your one-time login code is:</p>
//           <h1 style="letter-spacing:8px;color:#2d6a4f">${otp}</h1>
//           <p style="color:#999">Valid for 10 minutes. Do not share this with anyone.</p>
//         </div>
//       `,
//     });

//     res.json({ message: "OTP sent to your email ✅", requiresOtp: true, email });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });
//     if (!user.otp || user.otp !== otp)
//       return res.status(400).json({ message: "Invalid OTP ❌" });
//     if (user.otpExpiry < new Date())
//       return res.status(400).json({ message: "OTP expired. Please login again ❌" });

//     // Clear OTP
//     user.otp = null;
//     user.otpExpiry = null;
//     await user.save();

//     const token = jwt.sign(
//       { id: user._id, username: user.username, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({ message: "Login successful ✅", token, role: user.role, username: user.username });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // NEW — fetch current user info from token
// exports.getMe = async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select("username email role");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({ username: user.username, email: user.email, role: user.role });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword, role });

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ message: "Registration successful", token, role: user.role, username: user.username });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found ❌" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password ❌" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    });

    await transporter.sendMail({
      from: `"JobHive 🌿" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Your JobHive Login OTP",
      html: `<h2>Your OTP is: <b>${otp}</b></h2><p>Valid for 10 minutes.</p>`,
    });

    res.json({ message: "OTP sent to your email ✅", requiresOtp: true, email });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (!user.otp || user.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP ❌" });
    if (user.otpExpiry < new Date())
      return res.status(400).json({ message: "OTP expired ❌" });

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful ✅", token, role: user.role, username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("username email role");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ username: user.username, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};