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

/* ✅ NEW VIP IMAGES ADDED (ONLY ADDITION) */
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

/* ✅ SOLUTION 1 FIX */
/* MOVED OUTSIDE COMPONENT TO PREVENT RECREATING ARRAY ON EVERY RE-RENDER */
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
    description:
      "Only available at Ras Nati Barber Shop. Complete transformation service designed to give you a fresh, modern, youthful appearance.",
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
  /* VIP SLIDESHOW */
  const [vipIndex, setVipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVipIndex((prev) => (prev + 1) % vipImages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[180px] rounded-full"></div>

      {/* HERO */}
      <section className="relative text-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs sm:text-sm mb-5">
            Premium Grooming Experience
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase leading-tight">
            Our{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-300 bg-clip-text text-transparent">
              Services
            </span>
          </h1>

          <p className="text-gray-400 max-w-2xl mx-auto mt-4 sm:mt-5 text-xs sm:text-base leading-relaxed">
            Experience modern luxury grooming with exclusive VIP, VVIP, Nhatty
            Reborn transformation, outdoor, and city-to-city barber services
            only at Ras Nati Barber Shop.
          </p>
        </motion.div>
      </section>

      {/* SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-3 sm:px-4 pb-20 sm:pb-24">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-7">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className={`relative rounded-2xl overflow-hidden border ${
                service.special ? "border-orange-500/40" : "border-white/10"
              } bg-white/5 backdrop-blur-xl group h-full`}
            >
              {/* IMAGE */}
              <div className="relative h-40 sm:h-52 lg:h-64 overflow-hidden">
                <img
                  src={
                    service.title === "VIP Service"
                      ? vipImages[vipIndex]
                      : service.img
                  }
                  alt={service.title}
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                <div
                  className={`absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r ${service.color} text-white text-[9px] sm:text-xs font-bold px-2 py-1 sm:px-4 rounded-full`}
                >
                  {service.badge}
                </div>
              </div>

              {/* VIP GALLERY */}
              {service.gallery && (
                <div className="grid grid-cols-3 gap-2 p-3">
                  {service.gallery.map((photo, i) => (
                    <img
                      key={i}
                      src={photo}
                      className="h-20 sm:h-24 w-full object-cover rounded-xl"
                      alt=""
                    />
                  ))}
                </div>
              )}

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

      {/* WHY CHOOSE US (UNCHANGED - RESTORED) */}
      <section className="max-w-6xl mx-auto px-4 pb-20 sm:pb-24">
        <div className="rounded-3xl border border-yellow-400/10 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6 sm:p-12 text-center">
          <h2 className="text-3xl font-bold mb-5">
            Why Choose Nhatty The Barber?
          </h2>

          <p className="text-gray-300 max-w-3xl mx-auto">
            Nhatty The Barber delivers modern luxury grooming with premium care
            and elite VIP experiences.
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

      {/* CTA (RESTORED) */}
      <section className="text-center pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Ready For Your Transformation?
          </h2>

          <p className="text-gray-400 mb-6">Book your appointment today.</p>

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
