const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true }, // <-- new
    comment: { type: String, required: true }, // <-- message
    photoUrl: { type: String }, // <-- photo URL
    rating: { type: Number, min: 0, max: 5 }, // optional
  },
  { timestamps: true },
);

module.exports = mongoose.model("Review", ReviewSchema);
