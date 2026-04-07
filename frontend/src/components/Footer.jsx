import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-black via-[#0b0b0b] to-black border-t border-gray-800 py-14 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center md:text-left">
        {/* BRAND */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Ras Nati <span className="text-yellow-400">Barber Shop</span>
          </h2>

          <p className="text-gray-400 text-sm mt-3 leading-relaxed max-w-sm">
            Premium barber services in Addis Ababa. Ras Nati Barber Shop is
            trusted by influencers, celebrities, and hundreds of loyal clients
            for modern fades, stylish cuts, and luxury grooming.
          </p>

          <p className="text-gray-500 text-sm mt-4">
            © 2026 Ras Nati Barber Shop. All rights reserved.
          </p>
        </div>

        {/* CONTACT */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>

          <div className="flex items-center gap-2 text-gray-300">
            <FaPhone className="text-yellow-400" />
            +251 975700510
          </div>

          <div className="flex items-start gap-2 text-gray-300 text-sm">
            <FaMapMarkerAlt className="text-yellow-400 mt-1" />
            Addis Ababa, Welo Sefer Grand Mall – 2nd Floor
          </div>

          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <FaClock className="text-yellow-400" />
            Open Daily: 9:00 AM – 9:00 PM
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
            <a
              href="https://wa.me/251912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:scale-110 hover:text-green-400 transition"
            >
              <FaWhatsapp />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:scale-110 hover:text-pink-400 transition"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:scale-110 hover:text-blue-500 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-full p-1 text-black hover:scale-110 transition"
            >
              <SiTiktok />
            </a>
          </div>

          <p className="text-gray-500 text-sm mt-4">
            Stay connected with Ras Nati for the latest styles and updates.
          </p>
        </div>
      </div>

      {/* MOBILE SPACER */}
      <div className="h-20 md:hidden"></div>
    </footer>
  );
};

export default Footer;
