const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/* =========================
   MIDDLEWARES
========================= */

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

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

/* =========================
   NHATTY TUTORIALS
========================= */

app.use("/api/tutorials", require("./routes/tutorialRoutes"));

/* =========================
   TEST ROUTE
========================= */

app.get("/", (req, res) => {
  res.send("Nhatty Barber API Running...");
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
