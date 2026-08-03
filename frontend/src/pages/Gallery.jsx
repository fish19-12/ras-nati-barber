import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

import { useLanguage } from "../context/LanguageContext.jsx";

import en from "../translations/en.json";
import am from "../translations/am.json";

const Gallery = () => {
  const { language } = useLanguage();

  const translations = language === "AM" ? am : en;

  const [images, setImages] = useState([]);

  const [loading, setLoading] = useState(true);

  // SHOW FIRST 10 FAST
  const [visibleCount, setVisibleCount] = useState(10);

  // IMAGE PREVIEW
  const [selectedImage, setSelectedImage] = useState(null);

  // CURRENT INDEX
  const [selectedIndex, setSelectedIndex] = useState(0);

  /* =========================================================
      PRELOAD FIRST 10 IMAGES
  ========================================================= */

  const preloadImages = (imageArray = []) => {
    imageArray.slice(0, 10).forEach((img) => {
      if (!img?.imageUrl) return;

      const image = new Image();

      image.src = img.imageUrl;
    });
  };

  /* =========================================================
      SORT PINNED FIRST
  ========================================================= */

  const sortImages = (imageArray = []) => {
    return [...imageArray].sort((a, b) => {
      if (a.pinned && !b.pinned) {
        return -1;
      }

      if (!a.pinned && b.pinned) {
        return 1;
      }

      return 0;
    });
  };

  /* =========================================================
      FETCH IMAGES
  ========================================================= */

  const fetchImages = async () => {
    try {
      const cached = localStorage.getItem("galleryImages");

      // SHOW CACHE FIRST

      if (cached) {
        try {
          const parsed = JSON.parse(cached);

          if (Array.isArray(parsed)) {
            const sortedCached = sortImages(parsed);

            setImages(sortedCached);

            preloadImages(sortedCached);

            setLoading(false);
          }
        } catch (error) {
          console.error("Gallery cache error:", error);

          localStorage.removeItem("galleryImages");
        }
      }

      // FETCH FROM SERVER

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/gallery`,
        {
          timeout: 8000,
        },
      );

      let newImages = Array.isArray(res.data) ? res.data : [];

      newImages = sortImages(newImages);

      setImages(newImages);

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

  /* =========================================================
      SHOW MORE
  ========================================================= */

  const showMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  /* =========================================================
      MODAL FUNCTIONS
  ========================================================= */

  const openPreview = (image, index) => {
    setSelectedImage(image);

    setSelectedIndex(index);

    document.body.style.overflow = "hidden";
  };

  const closePreview = () => {
    setSelectedImage(null);

    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    if (!images.length) return;

    const next = (selectedIndex + 1) % images.length;

    setSelectedImage(images[next]);

    setSelectedIndex(next);
  };

  const prevImage = () => {
    if (!images.length) return;

    const prev = (selectedIndex - 1 + images.length) % images.length;

    setSelectedImage(images[prev]);

    setSelectedIndex(prev);
  };

  /* =========================================================
      LOADER
  ========================================================= */

  if (loading) {
    return (
      <div
        className="
          w-full
          min-h-screen
          bg-black
          flex
          flex-col
          items-center
          justify-center
          overflow-hidden
        "
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
          className="
            w-16
            h-16
            border-4
            border-yellow-400
            border-t-transparent
            rounded-full
          "
        />

        <motion.h2
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
          }}
          className="
            text-yellow-400
            text-lg
            sm:text-xl
            font-bold
            mt-6
            tracking-[4px]
          "
        >
          {translations.gallery?.loading || "LOADING GALLERY"}
        </motion.h2>

        <motion.div
          initial={{
            width: 0,
          }}
          animate={{
            width: 180,
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
          }}
          className="
            h-[2px]
            bg-yellow-400
            mt-4
            rounded-full
          "
        />
      </div>
    );
  }

  return (
    <div
      className="
        w-full
        bg-black
        text-white
        overflow-hidden
      "
    >
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
        {/* GLOW */}

        <div
          className="
            absolute
            inset-0
            bg-yellow-400/10
            blur-3xl
            pointer-events-none
          "
        />

        {/* TITLE */}

        <motion.h1
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
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
          {translations.gallery?.title || "NHATTY THE BARBER"}
        </motion.h1>

        {/* SUBTITLE */}

        <motion.h2
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.15,
          }}
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
          {translations.gallery?.subtitle || "Luxury Haircut Collection"}
        </motion.h2>

        {/* DESCRIPTION */}

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.3,
          }}
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
          {translations.gallery?.description ||
            "Discover elite fades, modern styles, sharp lineups, and premium grooming artistry crafted with passion and precision."}
        </motion.p>
      </div>
      {/* GALLERY */}
      <div
        className="
          max-w-[1800px]
          mx-auto
          px-3
          sm:px-4
          md:px-6
          pb-10
        "
      >
        <div
          className="
            grid
            grid-cols-2
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5
            gap-3
            sm:gap-4
            md:gap-5
          "
        >
          <AnimatePresence>
            {images.slice(0, visibleCount).map((item, index) => (
              <motion.div
                key={item._id || index}
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
                  shadow-lg
                "
              >
                {/* TOP STYLE BADGE */}

                {index < 8 && (
                  <div
                    className="
                      absolute
                      top-3
                      left-3
                      z-30
                      bg-yellow-400
                      text-black
                      text-[10px]
                      sm:text-xs
                      font-black
                      px-3
                      py-1
                      rounded-full
                      shadow-xl
                    "
                  >
                    {translations.gallery?.topStyle || "TOP STYLE"}
                  </div>
                )}

                {/* IMAGE */}

                <div
                  className="
                    relative
                    bg-black
                    overflow-hidden
                  "
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title || "gallery image"}
                    loading={index < 10 ? "eager" : "lazy"}
                    className="
                      w-full
                      h-[170px]
                      sm:h-[230px]
                      md:h-72
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  {/* QUICK VIEW */}

                  <button
                    onClick={() => openPreview(item, index)}
                    className="
                      absolute
                      top-3
                      right-3
                      bg-black/70
                      backdrop-blur-md
                      p-2
                      rounded-full
                      text-white
                      opacity-100
                      sm:opacity-0
                      sm:group-hover:opacity-100
                      transition
                      z-20
                    "
                  >
                    <ZoomIn size={18} />
                  </button>
                </div>

                {/* OVERLAY */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-black/45
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-300
                    flex
                    items-center
                    justify-center
                  "
                >
                  <div
                    className="
                      flex
                      flex-col
                      gap-3
                      items-center
                    "
                  >
                    {/* PREVIEW BUTTON */}

                    <button
                      onClick={() => openPreview(item, index)}
                      className="
                        bg-white/10
                        backdrop-blur-md
                        border
                        border-white/20
                        text-white
                        text-xs
                        sm:text-sm
                        px-4
                        py-2
                        rounded-full
                        font-semibold
                        hover:scale-105
                        transition
                      "
                    >
                      {translations.gallery?.previewStyle || "Preview Style"}
                    </button>

                    {/* BOOK BUTTON */}

                    <Link
                      to="/booking"
                      className="
                        bg-yellow-400
                        text-black
                        text-xs
                        sm:text-base
                        px-5
                        py-2
                        rounded-full
                        font-bold
                        hover:scale-105
                        transition
                      "
                    >
                      {translations.navbar?.bookNow || "Book Now"}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      {/* SHOW MORE */}
      {visibleCount < images.length && (
        <div
          className="
              flex
              justify-center
              px-4
              pb-14
            "
        >
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
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
            {translations.gallery?.showMore || "Show More"}
          </motion.button>
        </div>
      )}{" "}
      {/* IMAGE PREVIEW MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[9999]
              bg-black/95
              backdrop-blur-xl
              flex
              items-center
              justify-center
            "
          >
            {/* CLOSE BUTTON */}

            <button
              onClick={closePreview}
              className="
                fixed
                top-4
                right-4
                sm:top-6
                sm:right-6
                z-50
                bg-black/60
                border
                border-white/10
                hover:bg-red-500
                p-3
                rounded-full
                transition
              "
            >
              <X size={24} />
            </button>

            {/* PREVIOUS BUTTON */}

            <button
              onClick={prevImage}
              className="
                hidden
                sm:flex
                fixed
                left-4
                top-1/2
                -translate-y-1/2
                z-50
                w-14
                h-14
                rounded-full
                bg-black/60
                border
                border-white/10
                items-center
                justify-center
                hover:bg-yellow-400
                hover:text-black
                transition
              "
            >
              <ChevronLeft size={28} />
            </button>

            {/* NEXT BUTTON */}

            <button
              onClick={nextImage}
              className="
                hidden
                sm:flex
                fixed
                right-4
                top-1/2
                -translate-y-1/2
                z-50
                w-14
                h-14
                rounded-full
                bg-black/60
                border
                border-white/10
                items-center
                justify-center
                hover:bg-yellow-400
                hover:text-black
                transition
              "
            >
              <ChevronRight size={28} />
            </button>

            {/* IMAGE CONTENT */}

            <motion.div
              initial={{
                scale: 0.92,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.92,
                opacity: 0,
              }}
              className="
                relative
                w-full
                h-full
                flex
                items-center
                justify-center
                p-3
                sm:p-8
              "
            >
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title || "preview"}
                className="
                  max-w-full
                  max-h-[75vh]
                  sm:max-h-[88vh]
                  object-contain
                  rounded-3xl
                  shadow-[0_0_80px_rgba(255,215,0,0.18)]
                "
              />

              {/* INFO CARD */}

              <div
                className="
                  absolute
                  bottom-4
                  left-1/2
                  -translate-x-1/2
                  w-[94%]
                  sm:w-auto
                  max-w-2xl
                  bg-black/60
                  backdrop-blur-2xl
                  border
                  border-white/10
                  rounded-3xl
                  p-4
                  sm:p-6
                "
              >
                <p
                  className="
                    text-gray-300
                    text-sm
                    sm:text-base
                    text-center
                  "
                >
                  {translations.gallery?.premiumText ||
                    "Premium haircut inspiration from NHATTY THE BARBER."}
                </p>

                <div
                  className="
                    flex
                    justify-center
                  "
                >
                  <Link
                    to="/booking"
                    className="
                      inline-flex
                      mt-5
                      bg-yellow-400
                      text-black
                      px-6
                      py-3
                      rounded-full
                      font-black
                      hover:scale-105
                      transition
                    "
                  >
                    {translations.gallery?.bookStyle || "Book This Style"}
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* MOBILE NAVIGATION */}

            <div
              className="
                sm:hidden
                fixed
                bottom-6
                left-1/2
                -translate-x-1/2
                z-50
                flex
                gap-4
              "
            >
              <button
                onClick={prevImage}
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-black/60
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                "
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={nextImage}
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-black/60
                  border
                  border-white/10
                  flex
                  items-center
                  justify-center
                "
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
