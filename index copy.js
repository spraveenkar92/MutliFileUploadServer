const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Received query string:", req.query);
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

// Getting from data from body
// const uploadFunction = (dest) => {
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       console.log(`Received destination ${dest}`);
//       cb(null, dest.uploadLocation);
//     },
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });

//   const upload = multer({
//     storage: storage,
//   }).single("file");

//   return upload;
// };

// app.post("/upload", (req, res) => {
//   console.log("Received body:", req.body);
//   console.log(JSON.stringify(req.body));
//   console.log(req.body.uploadLocation);
//   const currUpload = uploadFunction(req.body.uploadLocation);
//   currUpload(req, res, (err) => {
//     if (err) {
//       res.send("Error in uploading");
//       return;
//     }
//   });
//   res.send("File uploaded successfully");
// });

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
