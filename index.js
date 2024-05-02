const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

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
  res.send("File uploaded successfully");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
