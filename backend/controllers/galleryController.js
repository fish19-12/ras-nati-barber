const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");

// Upload image
exports.uploadGalleryImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ras_nati_gallery",
    });

    const gallery = await Gallery.create({
      title: req.body.title,
      imageUrl: result.secure_url,
      publicId: result.public_id,
    });

    res.status(201).json(gallery);
  } catch (error) {
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
exports.deleteGalleryImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });

    await cloudinary.uploader.destroy(image.publicId);
    await image.remove();

    res.json({ message: "Image deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
