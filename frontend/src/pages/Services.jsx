import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCrown, FaGem, FaCar, FaCity, FaMagic, FaStar } from "react-icons/fa";

import haircut from "../assets/haircut.jpg";
import shaving from "../assets/shaving.jpg";
import hairstyling from "../assets/hairstyiling.jpg";
import treatment from "../assets/treatment.jpg";
import shop1 from "../assets/shop1.jpg";

// DETAIL SERVICE IMAGES (your gallery photos)
import s1 from "../assets/s1.jpg";
import s2 from "../assets/s2.jpg";
import s3 from "../assets/s3.jpg";
import s4 from "../assets/s4.jpg";
import s5 from "../assets/s5.jpg";
import s6 from "../assets/s6.jpg";
import s7 from "../assets/s7.jpg";
import s8 from "../assets/s8.jpg";
import s9 from "../assets/s9.jpg";
import s10 from "../assets/s10.jpg";
import s11 from "../assets/s11.jpg";
import s12 from "../assets/s12.jpg";

const services = [
  {
    title: "VIP Service",
    subtitle: "Premium Grooming Experience",
    img: haircut,
    icon: <FaCrown />,
    color: "from-yellow-400 to-amber-600",
    badge: "VIP",
    gallery: [s1, s2, s3, s4],
  },

  {
    title: "VVIP Service",
    subtitle: "Luxury Elite Treatment",
    img: hairstyling,
    icon: <FaGem />,
    color: "from-purple-500 to-pink-500",
    badge: "VVIP",
    gallery: [s5, s6, s7, s8],
  },

  {
    title: "Nhatty Reborn Cut",
    subtitle: "Old To Young Transformation",
    img: treatment,
    icon: <FaMagic />,
    color: "from-red-500 to-orange-500",
    badge: "Exclusive",
    special: true,
    gallery: [s9, s10, s11, s12],
  },

  {
    title: "Outdoor Service",
    subtitle: "Professional Service At Your Location",
    img: shaving,
    icon: <FaCar />,
    color: "from-green-500 to-emerald-600",
    badge: "Mobile",
    gallery: [shop1, s2, s3, s6],
  },

  {
    title: "City To City Service",
    subtitle: "Travel Grooming Service",
    img: shop1,
    icon: <FaCity />,
    color: "from-blue-500 to-cyan-500",
    badge: "Travel",
    gallery: [s4, s7, s8, s10],
  },
];

const Services = () => {
  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[180px] rounded-full"></div>

      {/* HERO */}
      <section className="text-center pt-24 pb-12 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black"
        >
          Our{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Services
          </span>
        </motion.h1>

        <p className="text-gray-400 max-w-2xl mx-auto mt-4">
          Premium grooming experience with modern luxury service packages
          designed for style, comfort, and transformation.
        </p>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl"
            >
              {/* MAIN IMAGE */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.img}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                {/* badge */}
                <div
                  className={`absolute top-3 right-3 px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${service.color}`}
                >
                  {service.badge}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5">
                {/* icon */}
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-2xl text-xl mb-3 bg-gradient-to-r ${service.color}`}
                >
                  {service.icon}
                </div>

                <h2 className="text-xl font-bold">{service.title}</h2>
                <p className="text-yellow-400 text-sm mb-4">
                  {service.subtitle}
                </p>

                {/* IMAGE GALLERY (NEW FEATURE) */}
                <div className="grid grid-cols-4 gap-2 mb-5">
                  {service.gallery.map((img, i) => (
                    <div
                      key={i}
                      className="h-14 rounded-lg overflow-hidden border border-white/10"
                    >
                      <img
                        src={img}
                        className="w-full h-full object-cover hover:scale-110 transition"
                      />
                    </div>
                  ))}
                </div>

                {/* BUTTON */}
                <Link
                  to="/booking"
                  className={`block text-center py-3 rounded-xl font-semibold bg-gradient-to-r ${service.color} hover:scale-105 transition`}
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-20 px-4">
        <h2 className="text-3xl font-bold mb-3">
          Ready for Your Transformation?
        </h2>

        <p className="text-gray-400 mb-6">
          Book your appointment and experience luxury grooming.
        </p>

        <Link
          to="/booking"
          className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold rounded-full hover:scale-105 transition"
        >
          Book Appointment
        </Link>
      </section>
    </div>
  );
};

export default Services;
