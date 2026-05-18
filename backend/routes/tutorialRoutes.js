// routes/tutorialRoutes.js

const express = require("express");

const router = express.Router();

const multer = require("multer");

const streamifier = require("streamifier");

const { cloudinary } = require("../config/cloudinary");

const Tutorial = require("../models/Tutorial");

const {
  getTutorials,
  getSingleTutorial,
  deleteTutorial,
} = require("../controllers/tutorialController");

/* =========================================
   MULTER MEMORY STORAGE
========================================= */

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB
  },
});

/* =========================================
   CLOUDINARY STREAM UPLOAD
========================================= */

const uploadToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
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
      /* =========================
         VALIDATION
      ========================= */

      if (!req.files?.thumbnail?.[0]) {
        return res.status(400).json({
          message: "Thumbnail is required",
        });
      }

      if (!req.files?.video?.[0]) {
        return res.status(400).json({
          message: "Video is required",
        });
      }

      /* =========================
         FILES
      ========================= */

      const thumbnailFile = req.files.thumbnail[0];

      const videoFile = req.files.video[0];

      /* =========================
         UPLOAD THUMBNAIL
      ========================= */

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

      /* =========================
         UPLOAD VIDEO
      ========================= */

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

      /* =========================
         SAVE DATABASE
      ========================= */

      const tutorial = await Tutorial.create({
        title: req.body.title,

        description: req.body.description,

        category: req.body.category,

        level: req.body.level,

        duration: req.body.duration,

        featured: req.body.featured || false,

        thumbnailUrl: thumbnailUpload.secure_url,

        thumbnailPublicId: thumbnailUpload.public_id,

        videoUrl: videoUpload.secure_url,

        videoPublicId: videoUpload.public_id,
      });

      /* =========================
         SUCCESS RESPONSE
      ========================= */

      res.status(201).json({
        success: true,

        message: "Tutorial uploaded successfully",

        tutorial,
      });
    } catch (error) {
      console.error("TUTORIAL UPLOAD ERROR:", error);

      res.status(500).json({
        success: false,

        message: error.message || "Upload failed",
      });
    }
  },
);

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
