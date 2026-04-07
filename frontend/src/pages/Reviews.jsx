import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaQuoteLeft,
  FaCheckCircle,
} from "react-icons/fa";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/reviews`,
          {
            signal: controller.signal,
            timeout: 5000,
          },
        );

        setReviews(res.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error("Failed to fetch reviews:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();

    return () => controller.abort();
  }, []);

  return (
    <section className="relative w-full bg-gradient-to-b from-black via-[#0b0b0b] to-black text-white py-24 px-6 md:px-12 font-exo overflow-hidden">
      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          Client Reviews
        </h1>

        <p className="text-gray-400 text-lg leading-relaxed">
          At{" "}
          <span className="text-yellow-400 font-semibold">
            Ras Nati Barber Shop
          </span>
          , we provide premium grooming experiences trusted by influencers,
          celebrities, and thousands of loyal clients across Ethiopia.
        </p>

        <p className="text-gray-500 mt-4">
          Every haircut is crafted with precision, passion, and creativity.
        </p>
      </div>

      {/* STATS */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-yellow-400">10K+</h2>
          <p className="text-gray-400">Happy Clients</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-yellow-400">4.9</h2>
          <p className="text-gray-400">Average Rating</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-yellow-400">100+</h2>
          <p className="text-gray-400">Celebrity Clients</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-yellow-400">5+</h2>
          <p className="text-gray-400">Years Experience</p>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-3 lg:gap-10">
        <div className="flex gap-8 overflow-x-auto lg:overflow-visible pb-4">
          {/* LOADING */}
          {loading &&
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-full max-w-xs lg:max-w-none bg-white/10 rounded-3xl overflow-hidden animate-pulse"
              >
                <div className="w-full h-64 bg-gray-700"></div>

                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-600 rounded"></div>
                  <div className="h-4 bg-gray-600 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                </div>
              </div>
            ))}

          {/* REAL REVIEWS */}
          {!loading &&
            reviews.map((review) => (
              <motion.div
                key={review._id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 w-full max-w-xs lg:max-w-none bg-white/5 backdrop-blur-xl border border-yellow-400/20 rounded-3xl overflow-hidden shadow-lg hover:shadow-[0_0_60px_rgba(255,215,0,0.35)] transition"
              >
                {/* PHOTO */}
                <div className="w-full h-64 relative overflow-hidden">
                  <img
                    src={review.photoUrl}
                    alt={review.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col justify-between gap-4">
                  <FaQuoteLeft className="text-yellow-400 text-xl opacity-60" />

                  <div>
                    <h3 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
                      {review.name}
                      <FaCheckCircle className="text-green-400 text-sm" />
                    </h3>

                    <p className="text-gray-400 text-sm">{review.role}</p>

                    <p className="text-gray-300 mt-3 leading-relaxed">
                      "{review.comment}"
                    </p>
                  </div>

                  {/* STARS */}
                  <div className="flex items-center mt-4">
                    {Array.from({ length: 5 }, (_, i) => {
                      if (i + 1 <= review.rating)
                        return (
                          <FaStar key={i} className="text-yellow-400 mr-1" />
                        );

                      if (i + 0.5 === review.rating)
                        return (
                          <FaStarHalfAlt
                            key={i}
                            className="text-yellow-400 mr-1"
                          />
                        );

                      return (
                        <FaRegStar key={i} className="text-yellow-400 mr-1" />
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
