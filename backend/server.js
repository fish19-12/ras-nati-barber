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
// ALLOWED FRONTEND DOMAINS
// =====================================================

const allowedOrigins = [
  // Local
  "http://localhost:5173",
  "http://localhost:3000",

  // Production
  "https://nhattythebarber.com",
  "https://www.nhattythebarber.com",

  // Render env
  process.env.FRONTEND_URL,
].filter(Boolean);

// =====================================================
// SOCKET.IO
// =====================================================

const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      // allow mobile apps / postman

      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Socket origin allowed:", origin);

      // allow all temporarily

      return callback(null, true);
    },

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],

    credentials: true,
  },
});

app.set("io", io);

// =========================
// SOCKET CONNECTION
// =========================

io.on("connection", (socket) => {
  console.log("🟢 Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Socket disconnected:", socket.id);
  });
});

// =====================================================
// SECURITY
// =====================================================

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

// =====================================================
// LOGGER
// =====================================================

app.use(morgan("dev"));

// =====================================================
// CORS
// =====================================================

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("CORS request from:", origin);

      // allow unknown origins

      return callback(null, true);
    },

    credentials: true,

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  }),
);

// =====================================================
// BODY PARSER
// =====================================================

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

// =====================================================
// ROUTES
// =====================================================

app.use(
  "/api/auth",

  require("./routes/auth"),
);

app.use(
  "/api/bookings",

  require("./routes/bookingRoutes"),
);

app.use(
  "/api/unavailable-slots",

  require("./routes/unavailableSlotRoutes"),
);

app.use(
  "/api/gallery",

  require("./routes/galleryRoutes"),
);

app.use(
  "/api/reviews",

  require("./routes/reviewRoutes"),
);

app.use(
  "/api/register",

  require("./routes/registerRoutes"),
);

app.use(
  "/api/tutorials",

  require("./routes/tutorialRoutes"),
);

app.use(
  "/api/ai-chat",

  require("./routes/aiChatRoutes"),
);

// =====================================================
// HOME TEST
// =====================================================

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

// =====================================================
// 404
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    success: false,

    message: "API route not found",
  });
});

// =====================================================
// ERROR HANDLER
// =====================================================

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(err.status || 500).json({
    success: false,

    message: err.message || "Internal Server Error",
  });
});

// =====================================================
// SERVER START
// =====================================================

const PORT = process.env.PORT || 5000;

server.listen(
  PORT,

  () => {
    console.log(`

=================================

🔥 Nhatty The Barber Backend

=================================


🚀 Running:
http://localhost:${PORT}


🤖 Nati AI:
/api/ai-chat


📸 Hairstyle:
/api/ai-chat/analyze-hairstyle


🔌 Socket.io:
ACTIVE


🌍 CORS:
ACTIVE


=================================

`);
  },
);

// =====================================================
// SHUTDOWN
// =====================================================

process.on(
  "SIGTERM",

  () => {
    console.log("SIGTERM received");

    server.close(() => {
      console.log("Server closed");

      process.exit(0);
    });
  },
);
