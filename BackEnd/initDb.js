const mongoose = require("mongoose");

async function connectToDB() {
  try {
    const connection = await mongoose.connect(
      "mongodb://localhost:27017/todoapp"
    );

    console.log("Connected to MongoDB:", connection.connection.host);
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
  }
}

module.exports = { connectToDB };
