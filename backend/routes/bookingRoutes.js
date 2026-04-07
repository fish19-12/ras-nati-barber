const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  uploadBookingPhoto,
  deleteBooking, // ← add this
} = require("../controllers/bookingController");

// POST booking with photo upload
router.post("/", uploadBookingPhoto, createBooking);

// GET all bookings
router.get("/", getBookings);

// DELETE booking by ID
router.delete("/:id", deleteBooking);

module.exports = router;
