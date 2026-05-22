import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaCrown,
  FaGem,
  FaCar,
  FaCity,
  FaFire,
  FaSpa,
  FaGlassWhiskey,
  FaMagic,
  FaStar,
} from "react-icons/fa";

/* MAIN SERVICE IMAGES */
import hairstyling from "../assets/hairstyiling.jpg";

/* VIP SLIDESHOW IMAGES */
import maskImg from "../assets/mask.jpg";
import culuringImg from "../assets/culuring.jpg";

/* NEW VIP IMAGES */
import teaImg from "../assets/tea.jpg";
import fiverImg from "../assets/fiver.jpg";

/* VIP EXTRA IMAGES */
import faceSteamImg from "../assets/facesteem.jpg";
import colorImg from "../assets/color.jpg";
import pedicureImg from "../assets/pedicure.jpg";

/* OTHER SERVICE IMAGES */
import rebornImg from "../assets/reborn.jpg";
import outdoorImg from "../assets/out.jpg";
import cityImg from "../assets/city.jpg";

/* FIX 1: moved outside + stable reference */
const vipImages = [maskImg, culuringImg, teaImg, fiverImg];

const services = [
  {
    title: "VIP Service",
    subtitle: "Premium Grooming Experience",
    img: null,
    gallery: [faceSteamImg, colorImg, pedicureImg],
    icon: <FaCrown />,
    color: "from-yellow-400 to-amber-600",
    badge: "VIP",
    items: [
      "Tea",
      "Coffee",
      "Water",
      "Shampoo",
      "Face Steam",
      "Curling",
      "Hair Color",
      "Face Mask",
      "Hair Fiber",
    ],
  },

  {
    title: "VVIP Service",
    subtitle: "Luxury Elite Treatment",
    img: hairstyling,
    icon: <FaGem />,
    color: "from-purple-500 to-pink-500",
    badge: "VVIP",
    items: [
      "Tea",
      "Coffee",
      "Macchiato",
      "Water",
      "Juice",
      "Shampoo",
      "Face Steam",
      "Hair Treatment",
      "Curling",
      "Special Hair Color",
      "Face Mask",
      "Hair Fiber",
      "Real Hair Fiber",
      "Pedicure",
    ],
  },

  {
    title: "Nhatty Reborn Cut",
    subtitle: "Old To Young Transformation",
    img: rebornImg,
    icon: <FaMagic />,
    color: "from-red-500 to-orange-500",
    badge: "Exclusive",
    special: true,
    items: [
      "Tea",
      "Coffee",
      "Macchiato",
      "Water",
      "Juice",
      "Shampoo",
      "Face Steam",
      "Hair Treatment",
      "Curling",
      "Special Hair Color",
      "Face Mask",
      "Hair Fiber",
      "Real Hair Fiber",
      "Pedicure",
    ],
  },

  {
    title: "Outdoor Service",
    subtitle: "Professional Service At Your Location",
    img: outdoorImg,
    icon: <FaCar />,
    color: "from-green-500 to-emerald-600",
    badge: "Mobile",
    items: [
      "Hair Color",
      "Curling",
      "Face Mask",
      "Normal Hair Fiber",
      "Real Hair Fiber",
      "Reborn Cut",
    ],
  },

  {
    title: "City To City Service",
    subtitle: "Travel Grooming Service",
    img: cityImg,
    icon: <FaCity />,
    color: "from-blue-500 to-cyan-500",
    badge: "Travel",
    items: [
      "Hair Color",
      "Curling",
      "Face Mask",
      "Normal Hair Fiber",
      "Real Hair Fiber",
      "Reborn Cut",
    ],
  },
];

const Services = () => {
  const [vipIndex, setVipIndex] = useState(0);

  /* FIX 2: safe interval (prevents mobile crash + tab switch issue) */
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.hidden) return;
      setVipIndex((prev) => (prev + 1) % vipImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden relative">
      {/* FIX 3: reduced heavy blur (mobile crash fix) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-yellow-500/10 blur-3xl rounded-full"></div>

      {/* HERO */}
      <section className="relative text-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs sm:text-sm mb-5">
            Premium Grooming Experience
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase">
            Our{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-300 bg-clip-text text-transparent">
              Services
            </span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mt-4">
            Experience modern luxury grooming services at Ras Nati Barber Shop.
          </p>
        </motion.div>
      </section>

      {/* SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 pb-20 sm:pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-7">
          {services.map((service, index) => (
            <motion.div
              key={index}
              /* FIX 4: lighter animation (prevents scroll crash) */
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              /* FIX 5: safer hover (no GPU spike) */
              whileHover={{ scale: 1.02 }}
              className={`relative rounded-2xl overflow-hidden border ${
                service.special ? "border-orange-500/40" : "border-white/10"
              } bg-[#111]/90 group h-full transform-gpu`}
            >
              {/* IMAGE */}
              <div className="relative h-40 sm:h-52 lg:h-64 overflow-hidden">
                <img
                  loading="lazy"
                  decoding="async"
                  src={
                    service.title === "VIP Service"
                      ? vipImages[vipIndex]
                      : service.img
                  }
                  alt={service.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                <div
                  className={`absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r ${service.color} text-white text-[9px] sm:text-xs font-bold px-2 py-1 sm:px-4 rounded-full`}
                >
                  {service.badge}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-3 sm:p-5">
                <h2 className="text-sm sm:text-xl font-bold">
                  {service.title}
                </h2>

                <p className="text-yellow-400 text-xs sm:text-sm mb-3">
                  {service.subtitle}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {service.items.map((item, i) => (
                    <span
                      key={i}
                      className="text-[9px] sm:text-xs px-2 py-1 rounded-full bg-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Link
                  to="/booking"
                  className={`inline-flex w-full justify-center px-4 py-2 rounded-xl bg-gradient-to-r ${service.color}`}
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-3xl border border-yellow-400/10 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 sm:p-12 text-center">
          <h2 className="text-3xl font-bold mb-5">
            Why Choose Nhatty The Barber?
          </h2>

          <p className="text-gray-300 max-w-3xl mx-auto">
            Premium luxury grooming experience with modern style.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            <div>
              <FaFire className="text-3xl text-yellow-400 mx-auto mb-3" />
              Modern Styles
            </div>

            <div>
              <FaSpa className="text-3xl text-yellow-400 mx-auto mb-3" />
              Luxury Experience
            </div>

            <div>
              <FaGlassWhiskey className="text-3xl text-yellow-400 mx-auto mb-3" />
              Premium Hospitality
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready For Your Transformation?
          </h2>

          <Link
            to="/booking"
            className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold"
          >
            Book Appointment
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
