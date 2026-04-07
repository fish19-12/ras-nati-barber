const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    comment: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },

    photoUrl: {
      type: String,
    },

    publicId: {
      type: String, // Cloudinary image ID
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Review", ReviewSchema);
