const fs = require("fs");
const path = require("path");
const uploadFile = async (req, res) => {
  console.log("req", req.body);
};
const profileUpload = async (req, res) => {
  res.send("Profile Uploaded successfully");
};
const showImage = async (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, "..", "uploads", filename);

  // Check if the file exists
  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: "Image not found" });
  }

  // Read the file and send it in the response
  res.sendFile(imagePath, { encoding: null }); // Specify encoding as null
};
module.exports = { uploadFile, profileUpload, showImage };
