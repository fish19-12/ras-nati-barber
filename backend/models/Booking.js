const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    services: {
      type: [String],
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    timePeriod: {
      type: String,
      default: "",
    },

    outdoorAddress: {
      type: String,
      default: "",
    },

    cityLocation: {
      type: String,
      default: "",
    },

    cityNeedDate: {
      type: String,
      default: "",
    },

    paymentPhotoUrl: {
      type: String,
    },

    message: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Booking", BookingSchema);
