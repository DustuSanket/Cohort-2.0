const mongoose = require("mongoose");

async function connetToDatabase(req, res) {
  await mongoose.connect(process.env.MONGO_URI);

  console.log("Connected to DB");
}

module.exports = connetToDatabase;
