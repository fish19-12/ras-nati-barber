import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import axios from "axios";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from backend (replace static data)
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/reviews`,
        );
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  return (
    <section className="w-full bg-black text-white py-20 px-4 sm:px-6 md:px-12 font-exo">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 tracking-wide">
        What Our Customers Say
      </h1>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {reviews.map((review) => (
          <motion.div
            key={review._id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-yellow-400/20 shadow-lg hover:shadow-[0_0_60px_rgba(255,215,0,0.5)] transition-transform"
          >
            {/* Photo Left */}
            <div className="md:w-1/3 w-full h-64 md:h-auto relative flex-shrink-0">
              <motion.img
                src={review.photoUrl || review.photo}
                alt={review.name}
                className="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none transition-transform duration-500 hover:scale-105"
              />
            </div>

            {/* Text Right */}
            <div className="md:w-2/3 w-full p-6 md:p-8 flex flex-col justify-between gap-4">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400">
                  {review.name}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  {review.role}
                </p>
                <p className="text-gray-300 text-base mt-2 leading-relaxed">
                  "{review.message}"
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center mt-4">
                {Array.from({ length: 5 }, (_, i) => {
                  if (i + 1 <= review.rating)
                    return <FaStar key={i} className="text-yellow-400 mr-1" />;
                  if (i + 0.5 === review.rating)
                    return (
                      <FaStarHalfAlt key={i} className="text-yellow-400 mr-1" />
                    );
                  return <FaRegStar key={i} className="text-yellow-400 mr-1" />;
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
