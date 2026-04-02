const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  addReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

router.post("/", upload.single("photo"), addReview);
router.get("/", getReviews);
router.delete("/:id", deleteReview);

module.exports = router;
