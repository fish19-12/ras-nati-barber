import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

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

import haircut from "../assets/haircut.jpg";
import hairstyling from "../assets/hairstyiling.jpg";

/* NEW SERVICE IMAGES */
import rebornImg from "../assets/reborn.jpg";
import outdoorImg from "../assets/out.jpg";
import cityImg from "../assets/city.jpg";

const services = [
  {
    title: "VIP Service",
    subtitle: "Premium Grooming Experience",
    img: haircut,
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
  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Premium Barber Services | Nhatty The Barber Ethiopia</title>

        <meta
          name="description"
          content="Discover luxury barber services at Nhatty The Barber in Ethiopia including VIP haircuts, VVIP grooming, beard styling, Reborn transformation cuts, outdoor barber services, and city-to-city grooming."
        />

        <meta
          name="keywords"
          content="barber services Ethiopia, VIP barber Addis Ababa, luxury haircut Ethiopia, skin fade Ethiopia, mobile barber Ethiopia, premium grooming Addis Ababa, Nhatty Reborn Cut"
        />

        <meta name="author" content="Nhatty The Barber" />

        <meta name="robots" content="index, follow" />

        {/* CANONICAL */}
        <link rel="canonical" href="https://nhattythebarber.com/services" />

        {/* OPEN GRAPH */}
        <meta
          property="og:title"
          content="Premium Barber Services | Nhatty The Barber"
        />

        <meta
          property="og:description"
          content="Explore luxury grooming, VIP barber services, skin fades, beard grooming, and transformation cuts in Ethiopia."
        />

        <meta
          property="og:image"
          content="https://nhattythebarber.com/logo.jpg"
        />

        <meta
          property="og:url"
          content="https://nhattythebarber.com/services"
        />

        <meta property="og:type" content="website" />

        {/* TWITTER */}
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="twitter:title" content="Luxury Barber Services Ethiopia" />

        <meta
          name="twitter:description"
          content="VIP barber services, premium grooming, modern fades, and luxury haircuts at Nhatty The Barber."
        />

        <meta
          name="twitter:image"
          content="https://nhattythebarber.com/logo.jpg"
        />
      </Helmet>

      <div className="bg-black text-white min-h-screen overflow-hidden relative">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-yellow-500/10 blur-[180px] rounded-full"></div>

        {/* Hero Section */}
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

        {/* Services Grid */}
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
                {/* Image */}
                <div className="relative h-40 sm:h-52 lg:h-64 bg-black overflow-hidden flex items-center justify-center">
                  <img
                    src={service.img}
                    alt={`${service.title} - Premium Barber Service Ethiopia`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain transition duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                  {/* Badge */}
                  <div
                    className={`absolute top-2 right-2 sm:top-4 sm:right-4 bg-gradient-to-r ${service.color} text-white text-[9px] sm:text-xs font-bold px-2 py-1 sm:px-4 rounded-full shadow-lg`}
                  >
                    {service.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-5">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center text-lg sm:text-2xl mb-3 sm:mb-4 bg-gradient-to-r ${service.color}`}
                  >
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h2 className="text-sm sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 leading-tight">
                    {service.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="text-yellow-400 text-[11px] sm:text-sm mb-2 sm:mb-4 leading-relaxed">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  {service.description && (
                    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl sm:rounded-2xl p-2 sm:p-4 mb-3 sm:mb-5">
                      <div className="flex items-center gap-2 mb-1 sm:mb-2 text-orange-400">
                        <FaStar className="text-xs sm:text-sm" />

                        <span className="font-semibold text-[10px] sm:text-sm">
                          Exclusive Service
                        </span>
                      </div>

                      <p className="text-[10px] sm:text-sm text-gray-300 leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  )}

                  {/* Service Items */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                    {service.items.map((item, i) => (
                      <span
                        key={i}
                        className="text-[9px] sm:text-xs px-2 py-1 sm:px-3 sm:py-2 rounded-full bg-white/10 border border-white/10 text-gray-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Button */}
                  <Link
                    to="/booking"
                    aria-label={`Book ${service.title}`}
                    className={`inline-flex items-center justify-center w-full px-3 py-2 sm:px-6 sm:py-3 rounded-xl sm:rounded-full bg-gradient-to-r ${service.color} text-white font-semibold text-[11px] sm:text-sm hover:scale-105 transition duration-300`}
                  >
                    Book Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="max-w-6xl mx-auto px-4 pb-20 sm:pb-24">
          <div className="rounded-2xl sm:rounded-3xl border border-yellow-400/10 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-5 sm:p-8 md:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-5">
              Why Choose Ras Nati Barber Shop?
            </h2>

            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
              Ras Nati Barber Shop delivers modern luxury grooming with premium
              customer care, transformation cuts, mobile barber services, and
              elite VIP experiences designed for clients who want style,
              confidence, and professionalism.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-10">
              <div className="bg-black/30 rounded-2xl p-5 sm:p-6 border border-white/10">
                <FaFire className="text-2xl sm:text-3xl text-yellow-400 mx-auto mb-3" />

                <h3 className="font-bold mb-2 text-sm sm:text-base">
                  Modern Styles
                </h3>

                <p className="text-xs sm:text-sm text-gray-400">
                  Trending haircuts and professional styling.
                </p>
              </div>

              <div className="bg-black/30 rounded-2xl p-5 sm:p-6 border border-white/10">
                <FaSpa className="text-2xl sm:text-3xl text-yellow-400 mx-auto mb-3" />

                <h3 className="font-bold mb-2 text-sm sm:text-base">
                  Luxury Experience
                </h3>

                <p className="text-xs sm:text-sm text-gray-400">
                  Premium grooming and relaxing treatments.
                </p>
              </div>

              <div className="bg-black/30 rounded-2xl p-5 sm:p-6 border border-white/10">
                <FaGlassWhiskey className="text-2xl sm:text-3xl text-yellow-400 mx-auto mb-3" />

                <h3 className="font-bold mb-2 text-sm sm:text-base">
                  Premium Hospitality
                </h3>

                <p className="text-xs sm:text-sm text-gray-400">
                  Coffee, macchiato, juice, and VIP care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center pb-16 sm:pb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl sm:text-4xl font-bold mb-4">
              Ready For Your Transformation?
            </h2>

            <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
              Book your appointment today and experience premium grooming at Ras
              Nati Barber Shop.
            </p>

            <Link
              to="/booking"
              aria-label="Book barber appointment now"
              className="inline-block px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-sm sm:text-base hover:scale-105 transition duration-300 shadow-2xl shadow-yellow-500/20"
            >
              Book Appointment
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  );
};

export default Services;
