const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");

// Upload image with title
exports.uploadGalleryImage = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No image uploaded" });

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ras_nati_gallery",
    });

    const gallery = await Gallery.create({
      title: req.body.title, // <-- now supports title
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });

    res.status(201).json(gallery);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Get all gallery images
exports.getGalleryImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete gallery image
// Delete gallery image safely
exports.deleteGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    // Delete from Cloudinary only if publicId exists
    if (image.publicId) {
      try {
        await cloudinary.uploader.destroy(image.publicId);
      } catch (err) {
        console.error("Cloudinary deletion failed:", err.message);
        // Do NOT throw error — we still remove from DB
      }
    }

    await image.remove(); // Remove from MongoDB
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Delete gallery image error:", error.message);
    res.status(500).json({ message: "Server failed to delete image" });
  }
};
