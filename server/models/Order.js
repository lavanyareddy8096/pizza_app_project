const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  base: String,
  sauce: String,
  cheese: String,
  veggies: [String],
  status: {
    type: String,
    default: "Order Received"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);