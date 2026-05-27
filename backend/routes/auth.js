const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

/* =========================
   REGISTER ADMIN
========================= */
router.post("/register", async (req, res) => {
  const { username, password, adminKey } = req.body;

  try {
    // 1. CHECK ADMIN KEY
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

    // 3. HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. CREATE USER
    const newUser = new User({
      username,
      password: hashedPassword,
      role: "admin",
    });

    await newUser.save();

    // 5. AUTO LOGIN TOKEN (OPTIONAL BUT USEFUL)
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(201).json({
      message: "Admin created successfully",
      token,
      username: newUser.username,
      role: newUser.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/* =========================
   LOGIN ADMIN
========================= */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. FIND USER
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    // 2. COMPARE PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    // 3. GENERATE TOKEN
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    // 4. RESPONSE
    res.json({
      token,
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
