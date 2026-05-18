// controllers/tutorialController.js

const Tutorial = require("../models/Tutorial");
const { cloudinary } = require("../config/cloudinary");

/* =========================
   CREATE TUTORIAL
========================= */

exports.createTutorial = async (req, res) => {
  try {
    if (!req.files?.thumbnail || !req.files?.video) {
      return res.status(400).json({
        message: "Thumbnail and video are required",
      });
    }

    const thumbnail = req.files.thumbnail[0];
    const video = req.files.video[0];

    const tutorial = await Tutorial.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      level: req.body.level,
      duration: req.body.duration,
      featured: req.body.featured,

      thumbnailUrl: thumbnail.path,
      thumbnailPublicId: thumbnail.filename,

      videoUrl: video.path,
      videoPublicId: video.filename,
    });

    res.status(201).json(tutorial);
  } catch (error) {
    console.error("CREATE TUTORIAL ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   GET ALL TUTORIALS
========================= */

exports.getTutorials = async (req, res) => {
  try {
    const tutorials = await Tutorial.find().sort({
      createdAt: -1,
    });

    res.status(200).json(tutorials);
  } catch (error) {
    console.error("GET TUTORIALS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   GET SINGLE TUTORIAL
========================= */

exports.getSingleTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);

    if (!tutorial) {
      return res.status(404).json({
        message: "Tutorial not found",
      });
    }

    res.status(200).json(tutorial);
  } catch (error) {
    console.error("GET SINGLE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================
   DELETE TUTORIAL
========================= */

exports.deleteTutorial = async (req, res) => {
  try {
    const tutorial = await Tutorial.findById(req.params.id);

    if (!tutorial) {
      return res.status(404).json({
        message: "Tutorial not found",
      });
    }

    /* DELETE THUMBNAIL */
    await cloudinary.uploader.destroy(tutorial.thumbnailPublicId);

    /* DELETE VIDEO */
    await cloudinary.uploader.destroy(tutorial.videoPublicId, {
      resource_type: "video",
    });

    await Tutorial.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Tutorial deleted successfully",
    });
  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};
