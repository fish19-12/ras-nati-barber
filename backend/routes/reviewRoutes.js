const express = require("express");
const router = express.Router();
const {
  addReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");

router.post("/", addReview);
router.get("/", getReviews);
router.delete("/:id", deleteReview);

module.exports = router;
