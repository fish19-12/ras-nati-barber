import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto py-24 px-6 relative z-10">
      {/* Section Title */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl sm:text-6xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-primary to-yellow-300"
      >
        Contact Us
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-black/60 backdrop-blur-xl p-10 rounded-3xl border border-gray-800 flex flex-col gap-6 shadow-xl"
        >
          <h2 className="text-3xl font-bold text-yellow-400 mb-6">
            Get in Touch
          </h2>

          <div className="flex items-center gap-4 text-lg">
            <FaPhone className="text-yellow-400 text-2xl animate-pulse" />
            <span className="text-gray-200">+251 912 345 678</span>
          </div>

          <div className="flex items-center gap-4 text-lg">
            <FaWhatsapp className="text-green-500 text-2xl animate-pulse" />
            <span className="text-gray-200">+251 912 345 678</span>
          </div>

          <div className="flex items-center gap-4 text-lg">
            <FaMapMarkerAlt className="text-yellow-400 text-2xl animate-pulse" />
            <span className="text-gray-200">
              Addis Abeba, Ethiopia (Around 22)
            </span>
          </div>

          <div className="flex items-center gap-4 text-lg">
            <FaClock className="text-yellow-400 text-2xl animate-pulse" />
            <span className="text-gray-200">
              Monday – Saturday: 9:00 AM – 8:00 PM
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+251912345678"
              className="bg-yellow-400 text-black px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 justify-center shadow-lg hover:shadow-[0_0_40px_rgba(255,215,0,0.5)] transition"
            >
              <FaPhone /> Call Now
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://wa.me/251912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-black px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 justify-center shadow-lg hover:shadow-[0_0_40px_rgba(0,255,0,0.5)] transition"
            >
              <FaWhatsapp /> WhatsApp
            </motion.a>
          </div>
        </motion.div>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="rounded-3xl overflow-hidden border border-gray-800 shadow-2xl"
        >
          <iframe
            className="w-full h-96 sm:h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] object-cover"
            src="https://maps.google.com/maps?q=addis%20abeba&t=&z=13&ie=UTF8&iwloc=&output=embed"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>

      {/* Optional CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center mt-20"
      >
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-yellow-400">
          Ready for Your Premium Cut?
        </h2>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="/booking"
          className="inline-block bg-yellow-400 text-black px-12 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-[0_0_60px_rgba(255,215,0,0.5)] transition"
        >
          Book Now
        </motion.a>
      </motion.div>
    </div>
  );
};

export default Contact;
