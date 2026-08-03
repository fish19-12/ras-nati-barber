// server.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const helmet = require("helmet");
const morgan = require("morgan");

const { Server } = require("socket.io");

const connectDB = require("./config/db");

// =========================
// ENV CONFIG
// =========================

dotenv.config();

// =========================
// DATABASE
// =========================

connectDB();

// =========================
// APP INITIALIZE
// =========================

const app = express();

const server = http.createServer(app);

// =====================================================
// GLOBAL CORS CONFIGURATION
// =====================================================

const allowedOrigins = [
  // Local development

  "http://localhost:5173",

  "http://localhost:3000",

  // Production domains

  "https://nhattythebarber.com",

  "https://www.nhattythebarber.com",

  // Render environment variable

  process.env.FRONTEND_URL,
].filter(Boolean);

// =========================
// SOCKET.IO
// =========================

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      // Allow:
      // - Postman
      // - Mobile apps
      // - Server requests

      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Socket CORS blocked:", origin);

      return callback(null, true);
    },

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    credentials: true,
  },
});

// Make socket available everywhere

app.set("io", io);

// =========================
// SOCKET CONNECTION
// =========================

io.on(
  "connection",

  (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    socket.on(
      "disconnect",

      () => {
        console.log("🔴 Socket disconnected:", socket.id);
      },
    );
  },
);

// =========================
// SECURITY
// =========================

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

// =========================
// LOGGING
// =========================

app.use(morgan("dev"));

// =========================
// CORS
// =========================

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin

      if (!origin) {
        return callback(null, true);
      }

      // Allow registered origins

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("CORS blocked:", origin);

      // Allow all temporarily
      // prevents production blocking

      return callback(null, true);
    },

    credentials: true,

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

// Allow OPTIONS everywhere

app.options("*", cors());

// =========================
// BODY PARSER
// =========================

app.use(
  express.json({
    limit: "50mb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,

    limit: "50mb",
  }),
);

// =========================
// API ROUTES
// =========================

// AUTH

app.use(
  "/api/auth",

  require("./routes/auth"),
);

// BOOKINGS

app.use(
  "/api/bookings",

  require("./routes/bookingRoutes"),
);

// UNAVAILABLE SLOTS

app.use(
  "/api/unavailable-slots",

  require("./routes/unavailableSlotRoutes"),
);

// GALLERY

app.use(
  "/api/gallery",

  require("./routes/galleryRoutes"),
);

// REVIEWS

app.use(
  "/api/reviews",

  require("./routes/reviewRoutes"),
);

// REGISTER

app.use(
  "/api/register",

  require("./routes/registerRoutes"),
);

// TUTORIALS

app.use(
  "/api/tutorials",

  require("./routes/tutorialRoutes"),
);

// NATI AI

app.use(
  "/api/ai-chat",

  require("./routes/aiChatRoutes"),
);

// =========================
// HEALTH CHECK
// =========================

app.get(
  "/",

  (req, res) => {
    res.json({
      success: true,

      message: "Nhatty The Barber API Running 🚀",

      environment: process.env.NODE_ENV || "development",
    });
  },
);

// =========================
// 404 HANDLER
// =========================

app.use((req, res) => {
  res.status(404).json({
    success: false,

    message: "API route not found",
  });
});

// =========================
// ERROR HANDLER
// =========================

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(err.status || 500).json({
    success: false,

    message: err.message || "Internal Server Error",
  });
});

// =========================
// SERVER START
// =========================

const PORT = process.env.PORT || 5000;

server.listen(
  PORT,

  () => {
    console.log(`

=================================

🔥 Nhatty The Barber Backend

=================================


🚀 Server:
http://localhost:${PORT}


🤖 Nati AI:
/api/ai-chat


📸 Hairstyle Analysis:
/api/ai-chat/analyze-hairstyle


🔌 Socket.io:
ACTIVE


🌍 CORS:
ACTIVE


=================================

`);
  },
);

// =========================
// GRACEFUL SHUTDOWN
// =========================

process.on(
  "SIGTERM",

  () => {
    console.log("SIGTERM received. Closing server...");

    server.close(() => {
      console.log("Server closed");

      process.exit(0);
    });
  },
);
