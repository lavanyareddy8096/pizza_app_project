const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: "user" // user or admin
  },

  // ✅ EMAIL VERIFICATION (SIMPLIFIED)
  isVerified: {
    type: Boolean,
    default: false // keeping true for simplicity
  },

  // ✅ FORGOT PASSWORD SUPPORT
  resetToken: String,
  resetTokenExpiry: Date

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);