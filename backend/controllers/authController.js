const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { Resend } = require("resend");

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

    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "JobHive <onboarding@resend.dev>",
      to: user.email,
      subject: "Your JobHive Login OTP",
      html: `
        <div style="font-family:sans-serif;max-width:400px;margin:auto;padding:30px;border-radius:12px;border:1px solid #eee">
          <h2 style="color:#2d6a4f">🌿 JobHive</h2>
          <p>Your one-time login code is:</p>
          <h1 style="letter-spacing:8px;color:#2d6a4f">${otp}</h1>
          <p style="color:#999">Valid for 10 minutes. Do not share this with anyone.</p>
        </div>
      `,
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