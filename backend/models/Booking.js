const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    message: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", BookingSchema);
