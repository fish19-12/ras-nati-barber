const Booking = require("../models/Booking");
const multer = require("multer");
const { storage, cloudinary } = require("../config/cloudinary");
const nodemailer = require("nodemailer");

// ========================================
// 🔔 STORE LAST NOTIFIED BOOKINGS
// ========================================
global.latestBookings = global.latestBookings || [];

// ========================================
// 📧 EMAIL TRANSPORTER
// ========================================
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
    // 📧 SEND EMAIL NOTIFICATION
    // ========================================
    // ========================================
    // 📧 SEND EMAIL NOTIFICATION
    // ========================================
    try {
      await transporter.sendMail({
        from: `"Nhatty Booking" <${process.env.EMAIL_USER}>`,

        to: "nhattansisay@gmail.com",

        subject: `🔥 New Booking • ${booking.name}`,

        html: `
      <div style="
        margin:0;
        padding:40px 20px;
        background:#0a0a0a;
        font-family:Arial,sans-serif;
        color:#ffffff;
      ">

        <div style="
          max-width:700px;
          margin:auto;
          background:#111111;
          border:1px solid #222;
          border-radius:28px;
          overflow:hidden;
          box-shadow:0 0 40px rgba(250,204,21,0.08);
        ">

          <!-- HEADER -->
          <div style="
            background:linear-gradient(135deg,#facc15,#f97316);
            padding:35px 25px;
            text-align:center;
          ">

            <h1 style="
              margin:0;
              font-size:34px;
              color:#000;
              font-weight:900;
            ">
              🔥 New Booking Alert
            </h1>

            <p style="
              margin-top:10px;
              color:#1a1a1a;
              font-size:15px;
              font-weight:600;
            ">
              Nhatty The Barber • Luxury Booking System
            </p>
          </div>

          <!-- BODY -->
          <div style="padding:30px;">

            <div style="
              background:#181818;
              border:1px solid #2a2a2a;
              border-radius:20px;
              padding:22px;
              margin-bottom:24px;
            ">
              <h2 style="
                margin-top:0;
                color:#facc15;
                font-size:22px;
              ">
                👤 Customer Information
              </h2>

              <p><strong>👤 Name:</strong> ${booking.name}</p>

              <p><strong>📞 Phone:</strong> ${booking.phone}</p>

              <p>
                <strong>💎 Service:</strong> 
                ${booking.services.join(", ")}
              </p>

              <p>
                <strong>📅 Date:</strong> 
                ${booking.date.toDateString()}
              </p>

              <p>
                <strong>⏰ Time:</strong> 
                ${booking.time}
              </p>

              <p>
                <strong>🕓 Period:</strong> 
                ${booking.timePeriod || "N/A"}
              </p>
            </div>

            ${
              booking.outdoorAddress
                ? `
              <div style="
                background:#181818;
                border:1px solid #2a2a2a;
                border-radius:20px;
                padding:22px;
                margin-bottom:24px;
              ">
                <h3 style="color:#4ade80;margin-top:0;">
                  🚗 Outdoor Address
                </h3>

                <p>${booking.outdoorAddress}</p>
              </div>
            `
                : ""
            }

            ${
              booking.cityLocation
                ? `
              <div style="
                background:#181818;
                border:1px solid #2a2a2a;
                border-radius:20px;
                padding:22px;
                margin-bottom:24px;
              ">
                <h3 style="color:#60a5fa;margin-top:0;">
                  🌍 City To City Service
                </h3>

                <p>
                  <strong>📍 Location:</strong> 
                  ${booking.cityLocation}
                </p>

                <p>
                  <strong>📅 Needed Date:</strong> 
                  ${booking.cityNeedDate}
                </p>
              </div>
            `
                : ""
            }

            ${
              booking.message
                ? `
              <div style="
                background:#181818;
                border:1px solid #2a2a2a;
                border-radius:20px;
                padding:22px;
                margin-bottom:24px;
              ">
                <h3 style="color:#facc15;margin-top:0;">
                  📝 Additional Message
                </h3>

                <p style="
                  line-height:1.7;
                  color:#d1d5db;
                ">
                  ${booking.message}
                </p>
              </div>
            `
                : ""
            }

            <!-- BUTTONS -->
            <div style="
              margin-top:35px;
              text-align:center;
            ">

              <a
                href="https://nhatty.vercel.app/"
                target="_blank"
                style="
                  display:inline-block;
                  padding:16px 28px;
                  margin:10px;
                  background:linear-gradient(135deg,#facc15,#f97316);
                  color:#000;
                  text-decoration:none;
                  font-weight:800;
                  border-radius:16px;
                  font-size:15px;
                "
              >
                🚀 Open Admin Dashboard
              </a>

              ${
                booking.paymentPhotoUrl
                  ? `
                <a
                  href="${booking.paymentPhotoUrl}"
                  target="_blank"
                  style="
                    display:inline-block;
                    padding:16px 28px;
                    margin:10px;
                    background:#ffffff10;
                    border:1px solid #333;
                    color:#fff;
                    text-decoration:none;
                    font-weight:700;
                    border-radius:16px;
                    font-size:15px;
                  "
                >
                  📸 View Payment Screenshot
                </a>
              `
                  : ""
              }

            </div>

            <!-- FOOTER -->
            <div style="
              margin-top:40px;
              padding-top:24px;
              border-top:1px solid #2a2a2a;
              text-align:center;
            ">

              <p style="
                color:#888;
                font-size:13px;
                margin-bottom:8px;
              ">
                This booking was automatically submitted from the website.
              </p>

              <p style="
                color:#facc15;
                font-size:14px;
                font-weight:700;
              ">
                ✂️ Nhatty The Barber Luxury Booking System
              </p>

            </div>

          </div>
        </div>
      </div>
    `,
      });

      console.log("✅ Booking email sent successfully");
    } catch (emailError) {
      console.error("❌ Email send failed:", emailError.message);
    }
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
