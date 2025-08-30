const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const laptopSchema = new Schema({
  brand: String,
  model: String,
  year: Number,
  processor: String,
  ram: String,
  storage: String,
  price: Number,
  condition: { type: String, enum: ["new", "used"], default: "new" },
  description: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Laptop", laptopSchema);
