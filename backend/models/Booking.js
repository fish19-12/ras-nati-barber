const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    services: { type: [String], required: true }, // multiple services
    date: { type: Date, required: true },
    time: { type: String, required: true },
    paymentPhotoUrl: { type: String }, // store uploaded photo URL
    message: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", BookingSchema);
