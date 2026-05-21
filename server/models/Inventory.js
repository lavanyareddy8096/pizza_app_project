const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  name: String,
  type: String, // base, sauce, cheese, veggie
  quantity: Number
});

module.exports = mongoose.model("Inventory", inventorySchema);