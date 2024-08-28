const express = require("express");
const pool = require("./db connection/dbConnection");
const app = express();
const port = 5300;

const ejs = require("ejs");

const multer = require("multer");

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  res.send(req.file);
});

app.listen(port, () => {
  console.log(`connected to port ${port}`);
});

app.get("/api/image",upload.single("file"), async(req, res) => {
  const query = "select * from upload_images";
  const [result] = await pool.query(query);
  console.log(result);

  const posting = `insert into upload_images values (?)`;
  const response = await pool.query(posting,req.file.path);
  console.log(response)
  res.send(result,response);

});
