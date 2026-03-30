import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ServiceCard = ({ title, price, image, icon, vip }) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.05 }}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur-lg shadow-xl cursor-pointer transition-all duration-300
        ${vip ? "md:scale-[1.05] border-yellow-400 shadow-[0_0_30px_rgba(255,215,0,0.5)]" : ""}
      `}
    >
      {/* VIP Badge */}
      {vip && (
        <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold text-sm flex items-center gap-1 z-10">
          <span>VIP</span>
        </div>
      )}

      {/* Image */}
      <div className="w-full h-52 sm:h-60 md:h-64 overflow-hidden rounded-t-3xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Overlay icon */}
      <div className="absolute top-4 left-4 bg-primary/20 p-3 rounded-full text-2xl text-white z-10">
        {icon}
      </div>

      {/* Card Content */}
      <div className="p-6 text-center flex flex-col items-center">
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-primary font-semibold text-lg mb-4">{price}</p>
        <Link
          to="/booking"
          className={`px-6 py-2 rounded-full font-semibold shadow-lg transition 
            ${
              vip
                ? "bg-yellow-400 text-black hover:shadow-[0_0_25px_rgba(255,215,0,0.7)] hover:scale-105"
                : "bg-primary text-black hover:shadow-[0_0_15px_rgba(255,215,0,0.5)] hover:scale-105"
            }
          `}
        >
          Book Now
        </Link>
      </div>

      {/* VIP Glow Effect */}
      {vip && (
        <div className="absolute inset-0 pointer-events-none rounded-3xl border border-yellow-400/30 shadow-[0_0_50px_rgba(255,215,0,0.3)] animate-pulse"></div>
      )}
    </motion.div>
  );
};

export default ServiceCard;
