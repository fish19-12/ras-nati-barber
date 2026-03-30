import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const galleryImages = [
  "https://images.unsplash.com/photo-1621605815971-fbc98d665033",
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a",
  "https://images.unsplash.com/photo-1612197520061-cc66b7e8f4f0",
  "https://images.unsplash.com/photo-1598300051512-c37261e8bce6",
  "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
];

const GalleryItem = ({ image }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative rounded-2xl overflow-hidden cursor-pointer"
    >
      <img src={image} alt="Gallery" className="w-full h-64 object-cover" />

      {/* Glass Overlay on Hover */}
      <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
        <Link
          to="/booking"
          className="bg-primary text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Book Now
        </Link>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  return (
    <div className="max-w-7xl mx-auto py-24 px-6">
      <h1 className="text-4xl md:text-5xl font-display text-center mb-16">
        Our Gallery
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map((img, index) => (
          <GalleryItem key={index} image={img} />
        ))}
      </div>

      {/* CTA */}
      <section className="bg-primary text-black text-center py-20 mt-24 rounded-2xl">
        <h2 className="text-4xl font-bold mb-4">See Something You Like?</h2>
        <p className="mb-6">
          Book your appointment now and get your perfect style!
        </p>
        <Link
          to="/booking"
          className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Book Now
        </Link>
      </section>
    </div>
  );
};

export default Gallery;
