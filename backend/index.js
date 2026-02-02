const express = require("express");
const mongoose = require("mongoose")

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const auth = require("./middleware/auth");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected "))
  .catch((err) => console.log(err));

app.use("/api/auth",authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/apply", applicationRoutes);


app.get("/",(req,res)=>{
    res.send("server working")
});

app.get("/api/profile", auth, (req, res) => {
  res.json({
    message: "Welcome to your profile!!",
    userId: req.userId,
  });
});


app.listen(5000,()=>{
    console.log("server started on port 5000");
})