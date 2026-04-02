const Booking = require("../models/Booking");
const multer = require("multer");
const { storage } = require("../config/cloudinary");

// Multer setup with Cloudinary storage
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // limit 2MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

// Middleware for file upload
exports.uploadBookingPhoto = upload.single("paymentPhoto");

// Create booking
exports.createBooking = async (req, res) => {
  try {
    let photoUrl = "";

    if (req.file && req.file.path) {
      photoUrl = req.file.path; // Cloudinary URL
    }

    // Handle services: array or comma string
    let services = [];
    if (req.body.service) {
      if (Array.isArray(req.body.service)) services = req.body.service;
      else services = req.body.service.split(",").map((s) => s.trim());
    }

    const booking = await Booking.create({
      name: req.body.name,
      phone: req.body.phone,
      service: services, // save as array
      date: req.body.date,
      time: req.body.time,
      paymentPhotoUrl: photoUrl,
      message: req.body.message || "",
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Create booking error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error.message);
    res.status(500).json({ message: error.message });
  }
};
