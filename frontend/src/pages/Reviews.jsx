import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

import {
  FaStar,
  FaRegStar,
  FaQuoteLeft,
  FaCheckCircle,
  FaTimes,
  FaExpand,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { useLanguage } from "../context/LanguageContext.jsx";

import en from "../translations/en.json";
import am from "../translations/am.json";

const CACHE_KEY = "nhatty_reviews_cache";
const CACHE_TIME_KEY = "nhatty_reviews_cache_time";

const CACHE_DURATION = 1000 * 60 * 60 * 24;

const Reviews = () => {
  const { language } = useLanguage();

  const translations = language === "AM" ? am : en;

  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedReview, setSelectedReview] = useState(null);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const mountedRef = useRef(true);

  useEffect(() => {
    const controller = new AbortController();

    mountedRef.current = true;

    const fetchReviews = async () => {
      try {
        const cached = localStorage.getItem(CACHE_KEY);

        const cacheTime = localStorage.getItem(CACHE_TIME_KEY);

        if (cached && cacheTime) {
          const valid = Date.now() - Number(cacheTime) < CACHE_DURATION;

          if (valid) {
            const data = JSON.parse(cached);

            if (mountedRef.current) {
              setReviews(data);

              setLoading(false);
            }
          }
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/reviews`,

          {
            signal: controller.signal,
            timeout: 10000,
          },
        );

        let data = [];

        if (Array.isArray(response.data)) {
          data = response.data;
        } else if (response.data && Array.isArray(response.data.reviews)) {
          data = response.data.reviews;
        } else {
          console.error("Unexpected reviews response:", response.data);

          data = [];
        }
        data.sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;

          if (!a.pinned && b.pinned) return 1;

          return 0;
        });

        if (mountedRef.current) {
          setReviews(data);
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(data));

        localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Review fetch error:", error);
        }
      } finally {
        if (mountedRef.current) {
          setLoading(false);
        }
      }
    };

    fetchReviews();

    return () => {
      mountedRef.current = false;

      controller.abort();
    };
  }, []);

  const openImagePreview = (review, index) => {
    setSelectedReview(review);

    setSelectedIndex(index);
  };

  const closeImagePreview = () => {
    setSelectedReview(null);
  };

  const nextImage = () => {
    if (!reviews.length) return;

    const next = (selectedIndex + 1) % reviews.length;

    setSelectedIndex(next);

    setSelectedReview(reviews[next]);
  };

  const previousImage = () => {
    if (!reviews.length) return;

    const previous = (selectedIndex - 1 + reviews.length) % reviews.length;

    setSelectedIndex(previous);

    setSelectedReview(reviews[previous]);
  };
  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* ============================
            HERO SECTION
      ============================= */}

      <section className="pt-24 pb-12 px-6 text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: -30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <h1 className="text-4xl md:text-6xl font-black">
            <span className="text-yellow-400">
              {translations.reviews.title}
            </span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mt-5 text-lg">
            {translations.reviews.description}
          </p>
        </motion.div>
      </section>

      {/* ============================
            REVIEWS GRID
      ============================= */}

      <section className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-yellow-400 text-lg">
              {translations.reviews.loading}
            </p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">
              {translations.reviews.noReviews}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review._id || index}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="
                  relative
                  bg-white/5
                  backdrop-blur-xl
                  border
                  border-white/10
                  rounded-3xl
                  p-6
                  hover:border-yellow-400/40
                  transition
                  "
              >
                <FaQuoteLeft
                  className="
                    text-yellow-400
                    text-3xl
                    mb-5
                    opacity-70
                    "
                />

                {/* REVIEW IMAGE */}

                {review.photoUrl && (
                  <div className="relative mb-5 group">
                    <img
                      src={review.photoUrl}
                      alt={review.name || "Review"}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                      className="
                        w-full
                        h-52
                        object-cover
                        rounded-2xl
                        "
                    />

                    <button
                      onClick={() => openImagePreview(review, index)}
                      className="
                        absolute
                        inset-0
                        bg-black/50
                        opacity-0
                        group-hover:opacity-100
                        transition
                        flex
                        items-center
                        justify-center
                        rounded-2xl
                        "
                    >
                      <FaExpand
                        className="
                          text-white
                          text-2xl
                          "
                      />
                    </button>
                  </div>
                )}

                {/* STARS */}

                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= Number(review.rating || 5) ? (
                      <FaStar key={star} className="text-yellow-400" />
                    ) : (
                      <FaRegStar key={star} className="text-gray-500" />
                    ),
                  )}
                </div>

                {/* COMMENT */}

                <p className="text-gray-300 leading-relaxed mb-5">
                  {review.comment}
                </p>

                {/* USER INFO */}

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white">{review.name}</h3>

                    <p className="text-sm text-yellow-400">{review.role}</p>
                  </div>

                  {review.pinned && (
                    <FaCheckCircle
                      className="
                          text-yellow-400
                          text-xl
                          "
                      title="Verified Review"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ============================
            IMAGE PREVIEW MODAL
      ============================= */}

      <AnimatePresence>
        {selectedReview && (
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
            z-50
            bg-black/90
            flex
            items-center
            justify-center
            p-6
            "
            onClick={closeImagePreview}
          >
            <motion.div
              initial={{
                scale: 0.8,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: 0.8,
              }}
              className="
              relative
              max-w-5xl
              w-full
              "
              onClick={(e) => e.stopPropagation()}
            >
              {" "}
              {/* CLOSE BUTTON */}
              <button
                onClick={closeImagePreview}
                className="
                absolute
                -top-12
                right-0
                text-white
                text-3xl
                hover:text-yellow-400
                transition
                "
                aria-label="Close image"
              >
                <FaTimes />
              </button>
              {/* PREVIOUS IMAGE */}
              {reviews.length > 1 && (
                <button
                  onClick={previousImage}
                  className="
                    absolute
                    left-2
                    top-1/2
                    -translate-y-1/2
                    bg-black/60
                    text-white
                    w-12
                    h-12
                    rounded-full
                    flex
                    items-center
                    justify-center
                    hover:bg-yellow-400
                    hover:text-black
                    transition
                    z-10
                    "
                  aria-label="Previous image"
                >
                  <FaChevronLeft />
                </button>
              )}
              {/* FULL IMAGE */}
              <img
                src={selectedReview.photoUrl}
                alt="Review Preview"
                className="
                w-full
                max-h-[85vh]
                object-contain
                rounded-3xl
                "
              />
              {/* NEXT IMAGE */}
              {reviews.length > 1 && (
                <button
                  onClick={nextImage}
                  className="
                    absolute
                    right-2
                    top-1/2
                    -translate-y-1/2
                    bg-black/60
                    text-white
                    w-12
                    h-12
                    rounded-full
                    flex
                    items-center
                    justify-center
                    hover:bg-yellow-400
                    hover:text-black
                    transition
                    z-10
                    "
                  aria-label="Next image"
                >
                  <FaChevronRight />
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================
            CTA SECTION
      ============================= */}

      <section className="text-center pb-20 px-6">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          <h2
            className="
            text-3xl
            md:text-5xl
            font-bold
            text-yellow-400
            mb-5
            "
          >
            {translations.reviews.ctaTitle}
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            {translations.reviews.ctaDescription}
          </p>

          <a
            href="/booking"
            className="
            inline-block
            bg-gradient-to-r
            from-yellow-400
            to-orange-500
            text-black
            font-bold
            px-10
            py-4
            rounded-full
            hover:scale-105
            transition
            "
          >
            {translations.reviews.bookAppointment}
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default Reviews;
