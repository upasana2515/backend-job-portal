// const multer = require("multer");
// const path = require("path");

// // Store in memory (for cloud upload)
// const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   const ext = path.extname(file.originalname);

//   if (ext !== ".pdf") {
//     return cb(new Error("Only PDF allowed ❌"), false);
//   }

//   cb(null, true);
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 2 * 1024 * 1024, // 2MB
//   },
// });

// module.exports = upload;

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if ([".pdf", ".doc", ".docx"].includes(ext)) cb(null, true);
  else cb(new Error("Only PDF, DOC, DOCX files allowed ❌"), false);
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

module.exports = upload;