const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const logger = require("./logger");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./${req.query.uploadLocation}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("file"), (req, res) => {
  let uploadedFile = req.file;
  let fileSize = uploadedFile.size / (1024 * 1024);
  logger.info(
    `FileName:${uploadedFile.originalname} - FileSize:${fileSize.toFixed(
      2
    )}MB - Destination: ${uploadedFile.path} - MimeType: ${
      uploadedFile.mimetype
    }`
  );
  // console.log("Received file:", req.file);
  // console.log("Received body:", req.body);
  res.send("File uploaded successfully");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
