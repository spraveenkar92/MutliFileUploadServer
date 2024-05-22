const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const logger = require("./logger");

// Path to the environment file based on NODE_ENV
const envPath = path.resolve(__dirname, `${process.env.NODE_ENV}.env`);
const result = require("dotenv").config({
  path: envPath,
});
if (result.error) logger.error("Error loading .env file:", result.error);
logger.info(`Node environment: ${process.env.NODE_ENV}`);

const adHelper = require("./active_directory");
const authenticationToken = require("./authMiddleware");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());

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

app.post("/upload", authenticationToken, upload.single("file"), (req, res) => {
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

app.post("/login", async (req, res) => {
  const { pfNo, password } = req.body;
  try {
    const token = await adHelper.checkAdLogin(pfNo, password);
    if (token) res.json(token);
    else res.status(401).json({ error: "Invalid credentials" });
  } catch (error) {
    logger.error(`Error during authentication: `, error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
