const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

// REGISTER ADMIN
router.post("/register", async (req, res) => {
  const { username, password, adminKey } = req.body;

  try {
    // 1. CHECK ADMIN SECRET KEY
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({
        message: "Unauthorized admin creation",
      });
    }

    // 2. CHECK IF USER EXISTS
    const exists = await User.findOne({ username });

    if (exists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 3. HASH PASSWORD (IMPORTANT FIX)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. CREATE USER
    const newUser = new User({
      username,
      password: hashedPassword,
      role: "admin",
    });

    await newUser.save();

    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
