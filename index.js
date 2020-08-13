const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const uploadImage = require("./helpers");
const path = require("path");
require("dotenv").config();

const db = require("./db");
const recipeRouter = require("./routes/recipe-router");

const app = express();
const apiPort = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const reactFiles = path.join(__dirname, "./build");

app.use(express.static(reactFiles));

app.get("/", (req, res) => {
  // res.send("hello world");
  res.sendFile(path.join(reactFiles + "/index.html"));
});

app.get("/*", (req, res) => {
  // res.send("hello world");
  res.sendFile(path.join(reactFiles + "/index.html"));
});

app.get("/recipes/new", (req, res) => {
  // res.send("hello world");
  res.sendFile(path.join(reactFiles + "/index.html"));
});

app.get("/recipes/edit/*", (req, res) => {
  // res.send("hello world");
  res.sendFile(path.join(reactFiles + "/index.html"));
});

//Image Uploader

const makeId = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

app.post("/upload", async (req, res) => {
  console.log("upload request made");
  console.log(req);
  // res.sendFile(path.join(reactFiles + "/index.html"));
  if (req.files === null) {
    return res.status(400).json({ msg: "no file was uploaded" });
  }

  const file = req.files.file;

  const fileName = makeId(5) + file.name;

  try {
    const fileName = makeId(5) + req.files.file.name;
    const myFile = {
      originalname: fileName,
      buffer: req.files.file.data,
    };

    const imageUrl = await uploadImage(myFile);
    console.log(imageUrl);
    res.status(200).json({
      fileName: fileName,
      filePath: imageUrl,
    });

    //   }
  } catch (error) {
    console.log(error);
  }

  // file.mv(
  //   `/Users/oskarwroz/Documents/WebDev-Projects/recipe-share-app/client/public/uploads/${fileName}`,
  //   (err) => {
  //     if (err) {
  //       console.error(err);
  //       return res.status(500).send("it ain't there");
  //     }

  //     res.json({ fileName: fileName, filePath: `/uploads/${fileName}` });
  //   }
  // );
});

app.use("/api", recipeRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

// file name never set?
