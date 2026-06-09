const mongoose = require("mongoose");

const UnavailableSlotSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },

    time: {
      type: String,
      required: true,
    },

    reason: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// prevent duplicates
UnavailableSlotSchema.index(
  {
    date: 1,
    time: 1,
  },
  {
    unique: true,
  },
);

module.exports = mongoose.model("UnavailableSlot", UnavailableSlotSchema);
