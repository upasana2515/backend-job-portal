// const jwt = require("jsonwebtoken");

// module.exports = (req, res, next) => {
//   try {
//     const authHeader = req.header("Authorization");

//     if (!authHeader) {
//       return res.status(401).json({ message: "No token ❌" });
//     }

//     // Remove "Bearer "
//     const token = authHeader.replace("Bearer ", "");

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.userId = decoded.id;

//     next();

//   } catch (err) {
//     console.log("JWT Error:", err.message);
//     res.status(401).json({ message: "Invalid token ❌" });
//   }
// };

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) return res.status(401).json({ message: "No token ❌" });

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.username = decoded.username;  // ADD THIS
    req.role = decoded.role; 
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token ❌" });
  }
};
