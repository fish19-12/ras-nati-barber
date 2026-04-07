const Review = require("../models/Review");
const { cloudinary } = require("../config/cloudinary");

// Add a review
exports.addReview = async (req, res) => {
  try {
    let photoUrl = "";
    let publicId = "";

    if (req.file) {
      photoUrl = req.file.path; // Cloudinary URL
      publicId = req.file.filename; // Cloudinary public_id
    }

    const review = await Review.create({
      name: req.body.name,
      role: req.body.role,
      comment: req.body.comment || req.body.message,
      rating: req.body.rating || 5,
      photoUrl,
      publicId,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error("Add review error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// Get reviews
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete review
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).json({ message: "Invalid ID" });

    const review = await Review.findById(id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.publicId) {
      await cloudinary.uploader.destroy(review.publicId);
    }

    await Review.deleteOne({ _id: id });

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Delete review error:", error);
    res.status(500).json({ message: "Server failed to delete review" });
  }
};
