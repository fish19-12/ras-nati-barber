// backend/createAdmin.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

async function createAdmin() {
  try {
    const exists = await User.findOne({ username: "admin@nati.com" });
    if (exists) {
      console.log("Admin already exists!");
      process.exit(0);
    }

    const admin = new User({
      username: "admin@kemekem.com",
      password: "112233", // will be hashed automatically
    });

    await admin.save();
    console.log("Admin created successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();
