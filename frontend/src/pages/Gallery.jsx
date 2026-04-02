import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = sessionStorage.getItem("galleryImages");
    if (cached) {
      setImages(JSON.parse(cached));
      setLoading(false);
      return;
    }

    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/gallery`,
        );
        setImages(res.data);
        sessionStorage.setItem("galleryImages", JSON.stringify(res.data)); // cache for session
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400"
        >
          Loading Premium Gallery...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full bg-black text-white font-exo relative">
      {/* Section Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 text-yellow-400 tracking-wide"
      >
        Our Premium Gallery
      </motion.h1>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((item) => (
          <motion.div
            key={item._id}
            whileHover={{ scale: 1.05 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer group transition-transform duration-500"
          >
            <img
              src={`${item.imageUrl}?w=600&h=600&c_fill&q_auto&fm=webp`}
              alt={item.title}
              loading="lazy"
              className="w-full h-60 sm:h-64 md:h-64 lg:h-72 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover overlay with title + button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl z-20 opacity-0 group-hover:opacity-100 bg-black/30"
            >
              <h2 className="text-md md:text-lg font-bold text-white mb-2 text-center px-2">
                {item.title}
              </h2>
              <Link
                to="/booking"
                className="bg-amber-400 text-black px-4 py-2 md:px-6 md:py-3 rounded-full font-bold uppercase tracking-wide shadow-lg hover:scale-105 transition-transform duration-300 z-30"
              >
                Book Now
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Bottom padding */}
      <div className="pb-20"></div>
    </div>
  );
};

export default Gallery;
