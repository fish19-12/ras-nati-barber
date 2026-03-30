const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    publicId: { type: String, required: true }, // For Cloudinary
  },
  { timestamps: true },
);

module.exports = mongoose.model("Gallery", GallerySchema);
