// const express = require("express");
// const mongoose = require("mongoose")

// require("dotenv").config();

// const authRoutes = require("./routes/authRoutes");
// const auth = require("./middleware/auth");
// const jobRoutes = require("./routes/jobRoutes");
// const applicationRoutes = require("./routes/applicationRoutes");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());


//   mongoose.connect(process.env.MONGO_URL)
//     .then(() => console.log("MongoDB Connected ✅"))
//     .catch((err) => console.log(err));



// app.use("/api/auth",authRoutes);
// app.use("/api/jobs", jobRoutes);
// app.use("/api/apply", applicationRoutes);



// app.get("/",(req,res)=>{
//     res.send("server working")
// });

// app.get("/api/profile", auth, (req, res) => {
//   res.json({
//     message: "Welcome to your profile!!",
//     userId: req.userId,
//   });
// });

// if (process.env.NODE_ENV !== "test") {
//   app.listen(5000, () => {
//     console.log("Server running on port 5000");
//   });
// }

// module.exports = app;


const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();

// CORS must be first
app.use(cors({ origin: ["http://localhost:3000", "https://jobhive.vercel.app"], credentials: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/apply", applicationRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => res.send("Server working ✅"));

if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
}

module.exports = app;