import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

// Sample reviews data (replace with backend later)
const reviews = [
  {
    name: "John Doe",
    role: "Celebrity Influencer",
    photo:
      "https://images.unsplash.com/photo-1590080870682-7e5f0f2d812d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    message:
      "Ras Nati Barber Shop gave me the best haircut I’ve ever had! Truly world-class service.",
    rating: 5,
  },
  {
    name: "Emma Watson",
    role: "International Client",
    photo:
      "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    message:
      "Amazing attention to detail and style! My hair has never looked better.",
    rating: 4.5,
  },
  {
    name: "Michael Smith",
    role: "Entrepreneur",
    photo:
      "https://images.unsplash.com/photo-1589571894960-20bbe2828d40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600",
    message:
      "Professional, luxurious, and precise. I recommend Ras Nati to everyone visiting Ethiopia.",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <div className="w-full bg-black text-white py-24 px-6 font-exo">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-16 tracking-wide">
        Customer Reviews
      </h1>

      <div className="flex flex-col gap-12 max-w-7xl mx-auto">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row bg-white/5 backdrop-blur-md rounded-3xl overflow-hidden border border-yellow-400/20 shadow-lg hover:shadow-[0_0_80px_rgba(255,215,0,0.5)] transition-transform"
          >
            {/* Photo Left */}
            <div className="md:w-1/3 w-full h-72 md:h-auto relative group">
              <div className="absolute inset-0 rounded-l-3xl border-4 border-yellow-400 shadow-2xl pointer-events-none"></div>
              <motion.img
                src={review.photo}
                alt={review.name}
                className="w-full h-full object-cover rounded-l-3xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Text Right */}
            <div className="md:w-2/3 w-full p-8 flex flex-col justify-center gap-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400">
                {review.name}
              </h3>
              <p className="text-gray-300 text-sm">{review.role}</p>
              <p className="text-gray-300 text-base leading-relaxed mt-2">
                "{review.message}"
              </p>

              {/* Rating */}
              <div className="flex space-x-1 mt-4">
                {Array.from({ length: 5 }, (_, i) => {
                  if (i + 1 <= review.rating) {
                    return (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <FaStar className="text-yellow-400" />
                      </motion.div>
                    );
                  } else if (i + 0.5 === review.rating) {
                    return (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <FaStarHalfAlt className="text-yellow-400" />
                      </motion.div>
                    );
                  } else {
                    return (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <FaRegStar className="text-yellow-400" />
                      </motion.div>
                    );
                  }
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
