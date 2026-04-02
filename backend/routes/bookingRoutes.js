const express = require("express");
const router = express.Router();
const {
  createBooking,
  getBookings,
  uploadBookingPhoto,
} = require("../controllers/bookingController");

// POST booking with photo upload
router.post("/", uploadBookingPhoto, createBooking);

// GET all bookings
router.get("/", getBookings);

module.exports = router;
