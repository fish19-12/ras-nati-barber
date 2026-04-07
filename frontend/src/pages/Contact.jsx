import {
  FaPhone,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto py-24 px-6">
      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 text-yellow-400"
      >
        Contact Ras Nati
      </motion.h1>

      <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
        Visit Ras Nati Barber Shop for premium grooming services. Our
        professional barbers deliver modern fades, stylish cuts, and luxury
        barber experiences trusted by influencers and celebrities in Addis
        Ababa.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* CONTACT INFO */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-black/60 backdrop-blur-xl p-10 rounded-3xl border border-gray-800 shadow-xl flex flex-col gap-6"
        >
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            Get in Touch
          </h2>

          {/* PHONE */}
          <div className="flex items-center gap-4 text-lg">
            <FaPhone className="text-yellow-400 text-2xl" />
            <span className="text-gray-200">+251 912 345 678</span>
          </div>

          {/* WHATSAPP */}
          <div className="flex items-center gap-4 text-lg">
            <FaWhatsapp className="text-green-500 text-2xl" />
            <span className="text-gray-200">+251 975700510</span>
          </div>

          {/* INSTAGRAM */}
          <div className="flex items-center gap-4 text-lg">
            <FaInstagram className="text-pink-500 text-2xl" />
            <span className="text-gray-200">@rasnatibarbershop</span>
          </div>

          {/* ADDRESS */}
          <div className="flex items-start gap-4 text-lg">
            <FaMapMarkerAlt className="text-yellow-400 text-2xl mt-1" />
            <span className="text-gray-200">
              Addis Ababa – Welo Sefer <br />
              Grand Mall, 2nd Floor
            </span>
          </div>

          {/* HOURS */}
          <div className="flex items-center gap-4 text-lg">
            <FaClock className="text-yellow-400 text-2xl" />
            <span className="text-gray-200">Open Daily: 9:00 AM – 9:00 PM</span>
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+251912345678"
              className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold flex items-center gap-3 justify-center shadow-lg hover:shadow-yellow-500/40"
            >
              <FaPhone /> Call Now
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/251912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-black px-8 py-4 rounded-xl font-semibold flex items-center gap-3 justify-center shadow-lg hover:shadow-green-500/40"
            >
              <FaWhatsapp /> WhatsApp
            </motion.a>
          </div>
        </motion.div>

        {/* MAP */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl overflow-hidden border border-gray-800 shadow-2xl"
        >
          <iframe
            className="w-full h-[500px]"
            src="https://maps.google.com/maps?q=welo%20sefer%20addis%20ababa&t=&z=15&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mt-24"
      >
        <h2 className="text-4xl font-bold mb-6 text-yellow-400">
          Ready for Your Premium Cut?
        </h2>

        <p className="text-gray-400 mb-8">
          Book your appointment today and experience the Ras Nati difference.
        </p>

        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/booking"
          className="inline-block bg-yellow-400 text-black px-12 py-4 rounded-xl font-bold shadow-xl hover:shadow-yellow-500/40 transition"
        >
          Book Appointment
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Contact;
