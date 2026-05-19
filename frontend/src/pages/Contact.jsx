import {
  FaPhone,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock,
  FaInstagram,
} from "react-icons/fa";

import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>
          Contact Nhatty The Barber | Barber Shop in Addis Ababa Ethiopia
        </title>

        <meta
          name="description"
          content="Contact Nhatty The Barber in Addis Ababa, Ethiopia. Book premium barber services, skin fades, beard grooming, and luxury haircuts with professional barbers."
        />

        <meta
          name="keywords"
          content="contact barber Ethiopia, Addis Ababa barber shop, Nhatty The Barber contact, Ethiopian barber, barber booking Ethiopia, skin fade Addis Ababa"
        />

        <meta name="author" content="Nhatty The Barber" />

        <meta name="robots" content="index, follow" />

        {/* CANONICAL */}
        <link rel="canonical" href="https://nhattythebarber.com/contact" />

        {/* OPEN GRAPH */}
        <meta
          property="og:title"
          content="Contact Nhatty The Barber | Premium Barber in Ethiopia"
        />

        <meta
          property="og:description"
          content="Book your appointment with Nhatty The Barber in Addis Ababa for premium grooming and luxury barber services."
        />

        <meta
          property="og:image"
          content="https://nhattythebarber.com/logo.jpg"
        />

        <meta property="og:url" content="https://nhattythebarber.com/contact" />

        <meta property="og:type" content="website" />

        {/* TWITTER */}
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="twitter:title" content="Contact Nhatty The Barber" />

        <meta
          name="twitter:description"
          content="Premium barber services and grooming in Addis Ababa Ethiopia."
        />

        <meta
          name="twitter:image"
          content="https://nhattythebarber.com/logo.jpg"
        />
      </Helmet>

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
              <FaPhone
                className="text-yellow-400 text-2xl"
                aria-hidden="true"
              />

              <a
                href="tel:+251912345678"
                className="text-gray-200 hover:text-yellow-400 transition"
                aria-label="Call Nhatty The Barber"
              >
                +251 912 345 678
              </a>
            </div>

            {/* WHATSAPP */}
            <div className="flex items-center gap-4 text-lg">
              <FaWhatsapp
                className="text-green-500 text-2xl"
                aria-hidden="true"
              />

              <a
                href="https://wa.me/251975700510"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-green-400 transition"
                aria-label="Chat on WhatsApp"
              >
                +251 975700510
              </a>
            </div>

            {/* INSTAGRAM / EMAIL */}
            <div className="flex items-center gap-4 text-lg">
              <FaInstagram
                className="text-pink-500 text-2xl"
                aria-hidden="true"
              />

              <a
                href="mailto:nhattansisay@gmail.com"
                className="text-gray-200 hover:text-pink-400 transition"
                aria-label="Send email to Nhatty The Barber"
              >
                nhattansisay@gmail.com
              </a>
            </div>

            {/* ADDRESS */}
            <div className="flex items-start gap-4 text-lg">
              <FaMapMarkerAlt
                className="text-yellow-400 text-2xl mt-1"
                aria-hidden="true"
              />

              <span className="text-gray-200">
                Addis Ababa – Welo Sefer <br />
                Garad Mall, 2nd Floor
              </span>
            </div>

            {/* HOURS */}
            <div className="flex items-center gap-4 text-lg">
              <FaClock
                className="text-yellow-400 text-2xl"
                aria-hidden="true"
              />

              <span className="text-gray-200">
                Open Daily: 9:00 AM – 9:00 PM
              </span>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="tel:+251912345678"
                aria-label="Call barber shop now"
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
                aria-label="Chat with barber shop on WhatsApp"
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
              title="Nhatty The Barber Location Map"
              className="w-full h-[500px]"
              src="https://maps.google.com/maps?q=welo%20sefer%20addis%20ababa&t=&z=15&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
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
            aria-label="Book barber appointment"
            className="inline-block bg-yellow-400 text-black px-12 py-4 rounded-xl font-bold shadow-xl hover:shadow-yellow-500/40 transition"
          >
            Book Appointment
          </motion.a>
        </motion.div>
      </div>
    </>
  );
};

export default Contact;
