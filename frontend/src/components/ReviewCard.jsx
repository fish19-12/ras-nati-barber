import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({
  name = "Customer Name",
  comment = "Best barber shop! Clean fade and friendly service.",
  rating = 5,
  image = "https://randomuser.me/api/portraits/men/32.jpg",
}) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-black/60 backdrop-blur-md border border-gray-800 rounded-2xl p-6 flex flex-col items-center text-center"
    >
      {/* Customer Photo */}
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-full mb-4 border border-primary"
      />

      {/* Comment */}
      <p className="text-gray-300 mb-4">{comment}</p>

      {/* Star Rating */}
      <div className="flex gap-1 mb-2 text-yellow-400">
        {Array.from({ length: rating }).map((_, idx) => (
          <FaStar key={idx} />
        ))}
      </div>

      {/* Customer Name */}
      <h4 className="mt-2 font-bold text-white">{name}</h4>
    </motion.div>
  );
};

export default ReviewCard;
