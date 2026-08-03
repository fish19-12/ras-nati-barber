import {
  FaPhone,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
} from "react-icons/fa";

import { motion } from "framer-motion";

import { useLanguage } from "../context/LanguageContext.jsx";

import en from "../translations/en.json";
import am from "../translations/am.json";

const Contact = () => {
  const { language } = useLanguage();

  const translations = language === "AM" ? am : en;

  return (
    <div className="max-w-7xl mx-auto py-24 px-6 text-white">
      {/* TITLE */}

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="
        text-4xl 
        sm:text-5xl 
        md:text-6xl 
        font-black 
        text-center 
        mb-8 
        text-yellow-400
        "
      >
        {translations.contact.title}
      </motion.h1>

      <p
        className="
        text-center 
        text-gray-300 
        max-w-2xl 
        mx-auto 
        mb-16 
        text-lg
        "
      >
        {translations.contact.description}
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* CONTACT INFO */}

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="
          bg-white/5
          backdrop-blur-xl
          p-10
          rounded-3xl
          border
          border-white/10
          shadow-xl
          flex
          flex-col
          gap-6
          "
        >
          <h2
            className="
          text-2xl 
          font-bold 
          text-yellow-400
          "
          >
            {translations.contact.getInTouch}
          </h2>

          <div className="space-y-5">
            <div
              className="
            flex 
            items-center 
            gap-4
            text-gray-200
            "
            >
              <FaPhone className="text-yellow-400 text-xl" />

              <span>+251 975 700 510</span>
            </div>

            <div
              className="
            flex 
            items-center 
            gap-4
            text-gray-200
            "
            >
              <FaWhatsapp className="text-green-400 text-xl" />

              <span>WhatsApp Available</span>
            </div>

            <div
              className="
            flex 
            items-center 
            gap-4
            text-gray-200
            "
            >
              <FaMapMarkerAlt className="text-yellow-400 text-xl" />

              <span>Addis Ababa, Ethiopia</span>
            </div>

            <div
              className="
            flex 
            items-center 
            gap-4
            text-gray-200
            "
            >
              <FaClock className="text-yellow-400 text-xl" />

              <span>Open Every Day: 8:00 AM - 8:00 PM</span>
            </div>

            <div
              className="
            flex 
            items-center 
            gap-4
            text-gray-200
            "
            >
              <FaInstagram className="text-pink-400 text-xl" />

              <span>@nhattythebarber</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="
          bg-white/5
          backdrop-blur-xl
          p-10
          rounded-3xl
          border
          border-white/10
          "
        >
          <h2
            className="
          text-3xl
          font-black
          text-yellow-400
          mb-5
          "
          >
            Nhatty The Barber
          </h2>

          <p
            className="
          text-gray-300
          leading-relaxed
          "
          >
            Premium luxury barber experience. Professional haircut, grooming,
            VIP service and home service designed for modern clients.
          </p>
        </motion.div>
      </div>

      {/* CTA */}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-24"
      >
        <h2
          className="
        text-4xl 
        font-black 
        mb-6 
        text-yellow-400
        "
        >
          {translations.contact.ctaTitle}
        </h2>

        <p
          className="
        text-gray-300 
        mb-8
        "
        >
          {translations.contact.ctaDescription}
        </p>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/booking"
          className="
          inline-block
          bg-yellow-400
          text-black
          px-12
          py-4
          rounded-xl
          font-bold
          shadow-xl
          hover:shadow-yellow-500/40
          transition
          "
        >
          {translations.contact.bookAppointment}
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Contact;
