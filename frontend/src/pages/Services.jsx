import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCut, FaUserTie, FaFire, FaSpa, FaCrown } from "react-icons/fa";

import haircut from "../assets/haircut.jpg";
import shaving from "../assets/shaving.jpg";
import triming from "../assets/triming.jpg";
import hairstyling from "../assets/hairstyiling.jpg";
import treatment from "../assets/treatment.jpg";

const services = [
  {
    title: "Haircut",
    img: haircut,
    icon: <FaCut />,
    items: ["Classic", "Fade", "Kids", "Skin Fade"],
  },
  {
    title: "Shaving",
    img: shaving,
    icon: <FaUserTie />,
    items: ["Hot Towel", "Head Shave", "Beard"],
  },
  {
    title: "Trimming",
    img: triming,
    icon: <FaUserTie />,
    items: ["Beard", "Mustache", "Line Up"],
  },
  {
    title: "Styling",
    img: hairstyling,
    icon: <FaFire />,
    items: ["Pro Styling", "Coloring", "Blow Dry"],
  },
  {
    title: "Treatment",
    img: treatment,
    icon: <FaSpa />,
    items: ["Hair Care", "Massage", "Foot Relax"],
  },
  {
    title: "VIP",
    img: haircut,
    icon: <FaCrown />,
    items: ["Full Service", "Premium Care", "Relax"],
    vip: true,
  },
];

const Services = () => {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Soft Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 blur-[180px] opacity-30"></div>

      {/* Header */}
      <section className="text-center pt-28 pb-12 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase bg-gradient-to-r from-yellow-400 via-primary to-yellow-300 bg-clip-text text-transparent"
        >
          Our Services
        </motion.h1>

        <p className="text-gray-400 mt-3 text-sm sm:text-base max-w-md mx-auto">
          Clean cuts. Sharp style. Premium experience.
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="relative rounded-2xl overflow-hidden group border border-white/10 bg-white/5 backdrop-blur-md"
            >
              {/* Image */}
              <div
                className="h-48 bg-cover bg-center group-hover:scale-105 transition duration-500"
                style={{ backgroundImage: `url(${service.img})` }}
              />

              {/* Content */}
              <div className="p-5">
                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`text-xl ${
                      service.vip ? "text-yellow-400" : "text-primary"
                    }`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                </div>

                {/* Items */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.items.map((item, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <Link
                  to="/booking"
                  className={`inline-block text-xs px-5 py-2 rounded-full font-medium transition ${
                    service.vip
                      ? "bg-yellow-400 text-black"
                      : "bg-primary text-black"
                  } hover:scale-105`}
                >
                  Book
                </Link>
              </div>

              {/* VIP Badge */}
              {service.vip && (
                <div className="absolute top-3 right-3 bg-yellow-400 text-black text-[10px] px-2 py-1 rounded-full font-bold">
                  VIP
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-16 px-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-3">
          Ready for a fresh look?
        </h2>

        <Link
          to="/booking"
          className="inline-block px-6 py-3 text-sm rounded-full bg-gradient-to-r from-yellow-400 to-primary text-black font-semibold hover:scale-105 transition"
        >
          Book Appointment
        </Link>
      </section>
    </div>
  );
};

export default Services;
