// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", require("./routes/auth")); // ✅ Added auth route
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
