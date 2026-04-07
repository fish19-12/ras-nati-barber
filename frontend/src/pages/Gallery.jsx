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

    const controller = new AbortController();

    const fetchImages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/gallery`,
          {
            signal: controller.signal,
            timeout: 5000,
          },
        );

        setImages(res.data);
        sessionStorage.setItem("galleryImages", JSON.stringify(res.data));
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Gallery fetch failed:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImages();

    return () => controller.abort();
  }, []);

  /* ---------------- LOADING SKELETON ---------------- */

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black flex items-center justify-center px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-64 bg-gray-800 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-b from-black via-[#0b0b0b] to-black text-white font-exo">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center pt-20 pb-16 px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-yellow-400 mb-6"
        >
          Ras Nati Gallery
        </motion.h1>

        <p className="text-gray-400 text-lg leading-relaxed">
          Welcome to the premium gallery of{" "}
          <span className="text-yellow-400 font-semibold">
            Ras Nati Barber Shop
          </span>
          . Our barbers create modern styles, fades, and luxury grooming
          experiences trusted by influencers, celebrities, and thousands of
          satisfied clients across Ethiopia.
        </p>

        <p className="text-gray-500 mt-4">
          Precision haircuts. Premium grooming. Iconic style.
        </p>
      </div>

      {/* GALLERY GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((item) => (
          <motion.div
            key={item._id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-2xl overflow-hidden shadow-xl group"
          >
            {/* IMAGE */}
            <img
              src={`${item.imageUrl}?w=600&h=600&c_fill&q_auto&fm=webp`}
              alt={item.title}
              loading="lazy"
              className="w-full h-60 sm:h-64 md:h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <h2 className="text-md md:text-lg font-bold text-white mb-3 text-center px-3">
                {item.title}
              </h2>

              <Link
                to="/booking"
                className="bg-yellow-400 text-black px-5 py-2 md:px-6 md:py-3 rounded-full font-semibold uppercase tracking-wide hover:scale-105 transition"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
