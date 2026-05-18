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

/* =========================================
   THUMBNAIL STORAGE
========================================= */

const thumbnailStorage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "tutorial-thumbnails",

    allowed_formats: ["jpg", "jpeg", "png", "webp"],

    transformation: [
      {
        width: 1200,
        crop: "limit",
        quality: "auto",
        fetch_format: "auto",
      },
    ],
  }),
});

/* =========================================
   VIDEO STORAGE
========================================= */

const videoStorage = new CloudinaryStorage({
  cloudinary,

  params: async (req, file) => ({
    folder: "tutorial-videos",

    resource_type: "video",

    allowed_formats: ["mp4", "mov", "avi", "mkv", "webm"],

    public_id: `${Date.now()}-${file.originalname
      .split(".")[0]
      .replace(/\s+/g, "-")}`,

    transformation: [
      {
        quality: "auto:low",

        fetch_format: "auto",

        width: 1280,

        crop: "limit",

        video_codec: "h264",
      },
    ],
  }),
});

/* =========================================
   MULTER STORAGE
========================================= */

const storage = {
  thumbnail: thumbnailStorage,
  video: videoStorage,
};

/* =========================================
   MULTER UPLOAD
========================================= */

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
});

/* =========================================
   MANUAL CLOUDINARY UPLOAD
========================================= */

const streamifier = require("streamifier");

const uploadToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      },
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

/* =========================================
   CREATE TUTORIAL
========================================= */

router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (!req.files.thumbnail || !req.files.video) {
        return res.status(400).json({
          message: "Thumbnail and video are required",
        });
      }

      /* FILES */

      const thumbnailFile = req.files.thumbnail[0];

      const videoFile = req.files.video[0];

      /* UPLOAD THUMBNAIL */

      const thumbnailUpload = await uploadToCloudinary(thumbnailFile.buffer, {
        folder: "tutorial-thumbnails",

        resource_type: "image",

        transformation: [
          {
            width: 1200,
            crop: "limit",
            quality: "auto",
            fetch_format: "auto",
          },
        ],
      });

      /* UPLOAD VIDEO */

      const videoUpload = await uploadToCloudinary(videoFile.buffer, {
        folder: "tutorial-videos",

        resource_type: "video",

        transformation: [
          {
            quality: "auto:low",

            fetch_format: "auto",

            width: 1280,

            crop: "limit",

            video_codec: "h264",
          },
        ],
      });

      /* SAVE DATABASE */

      req.body.thumbnailUrl = thumbnailUpload.secure_url;

      req.body.thumbnailPublicId = thumbnailUpload.public_id;

      req.body.videoUrl = videoUpload.secure_url;

      req.body.videoPublicId = videoUpload.public_id;

      req.body.featured = req.body.featured || false;

      nextCreate(req, res);
    } catch (error) {
      console.error("UPLOAD ERROR:", error);

      res.status(500).json({
        message: error.message,
      });
    }
  },
);

/* =========================================
   CONTROLLER HANDLERS
========================================= */

const nextCreate = async (req, res) => {
  try {
    const Tutorial = require("../models/Tutorial");

    const tutorial = await Tutorial.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      level: req.body.level,
      duration: req.body.duration,
      featured: req.body.featured,

      thumbnailUrl: req.body.thumbnailUrl,
      thumbnailPublicId: req.body.thumbnailPublicId,

      videoUrl: req.body.videoUrl,
      videoPublicId: req.body.videoPublicId,
    });

    res.status(201).json(tutorial);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

/* =========================================
   GET ALL
========================================= */

router.get("/", getTutorials);

/* =========================================
   GET SINGLE
========================================= */

router.get("/:id", getSingleTutorial);

/* =========================================
   DELETE
========================================= */

router.delete("/:id", deleteTutorial);

module.exports = router;
