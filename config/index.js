const Cloud = require("@google-cloud/storage");
const path = require("path");
require("dotenv").config();
const serviceKey2 = process.env.GOOGLE_APPLICATION_CREDENTIALS;
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

const serviceKey = path.join(__dirname, "./keys.js");

const { Storage } = Cloud;
const storage = new Storage({
  // keyFilename: serviceKey2,
  // projectId: "streaming-278216",
  credentials: credentials,
});

module.exports = storage;

// if this doesn't work, try making keys.json a js file, rquire the dotenv, just place the google cred env var there
