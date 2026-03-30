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
      className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer group"
    >
      <img
        src={image}
        alt="Gallery"
        className="w-full h-64 md:h-72 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Glass Overlay on Hover */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
        <Link
          to="/booking"
          className="bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold uppercase tracking-wide shadow-md hover:scale-105 transition-transform duration-300"
        >
          Book Now
        </Link>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  return (
    <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      {/* Section Title */}
      <h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-900 mb-16 tracking-tight">
        Our Gallery
      </h1>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {galleryImages.map((img, index) => (
          <GalleryItem key={index} image={img} />
        ))}
      </div>

      {/* Call to Action Section */}
      <section className="bg-gray-900 text-white text-center py-20 mt-24 rounded-2xl shadow-xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          See Something You Like?
        </h2>
        <p className="mb-6 text-lg md:text-xl text-gray-300">
          Book your appointment now and get your perfect style!
        </p>
        <Link
          to="/booking"
          className="bg-yellow-400 text-gray-900 px-10 py-3 rounded-full font-semibold uppercase tracking-wide shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Book Now
        </Link>
      </section>
    </div>
  );
};

export default Gallery;
