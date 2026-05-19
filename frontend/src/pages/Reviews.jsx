import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

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
    <>
      {/* SEO */}
      <Helmet>
        <title>Client Reviews | Best Barber Reviews in Ethiopia</title>

        <meta
          name="description"
          content="Read real client reviews and testimonials for Nhatty The Barber. Trusted by influencers, celebrities, and thousands of satisfied clients across Ethiopia."
        />

        <meta
          name="keywords"
          content="barber reviews Ethiopia, Addis Ababa barber reviews, best barber Ethiopia, Nhatty The Barber reviews, African barber testimonials, skin fade reviews"
        />

        <meta name="author" content="Nhatty The Barber" />

        <meta name="robots" content="index, follow" />

        {/* CANONICAL */}
        <link rel="canonical" href="https://nhattythebarber.com/reviews" />

        {/* OPEN GRAPH */}
        <meta
          property="og:title"
          content="Client Reviews | Nhatty The Barber Ethiopia"
        />

        <meta
          property="og:description"
          content="Discover why clients across Ethiopia trust Nhatty The Barber for premium grooming, luxury haircuts, and modern barber styles."
        />

        <meta
          property="og:image"
          content="https://nhattythebarber.com/logo.jpg"
        />

        <meta property="og:url" content="https://nhattythebarber.com/reviews" />

        <meta property="og:type" content="website" />

        {/* TWITTER */}
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="twitter:title" content="Nhatty The Barber Reviews" />

        <meta
          name="twitter:description"
          content="Real barber reviews and testimonials from clients in Ethiopia."
        />

        <meta
          name="twitter:image"
          content="https://nhattythebarber.com/logo.jpg"
        />
      </Helmet>

      <section className="relative w-full bg-gradient-to-b from-black via-[#0b0b0b] to-black text-white py-24 px-6 md:px-12 font-exo overflow-hidden">
        {/* HEADER */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
          >
            Client Reviews
          </motion.h1>

          <p className="text-gray-400 text-lg leading-relaxed">
            At{" "}
            <span className="text-yellow-400 font-semibold">
              Nhatty The Barber
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
            <h2 className="text-3xl font-bold text-yellow-400">5</h2>

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
              reviews.map((review, index) => (
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
                      alt={
                        review.name
                          ? `${review.name} review for Nhatty The Barber`
                          : `Barber client review ${index + 1}`
                      }
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col justify-between gap-4">
                    <FaQuoteLeft
                      className="text-yellow-400 text-xl opacity-60"
                      aria-hidden="true"
                    />

                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 flex items-center gap-2">
                        {review.name}

                        <FaCheckCircle
                          className="text-green-400 text-sm"
                          aria-label="Verified client"
                        />
                      </h3>

                      <p className="text-gray-400 text-sm">{review.role}</p>

                      <p className="text-gray-300 mt-3 leading-relaxed">
                        "{review.comment}"
                      </p>
                    </div>

                    {/* STARS */}
                    <div
                      className="flex items-center mt-4"
                      aria-label={`${review.rating} star review`}
                    >
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
    </>
  );
};

export default Reviews;
