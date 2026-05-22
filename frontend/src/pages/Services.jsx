import { useEffect, useState, useRef } from "react";
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
} from "react-icons/fa";

/* IMAGES */
import hairstyling from "../assets/hairstyiling.jpg";
import maskImg from "../assets/mask.jpg";
import culuringImg from "../assets/culuring.jpg";
import teaImg from "../assets/tea.jpg";
import fiverImg from "../assets/fiver.jpg";
import faceSteamImg from "../assets/facesteem.jpg";
import colorImg from "../assets/color.jpg";
import pedicureImg from "../assets/pedicure.jpg";
import rebornImg from "../assets/reborn.jpg";
import outdoorImg from "../assets/out.jpg";
import cityImg from "../assets/city.jpg";

/* FIX: stable reference */
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
    subtitle: "At Your Location",
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
    subtitle: "Travel Grooming",
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
  const intervalRef = useRef(null);

  /* FIX: safer interval (no crash + no scroll lag) */
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (document.hidden) return;
      setVipIndex((p) => (p + 1) % vipImages.length);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      {/* LIGHTER BACKGROUND (mobile safe) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-yellow-500/10 blur-2xl rounded-full" />

      {/* HERO */}
      <section className="text-center pt-24 pb-10 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl sm:text-5xl font-black">
            Our{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Services
            </span>
          </h1>

          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm">
            Premium grooming experience at Nhatty The Barber.
          </p>
        </motion.div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden border ${
                service.special ? "border-orange-500/40" : "border-white/10"
              } bg-[#111]`}
              style={{ transform: "translateZ(0)" }} /* GPU stabilize */
            >
              {/* IMAGE */}
              <div className="h-52 overflow-hidden relative">
                <img
                  src={
                    service.title === "VIP Service"
                      ? vipImages[vipIndex]
                      : service.img
                  }
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">
                  {service.badge}
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-4">
                <h2 className="font-bold text-lg">{service.title}</h2>
                <p className="text-yellow-400 text-sm mb-3">
                  {service.subtitle}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {service.items.map((item, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-1 bg-white/10 rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <Link
                  to="/booking"
                  className="block text-center py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="max-w-5xl mx-auto px-4 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-4">
          Why Choose Nhatty The Barber?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-yellow-400">
          <div>
            <FaFire className="mx-auto text-3xl mb-2" />
            Modern Styles
          </div>
          <div>
            <FaSpa className="mx-auto text-3xl mb-2" />
            Luxury Experience
          </div>
          <div>
            <FaGlassWhiskey className="mx-auto text-3xl mb-2" />
            Premium Service
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-16 px-4">
        <h2 className="text-2xl font-bold mb-4">
          Ready For Your Transformation?
        </h2>

        <Link
          to="/booking"
          className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold"
        >
          Book Appointment
        </Link>
      </section>
    </div>
  );
};

export default Services;
