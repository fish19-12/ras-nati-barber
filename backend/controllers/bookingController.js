const Booking = require("../models/Booking");
const multer = require("multer");
const { storage, cloudinary } = require("../config/cloudinary");

// ========================================
// 🔔 STORE LAST NOTIFIED BOOKINGS
// ========================================
global.latestBookings = global.latestBookings || [];

// ========================================
// MULTER SETUP
// ========================================
const upload = multer({
  storage,

  limits: {
    fileSize: 2 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed!"));
    }

    cb(null, true);
  },
});

// ========================================
// UPLOAD MIDDLEWARE
// ========================================
exports.uploadBookingPhoto = upload.single("paymentPhoto");

// ========================================
// CREATE BOOKING
// ========================================
exports.createBooking = async (req, res) => {
  try {
    let photoUrl = "";

    // ========================================
    // HANDLE IMAGE
    // ========================================
    if (req.file && req.file.path) {
      photoUrl = req.file.path;
    }

    // ========================================
    // HANDLE SERVICES
    // ========================================
    let services = [];

    if (req.body.service) {
      if (Array.isArray(req.body.service)) {
        services = req.body.service;
      } else {
        services = req.body.service.split(",").map((s) => s.trim());
      }
    }

    // ========================================
    // FORMAT DATE
    // ========================================
    const bookingDate = new Date(req.body.date);

    bookingDate.setHours(0, 0, 0, 0);

    // ========================================
    // CHECK EXISTING BOOKING
    // ========================================
    const existingBooking = await Booking.findOne({
      date: bookingDate,
      time: req.body.time,
    });

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message:
          "This date and time is already taken by another customer. Please choose another available time.",
      });
    }

    // ========================================
    // CREATE BOOKING
    // ========================================
    const booking = await Booking.create({
      name: req.body.name,

      phone: req.body.phone,

      services: services,

      date: bookingDate,

      time: req.body.time,

      paymentPhotoUrl: photoUrl,

      message: req.body.message || "",

      outdoorAddress: req.body.outdoorAddress || "",

      cityLocation: req.body.cityLocation || "",

      cityNeedDate: req.body.cityNeedDate || "",

      timePeriod: req.body.timePeriod || "",
    });

    // ========================================
    // 🔔 SAVE FOR LIVE NOTIFICATIONS
    // ========================================
    global.latestBookings.unshift({
      _id: booking._id,

      name: booking.name,

      services: booking.services,

      createdAt: booking.createdAt,
    });

    // KEEP ONLY LAST 20
    global.latestBookings = global.latestBookings.slice(0, 20);

    // ========================================
    // RESPONSE
    // ========================================
    res.status(201).json({
      success: true,
      message: "Booking created successfully",

      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error.message);

    // ========================================
    // DUPLICATE ERROR
    // ========================================
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This booking time is already reserved by another customer.",
      });
    }

    res.status(400).json({
      success: false,

      message: error.message,
    });
  }
};

// ========================================
// GET BOOKINGS
// ========================================
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({
      createdAt: -1,
    });

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ========================================
// 🔔 GET LATEST BOOKINGS FOR LIVE ALERTS
// ========================================
exports.getLatestBookings = async (req, res) => {
  try {
    res.status(200).json(global.latestBookings || []);
  } catch (error) {
    console.error("Latest booking error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to get latest bookings",
    });
  }
};

// ========================================
// DELETE BOOKING
// ========================================
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    // ========================================
    // VALIDATE ID
    // ========================================
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        message: "Invalid booking ID",
      });
    }

    // ========================================
    // FIND BOOKING
    // ========================================
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    // ========================================
    // DELETE CLOUDINARY IMAGE
    // ========================================
    if (
      booking.paymentPhotoUrl &&
      booking.paymentPhotoUrl.includes("res.cloudinary.com")
    ) {
      const publicId = booking.paymentPhotoUrl
        .split("/")
        .slice(-1)[0]
        .split(".")[0];

      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error("Cloudinary deletion failed:", err.message);
      }
    }

    // ========================================
    // DELETE BOOKING
    // ========================================
    await Booking.deleteOne({
      _id: id,
    });

    // ========================================
    // REMOVE FROM LIVE CACHE
    // ========================================
    global.latestBookings = global.latestBookings.filter(
      (booking) => booking._id.toString() !== id,
    );

    // ========================================
    // RESPONSE
    // ========================================
    res.json({
      success: true,

      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.error("Delete booking error:", error.message);

    res.status(500).json({
      success: false,

      message: "Server failed to delete booking",
    });
  }
};
