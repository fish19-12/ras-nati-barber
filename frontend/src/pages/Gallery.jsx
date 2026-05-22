import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(10);

  const fetchImages = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/gallery`,
        { timeout: 8000 },
      );

      setImages(res.data);
      sessionStorage.setItem("galleryImages", JSON.stringify(res.data));
    } catch (error) {
      console.error("Gallery fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cached = sessionStorage.getItem("galleryImages");

    if (cached) {
      setImages(JSON.parse(cached));
      setLoading(false);
    }

    fetchImages();
  }, []);

  const showMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  return (
    <div className="w-full bg-black text-white min-h-screen">
      {/* ===== HEADER ===== */}
      <div className="text-center pt-20 pb-10 px-5">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-extrabold text-yellow-400"
        >
          Nhatty The Barber Gallery
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-400 mt-4 max-w-2xl mx-auto"
        >
          Explore modern hairstyles, premium fades, luxury grooming, and elite
          barber transformations crafted with perfection.
        </motion.p>
      </div>

      {/* ===== GRID ===== */}
      <div className="max-w-7xl mx-auto px-4 pb-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
        <AnimatePresence>
          {images.slice(0, visibleCount).map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl overflow-hidden group bg-[#111]"
            >
              {/* IMAGE (FULL VIEW - NO ZOOM CROP) */}
              <img
                src={item.imageUrl}
                alt={item.title}
                loading="lazy"
                className="w-full h-48 sm:h-56 object-contain bg-black transition duration-300"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <Link
                  to="/booking"
                  className="bg-yellow-400 text-black px-4 py-2 rounded-full font-bold text-sm"
                >
                  Book Now
                </Link>
              </div>

              {/* TITLE (SMALL LABEL) */}
              <div className="absolute bottom-0 left-0 w-full bg-black/60 text-center py-1 text-xs text-white">
                {item.title}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ===== SHOW MORE ===== */}
      {visibleCount < images.length && (
        <div className="flex justify-center pb-12">
          <button
            onClick={showMore}
            className="px-7 py-3 bg-yellow-400 text-black font-bold rounded-full hover:scale-105 transition"
          >
            Show More
          </button>
        </div>
      )}

      {/* ===== LOADING ANIMATION ===== */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 pb-10">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="h-48 bg-gray-800 animate-pulse rounded-xl"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
