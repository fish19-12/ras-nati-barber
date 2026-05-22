import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // SHOW FIRST 10 FAST
  const [visibleCount, setVisibleCount] = useState(10);

  // PRELOAD FIRST 10 IMAGES
  const preloadImages = (imageArray) => {
    imageArray.slice(0, 10).forEach((img) => {
      const image = new Image();
      image.src = img.imageUrl;
    });
  };

  const fetchImages = async () => {
    try {
      // CACHE
      const cached = localStorage.getItem("galleryImages");

      // SHOW CACHE INSTANTLY
      if (cached) {
        const parsedImages = JSON.parse(cached);

        setImages(parsedImages);
        preloadImages(parsedImages);

        setLoading(false);
      }

      // FETCH NEW DATA
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/gallery`,
        {
          timeout: 8000,
        },
      );

      const newImages = res.data;

      setImages(newImages);

      // UPDATE CACHE
      localStorage.setItem("galleryImages", JSON.stringify(newImages));

      preloadImages(newImages);
    } catch (error) {
      console.error("Gallery fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const showMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  // LOADER
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full"
        />

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-yellow-400 text-lg sm:text-xl font-bold mt-6 tracking-[4px]"
        >
          LOADING GALLERY
        </motion.h2>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 180 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
          }}
          className="h-[2px] bg-yellow-400 mt-4 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="w-full bg-black text-white overflow-hidden">
      {/* HERO */}
      <div
        className="
          relative
          text-center
          px-4
          sm:px-6
          pt-28
          sm:pt-32
          md:pt-36
          pb-10
        "
      >
        {/* MODERN GLOW */}
        <div className="absolute inset-0 bg-yellow-400/10 blur-3xl pointer-events-none" />

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="
            relative
            z-10
            text-4xl
            sm:text-5xl
            md:text-7xl
            font-black
            leading-tight
            bg-gradient-to-r
            from-yellow-200
            via-yellow-400
            to-yellow-600
            bg-clip-text
            text-transparent
            drop-shadow-[0_0_25px_rgba(250,204,21,0.35)]
          "
        >
          NHATTY THE BARBER
        </motion.h1>

        {/* SUBTITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="
            relative
            z-10
            text-yellow-400
            text-xl
            sm:text-2xl
            md:text-4xl
            font-bold
            mt-4
          "
        >
          Luxury Haircut Collection
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="
            relative
            z-10
            max-w-3xl
            mx-auto
            mt-5
            text-gray-400
            text-sm
            sm:text-base
            md:text-lg
            leading-relaxed
          "
        >
          Discover elite fades, modern styles, sharp lineups, and premium
          grooming artistry crafted with passion and precision.
        </motion.p>
      </div>

      {/* GALLERY */}
      <div className="max-w-[1800px] mx-auto px-2 sm:px-4 md:px-6 pb-10">
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5
            gap-2
            sm:gap-4
            md:gap-5
          "
        >
          <AnimatePresence>
            {images.slice(0, visibleCount).map((item, index) => (
              <motion.div
                key={item._id}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.03,
                }}
                whileHover={{
                  y: -6,
                }}
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  bg-zinc-900
                  border
                  border-zinc-800
                  group
                "
              >
                {/* IMAGE */}
                <div className="relative bg-black">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading={index < 10 ? "eager" : "lazy"}
                    className="
                      w-full
                      h-44
                      sm:h-56
                      md:h-72
                      object-contain
                      bg-black
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />
                </div>

                {/* OVERLAY */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-black/55
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-300
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Link
                    to="/booking"
                    className="
                      bg-yellow-400
                      text-black
                      text-sm
                      sm:text-base
                      px-4
                      sm:px-5
                      py-2
                      rounded-full
                      font-bold
                      hover:scale-105
                      transition
                    "
                  >
                    Book Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* SHOW MORE */}
      {visibleCount < images.length && (
        <div className="flex justify-center px-4 pb-14">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={showMore}
            className="
              bg-yellow-400
              text-black
              px-6
              sm:px-8
              py-3
              rounded-full
              font-black
              text-sm
              sm:text-base
              shadow-xl
              hover:shadow-yellow-400/30
              transition-all
              duration-300
            "
          >
            Show More
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
