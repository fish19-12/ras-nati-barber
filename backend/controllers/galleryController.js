const Gallery = require("../models/Gallery");
const { cloudinary } = require("../config/cloudinary");

// ✅ Upload image with title (FIXED)
exports.uploadGalleryImage = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // ✅ File is already uploaded to Cloudinary by multer-storage-cloudinary
    const gallery = await Gallery.create({
      title: req.body.title,
      imageUrl: req.file.path, // ✅ Cloudinary image URL
      publicId: req.file.filename, // ✅ Cloudinary public ID
    });

    res.status(201).json(gallery);
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all gallery images
exports.getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    console.error("FETCH ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete gallery image (SAFE)
exports.deleteGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid gallery ID" });
    }

    const image = await Gallery.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // ✅ Delete from Cloudinary
    if (image.publicId) {
      try {
        await cloudinary.uploader.destroy(image.publicId);
      } catch (err) {
        console.error("Cloudinary deletion failed:", err.message);
      }
    }

    // ✅ Delete from MongoDB
    await Gallery.deleteOne({ _id: id });

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: "Server failed to delete image" });
  }
};
