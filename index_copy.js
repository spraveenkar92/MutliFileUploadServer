const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(`REquest: ${JSON.stringify(req.file)}`);
    console.log(`REquest1: ${JSON.stringify(req.body)}`);
    // console.log(`Uplaod location ${req.body.uploadLocation}`);
    cb(null, "D:/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("file"), (req, res) => {
  console.log("Received body:", req.body);
  res.send("File uploaded successfully");
});

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
