const Cloud = require("@google-cloud/storage");
const path = require("path");
require("dotenv").config();
const serviceKey2 = process.env.GOOGLE_CREDENTIALS;
const serviceKey = path.join(__dirname, "./keys.json");

const { Storage } = Cloud;
const storage = new Storage({
  keyFilename: serviceKey2,
  projectId: "streaming-278216",
});

module.exports = storage;
