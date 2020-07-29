const mongoose = require("mongoose");
require("dotenv").config();

const key = process.env.MONGO_DB_URI;

mongoose
  .connect(key, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
