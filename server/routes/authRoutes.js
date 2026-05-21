const express = require("express");
const router = express.Router();
const { register, login,forgotPassword } = require("../controllers/authController");
const { verifyEmail } = require("../controllers/authController");

router.get("/verify/:token", verifyEmail);

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
  
    console.log(`Reset link sent to ${email}`);
  
    res.json({ msg: "Reset link sent" });
  });

module.exports = router;