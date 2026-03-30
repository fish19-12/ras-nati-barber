const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const {
  uploadGalleryImage,
  getGalleryImages,
  deleteGalleryImage,
} = require("../controllers/galleryController");

router.post("/", upload.single("image"), uploadGalleryImage);
router.get("/", getGalleryImages);
router.delete("/:id", deleteGalleryImage);

module.exports = router;
