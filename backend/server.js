const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");

const { Server } = require("socket.io");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

const server = http.createServer(app);

// ========================================
// SOCKET IO
// ========================================
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// MAKE IO GLOBAL
app.set("io", io);

// ========================================
// SOCKET CONNECTION
// ========================================
io.on("connection", (socket) => {
  console.log("✅ Admin connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Admin disconnected:", socket.id);
  });
});

/* =========================
   MIDDLEWARES
========================= */

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* =========================
   ROUTES
========================= */

/* AUTH */
app.use("/api/auth", require("./routes/auth"));

/* BOOKINGS */
app.use("/api/bookings", require("./routes/bookingRoutes"));

/* GALLERY */
app.use("/api/gallery", require("./routes/galleryRoutes"));

/* REVIEWS */
app.use("/api/reviews", require("./routes/reviewRoutes"));

/* REGISTER */
app.use("/api/register", require("./routes/registerRoutes"));

/* TUTORIALS */
app.use("/api/tutorials", require("./routes/tutorialRoutes"));

/* TEST */
app.get("/", (req, res) => {
  res.send("Nhatty Barber API Running...");
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
