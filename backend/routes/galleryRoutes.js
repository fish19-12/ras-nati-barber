const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");

const upload = multer({ storage });

const {
  uploadGalleryImage,
  getGalleryImages,
  deleteGalleryImage,
} = require("../controllers/galleryController");

// Upload with title
router.post("/", upload.single("image"), uploadGalleryImage);

// Get all images
router.get("/", getGalleryImages);

// Delete image
router.delete("/:id", deleteGalleryImage);

module.exports = router;
