const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  uploadGalleryImage,
  getGalleryImages,
  deleteGalleryImage,
} = require("../controllers/galleryController");

// Upload with title
router.post("/", upload.single("image"), uploadGalleryImage);
router.get("/", getGalleryImages);
router.delete("/:id", deleteGalleryImage);

module.exports = router;
