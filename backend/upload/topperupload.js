const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Make sure this folder exists, or use fs.mkdirSync to create it automatically
    cb(null, "uploads/toppers");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      "toppers-" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  // ✅ FIX: Check for both jpeg and png types
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpeg, .jpg and .png files allowed"), false);
  }
};

module.exports = multer({ storage, fileFilter });