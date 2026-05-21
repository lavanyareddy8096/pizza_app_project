const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false
    });

    // 🔥 create verification token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🔥 verification link (simulated email)
    const link = `http://localhost:3000/verify/${token}`;

    res.json({
      msg: "Registered successfully",
      verificationLink: link // 🔥 send to frontend
    });

    res.json({
      msg: "Registered successfully. Check console for verification link."
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔐 REGISTER
/*exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: true // simplified verification
    });

    // 🔥 simulate email verification
    console.log(`📧 Verification email sent to ${email}`);

    res.json({ msg: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};*/

// 🔐 LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    if (!user.isVerified) {
      return res.status(400).json({ msg: "Please verify your email first" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔁 FORGOT PASSWORD (SIMPLIFIED)
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // simulate reset link
    console.log(`🔗 Password reset link sent to ${email}`);

    res.json({ msg: "Reset link sent to email" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);

    await User.findByIdAndUpdate(decoded.id, {
      isVerified: true
    });

    res.json({ msg: "Email verified successfully" });

  } catch (err) {
    res.status(400).json({ msg: "Invalid or expired token" });
  }
};