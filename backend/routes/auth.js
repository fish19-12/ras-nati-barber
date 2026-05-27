const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

/* =========================
   TEST ROUTE
========================= */
router.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ AUTH ROUTE WORKING",
  });
});

/* =========================
   REGISTER ADMIN
========================= */
router.post("/register", async (req, res) => {
  try {
    const { username, password, adminKey } = req.body;

    console.log("📌 REGISTER REQUEST RECEIVED");

    /* VALIDATION */
    if (!username || !password || !adminKey) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    /* CHECK ADMIN KEY */
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized admin creation",
      });
    }

    /* CHECK USER EXISTS */
    const exists = await User.findOne({ username });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    /* HASH PASSWORD */
    const hashedPassword = await bcrypt.hash(password, 10);

    /* CREATE USER */
    const newUser = await User.create({
      username,
      password: hashedPassword,
      role: "admin",
    });

    /* CREATE TOKEN */
    const token = jwt.sign(
      {
        id: newUser._id,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    console.log("✅ ADMIN CREATED:", newUser.username);

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      token,
      username: newUser.username,
      role: newUser.role,
    });
  } catch (err) {
    console.error("❌ REGISTER ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* =========================
   LOGIN ADMIN
========================= */
router.post("/login", async (req, res) => {
  try {
    console.log("📌 LOGIN ROUTE HIT");

    const { username, password } = req.body;

    /* VALIDATION */
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    /* FIND USER */
    const user = await User.findOne({ username });

    if (!user) {
      console.log("❌ USER NOT FOUND");

      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    /* CHECK PASSWORD */
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("❌ WRONG PASSWORD");

      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    /* CREATE TOKEN */
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    console.log("✅ LOGIN SUCCESS:", user.username);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    console.error("❌ LOGIN ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
