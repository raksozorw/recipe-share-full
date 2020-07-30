const Cloud = require("@google-cloud/storage");
const path = require("path");
require("dotenv").config();
const serviceKey2 = process.env.GOOGLE_CREDENTIALS;

const serviceKey = path.join(__dirname, "./keys.js");

const { Storage } = Cloud;
const storage = new Storage({
  // keyFilename: serviceKey,
  projectId: "streaming-278216",
  credentials: {
    client_email: process.env.CLIENT_EMAIL,
    private_key: process.env.PRIVATE_KEY,
  },
});

module.exports = storage;

// if this doesn't work, try making keys.json a js file, rquire the dotenv, just place the google cred env var there
