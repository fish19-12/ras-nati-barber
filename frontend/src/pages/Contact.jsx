import { FaPhone, FaWhatsapp, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto py-24 px-6">
      <h1 className="text-5xl font-display text-center mb-16">Contact Us</h1>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-black/60 backdrop-blur-md p-10 rounded-2xl border border-gray-800 flex flex-col gap-6"
        >
          <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>

          <div className="flex items-center gap-4">
            <FaPhone className="text-primary text-xl" />
            <span>+251 912 345 678</span>
          </div>

          <div className="flex items-center gap-4">
            <FaWhatsapp className="text-green-500 text-xl" />
            <span>+251 912 345 678</span>
          </div>

          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-primary text-xl" />
            <span>Addis Abeba, Ethiopia (Around 22)</span>
          </div>

          <div className="flex items-center gap-4">
            <FaClock className="text-primary text-xl" />
            <span>Monday – Saturday: 9:00 AM – 8:00 PM</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 mt-6">
            <a
              href="tel:+251912345678"
              className="bg-primary text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition flex items-center gap-2"
            >
              <FaPhone /> Call Now
            </a>
            <a
              href="https://wa.me/251912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition flex items-center gap-2"
            >
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </motion.div>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-2xl overflow-hidden border border-gray-800 shadow-lg"
        >
          <iframe
            className="w-full h-96"
            src="https://maps.google.com/maps?q=addis%20abeba&t=&z=13&ie=UTF8&iwloc=&output=embed"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
