const express = require("express");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalExtension = path.extname(file.originalname);
    cb(null, file.fieldname + uniqueSuffix + originalExtension);
  },
});
const upload = multer({ storage: storage });
const {
  uploadFile,
  profileUpload,
  showImage,
} = require("../controllers/uploadController");

const uploadRoutes = express.Router();
uploadRoutes.post("/", uploadFile);
uploadRoutes.post("/profile", upload.single("profile"), profileUpload);
uploadRoutes.get("/images/:filename", showImage);
module.exports = { uploadRoutes };
