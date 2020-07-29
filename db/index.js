const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://admin-oskar:test123@cluster0-fio01.mongodb.net/recipeshareDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
