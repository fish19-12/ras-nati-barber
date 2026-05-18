// models/Tutorial.js

const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },

    duration: {
      type: String,
      default: "0 Min",
    },

    thumbnailUrl: {
      type: String,
      required: true,
    },

    thumbnailPublicId: {
      type: String,
      required: true,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    videoPublicId: {
      type: String,
      required: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Tutorial", tutorialSchema);
