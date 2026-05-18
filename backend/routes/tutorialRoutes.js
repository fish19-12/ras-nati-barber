// routes/tutorialRoutes.js

const express = require("express");
const router = express.Router();

const multer = require("multer");

const { cloudinary } = require("../config/cloudinary");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const {
  createTutorial,
  getTutorials,
  getSingleTutorial,
  deleteTutorial,
} = require("../controllers/tutorialController");

/* =========================
   THUMBNAIL STORAGE
========================= */

const thumbnailStorage = new CloudinaryStorage({
  cloudinary,

  params: {
    folder: "tutorial-thumbnails",

    allowed_formats: ["jpg", "jpeg", "png", "webp"],

    transformation: [
      {
        width: 1200,
        crop: "limit",
        quality: "auto",
      },
    ],
  },
});

/* =========================
   VIDEO STORAGE
========================= */

const videoStorage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "tutorial-videos",

    resource_type: "video",

    allowed_formats: ["mp4", "mov", "avi", "mkv", "webm"],

    public_id: Date.now() + "-" + file.originalname.split(".")[0],
  }),
});

/* =========================
   MULTER
========================= */

const thumbnailUpload = multer({
  storage: thumbnailStorage,
});

const videoUpload = multer({
  storage: videoStorage,
});

/* =========================
   CUSTOM UPLOAD MIDDLEWARE
========================= */

const uploadTutorialFiles = (req, res, next) => {
  thumbnailUpload.single("thumbnail")(req, res, function (thumbnailError) {
    if (thumbnailError) {
      return res.status(500).json({
        message: thumbnailError.message,
      });
    }

    const thumbnailFile = req.file;

    videoUpload.single("video")(req, res, function (videoError) {
      if (videoError) {
        return res.status(500).json({
          message: videoError.message,
        });
      }

      const videoFile = req.file;

      req.files = {
        thumbnail: [thumbnailFile],
        video: [videoFile],
      };

      next();
    });
  });
};

/* =========================
   ROUTES
========================= */

/* CREATE */
router.post("/", uploadTutorialFiles, createTutorial);

/* GET ALL */
router.get("/", getTutorials);

/* GET SINGLE */
router.get("/:id", getSingleTutorial);

/* DELETE */
router.delete("/:id", deleteTutorial);

module.exports = router;
