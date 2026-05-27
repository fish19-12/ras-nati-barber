import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaQuoteLeft,
  FaCheckCircle,
  FaTimes,
  FaExpand,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import axios from "axios";

/* =========================================================
   LOCAL CACHE CONFIG
========================================================= */

const CACHE_KEY = "nhatty_reviews_cache";
const CACHE_TIME_KEY = "nhatty_reviews_cache_time";

/* CACHE FOR 24 HOURS */
const CACHE_DURATION = 1000 * 60 * 60 * 24;

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // MODAL
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const mountedRef = useRef(true);

  /* =========================================================
     FETCH REVIEWS
  ========================================================= */

  useEffect(() => {
    mountedRef.current = true;

    const controller = new AbortController();

    const loadReviews = async () => {
      try {
        /* =========================================
           1. LOAD CACHE INSTANTLY
        ========================================= */

        const cachedReviews = localStorage.getItem(CACHE_KEY);
        const cacheTime = localStorage.getItem(CACHE_TIME_KEY);

        if (cachedReviews && cacheTime) {
          const isCacheValid = Date.now() - Number(cacheTime) < CACHE_DURATION;

          if (isCacheValid) {
            const parsed = JSON.parse(cachedReviews);

            if (mountedRef.current) {
              setReviews(parsed);
              setLoading(false);
            }
          }
        }

        /* =========================================
           2. FETCH FRESH DATA
        ========================================= */

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/reviews`,
          {
            signal: controller.signal,
            timeout: 4000,
            headers: {
              "Cache-Control": "public",
            },
          },
        );

        let freshReviews = Array.isArray(res.data) ? res.data : [];

        /* =========================================
           PIN FIRST 5 REVIEWS
        ========================================= */

        freshReviews = [...freshReviews].sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return 0;
        });

        /* =========================================
           UPDATE ONLY IF CHANGED
        ========================================= */

        const oldData = JSON.stringify(reviews);
        const newData = JSON.stringify(freshReviews);

        if (oldData !== newData && mountedRef.current) {
          setReviews(freshReviews);
        }

        /* =========================================
           SAVE CACHE
        ========================================= */

        localStorage.setItem(CACHE_KEY, JSON.stringify(freshReviews));

        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Review fetch failed:", err);
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    loadReviews();

    return () => {
      mountedRef.current = false;
      controller.abort();
    };
  }, []);

  /* =========================================================
     MODAL FUNCTIONS
  ========================================================= */

  const openModal = (review, index) => {
    setSelectedReview(review);
    setSelectedIndex(index);

    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedReview(null);

    document.body.style.overflow = "auto";
  };

  const nextReview = () => {
    const nextIndex = (selectedIndex + 1) % reviews.length;

    setSelectedReview(reviews[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  const prevReview = () => {
    const prevIndex = (selectedIndex - 1 + reviews.length) % reviews.length;

    setSelectedReview(reviews[prevIndex]);
    setSelectedIndex(prevIndex);
  };

  /* =========================================================
     STAR RENDER
  ========================================================= */

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => {
      if (i + 1 <= rating) {
        return <FaStar key={i} className="text-yellow-400 mr-1" />;
      }

      if (i + 0.5 === rating) {
        return <FaStarHalfAlt key={i} className="text-yellow-400 mr-1" />;
      }

      return <FaRegStar key={i} className="text-yellow-400 mr-1" />;
    });
  };

  return (
    <>
      <section className="relative w-full bg-gradient-to-b from-black via-[#0b0b0b] to-black text-white py-24 px-4 sm:px-6 md:px-12 font-exo overflow-hidden">
        {/* BACKGROUND GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-500/10 blur-[140px] rounded-full pointer-events-none" />

        {/* HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-yellow-300 via-yellow-500 to-yellow-700 bg-clip-text text-transparent"
          >
            Client Reviews
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto"
          >
            At{" "}
            <span className="text-yellow-400 font-semibold">
              Nhatty The Barber
            </span>
            , we provide premium grooming experiences trusted by influencers,
            celebrities, and thousands of loyal clients across Ethiopia.
          </motion.p>

          <p className="text-gray-500 mt-4">
            Every haircut is crafted with precision, passion, and creativity.
          </p>
        </div>

        {/* STATS */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 text-center mb-20 relative z-10">
          {[
            { value: "10K+", label: "Happy Clients" },
            { value: "5★", label: "Average Rating" },
            { value: "100+", label: "Celebrity Clients" },
            { value: "5+", label: "Years Experience" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-6"
            >
              <h2 className="text-3xl font-bold text-yellow-400">
                {item.value}
              </h2>

              <p className="text-gray-400 mt-2">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* REVIEWS */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex lg:grid lg:grid-cols-3 gap-8 overflow-x-auto lg:overflow-visible pb-4 snap-x snap-mandatory scrollbar-hide">
            {/* LOADING */}
            {loading &&
              reviews.length === 0 &&
              Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-[320px] lg:w-auto bg-white/10 rounded-3xl overflow-hidden animate-pulse"
                >
                  <div className="w-full h-72 bg-gray-700"></div>

                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-600 rounded"></div>
                    <div className="h-4 bg-gray-600 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                  </div>
                </div>
              ))}

            {/* REVIEWS */}
            {reviews.map((review, index) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10 }}
                className={`group relative flex-shrink-0 w-[320px] lg:w-auto rounded-[30px] overflow-hidden border backdrop-blur-xl snap-center ${
                  index < 5
                    ? "border-yellow-400/40 bg-gradient-to-b from-yellow-500/10 to-white/5"
                    : "border-white/10 bg-white/5"
                } shadow-2xl`}
              >
                {/* TOP BADGE */}
                {index < 5 && (
                  <div className="absolute top-4 left-4 z-20 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    TOP REVIEW
                  </div>
                )}

                {/* IMAGE */}
                <div className="relative w-full h-80 overflow-hidden">
                  <img
                    src={review.photoUrl}
                    alt={review.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  {/* FULL IMAGE BUTTON */}
                  <button
                    onClick={() => openModal(review, index)}
                    className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-yellow-400 hover:text-black transition"
                  >
                    <FaExpand />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col justify-between gap-4">
                  <FaQuoteLeft className="text-yellow-400 text-2xl opacity-70" />

                  <div>
                    <h3 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
                      {review.name}

                      <FaCheckCircle className="text-green-400 text-sm" />
                    </h3>

                    <p className="text-gray-400 text-sm mt-1">{review.role}</p>

                    <p className="text-gray-300 mt-4 leading-relaxed line-clamp-4">
                      "{review.comment}"
                    </p>
                  </div>

                  {/* STARS */}
                  <div className="flex items-center mt-2">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-2xl flex items-center justify-center"
          >
            {/* CLOSE */}
            <button
              onClick={closeModal}
              className="fixed top-3 right-3 sm:top-6 sm:right-6 z-50 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/50 border border-white/10 hover:bg-red-500 transition flex items-center justify-center text-white text-lg sm:text-xl backdrop-blur-xl"
            >
              <FaTimes />
            </button>

            {/* PREV */}
            <button
              onClick={prevReview}
              className="fixed left-2 sm:left-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/50 border border-white/10 hover:bg-yellow-400 hover:text-black transition hidden sm:flex items-center justify-center text-white backdrop-blur-xl"
            >
              <FaChevronLeft />
            </button>

            {/* NEXT */}
            <button
              onClick={nextReview}
              className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 z-50 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-black/50 border border-white/10 hover:bg-yellow-400 hover:text-black transition hidden sm:flex items-center justify-center text-white backdrop-blur-xl"
            >
              <FaChevronRight />
            </button>

            {/* MOBILE NAV */}
            <div className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
              <button
                onClick={prevReview}
                className="w-12 h-12 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center backdrop-blur-xl"
              >
                <FaChevronLeft />
              </button>

              <button
                onClick={nextReview}
                className="w-12 h-12 rounded-full bg-black/60 border border-white/10 text-white flex items-center justify-center backdrop-blur-xl"
              >
                <FaChevronRight />
              </button>
            </div>

            {/* FULL IMAGE VIEW */}
            <motion.div
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full flex items-center justify-center p-3 sm:p-6"
            >
              {/* IMAGE */}
              <img
                src={selectedReview.photoUrl}
                alt={selectedReview.name}
                className="
                  max-w-full
                  max-h-[70vh]
                  sm:max-h-[85vh]
                  object-contain
                  rounded-2xl
                  shadow-[0_0_80px_rgba(255,215,0,0.15)]
                "
              />

              {/* INFO CARD */}
              <div
                className="
                  absolute
                  bottom-4
                  left-1/2
                  -translate-x-1/2
                  w-[95%]
                  sm:w-auto
                  max-w-2xl
                  bg-black/55
                  backdrop-blur-2xl
                  border
                  border-white/10
                  rounded-3xl
                  p-4
                  sm:p-6
                "
              >
                <div className="flex items-start gap-3">
                  <FaQuoteLeft className="text-yellow-400 text-xl sm:text-2xl mt-1 flex-shrink-0" />

                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-3xl font-black text-yellow-400 leading-tight">
                      {selectedReview.name}
                    </h2>

                    <p className="text-gray-400 text-sm sm:text-base mt-1">
                      {selectedReview.role}
                    </p>

                    <div className="flex items-center mt-3 flex-wrap">
                      {renderStars(selectedReview.rating)}
                    </div>

                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-4 max-h-[120px] sm:max-h-[180px] overflow-y-auto pr-1">
                      "{selectedReview.comment}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Reviews;
