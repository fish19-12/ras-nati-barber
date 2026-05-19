import {
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaYoutube,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black via-[#0b0b0b] to-black border-t border-gray-800 py-14 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center md:text-left">
        {/* BRAND */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Nhatty <span className="text-yellow-400">The Barber</span>
          </h2>

          <p className="text-gray-400 text-sm mt-3 leading-relaxed max-w-sm">
            Premium barber services in Addis Ababa. Nhatty The Barber is trusted
            by influencers, celebrities, and hundreds of loyal clients for
            modern fades, stylish cuts, and luxury grooming.
          </p>
        </div>

        {/* CONTACT */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>

          <div className="flex items-center gap-2 text-gray-300">
            <FaPhone className="text-yellow-400" />
            +251 91 536 9490
          </div>

          <div className="flex items-start gap-2 text-gray-300 text-sm">
            <FaMapMarkerAlt className="text-yellow-400 mt-1" />
            Addis Ababa, Welo Sefer Garad Mall – 2nd Floor
          </div>

          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <FaClock className="text-yellow-400" />
            Open Daily: 12:00 PM – 4:00 AM
          </div>

          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 text-sm hover:underline mt-1"
          >
            View on Google Maps
          </a>
        </div>

        {/* SOCIAL */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>

          <div className="flex gap-4 text-2xl">
            {/* WhatsApp */}
            <a
              href="https://wa.me/251915369490"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:scale-110 hover:text-green-400 transition duration-300"
            >
              <FaWhatsapp />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/nhatty_the_barber?igsh=MTg5Y3RlY2RtdDJlaQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:scale-110 hover:text-pink-400 transition duration-300"
            >
              <FaInstagram />
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@Nhattythebarber1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:scale-110 hover:text-red-500 transition duration-300"
            >
              <FaYoutube />
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@nhattythebarber"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-full p-1 text-black hover:scale-110 transition duration-300"
            >
              <SiTiktok />
            </a>
          </div>

          <p className="text-gray-500 text-sm mt-4">
            Stay connected with Nhatty for the latest styles and updates.
          </p>
          <p className="text-gray-500 text-sm mt-4">
            © 2026 Nhatty The Barber. All rights reserved.
          </p>
        </div>
      </div>

      {/* MOBILE SPACER */}
      <div className="h-20 md:hidden"></div>
    </footer>
  );
};

export default Footer;
