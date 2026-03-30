import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ServiceCard = ({ title, price }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="bg-card p-8 rounded-2xl border border-gray-800 hover:border-primary transition"
    >
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-primary text-xl mb-4">{price}</p>

      <Link
        to="/booking"
        className="border border-primary px-4 py-2 rounded-lg inline-block"
      >
        Book Now
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
