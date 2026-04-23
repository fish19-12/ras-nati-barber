const mongoose = require("mongoose");

const RegisterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    experience: {
      type: String,
      enum: ["Beginner", "Some Experience", "Advanced"],
      required: true,
    },
    message: { type: String }, // optional note
  },
  { timestamps: true },
);

module.exports = mongoose.model("Register", RegisterSchema);
