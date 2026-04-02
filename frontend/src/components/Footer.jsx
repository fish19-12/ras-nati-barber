import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-black/70 backdrop-blur-md border-t border-gray-800 py-12 md:pb-12 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo & Name */}
        <div className="flex flex-col items-center md:items-start">
          <span className="text-xl md:text-2xl font-display text-white">
            Ras Nati <span className="text-primary">Barber Shop</span>
          </span>
          <p className="text-gray-400 text-sm md:text-base mt-1">
            Addis Abeba, Ethiopia
          </p>
          <p className="text-gray-500 text-xs md:text-sm mt-2">
            © 2026 Ras Nati Barber. All rights reserved.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-2 text-gray-300 text-sm md:text-base">
            <FaPhone className="text-primary" /> +251 912 345 678
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm md:text-base">
            <FaMapMarkerAlt className="text-primary" /> Addis Abeba, Ethiopia
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <h3 className="text-base md:text-lg font-medium text-white mb-2">
            Follow Us
          </h3>
          <div className="flex gap-4 text-2xl md:text-3xl mb-6 md:mb-0">
            {" "}
            {/* extra bottom margin */}
            <a
              href="https://wa.me/251912345678"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-400 transition"
            >
              <FaWhatsapp />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-pink-400 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-500 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-white transition bg-white rounded-full p-1"
            >
              <SiTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* Spacer for mobile bottom nav */}
      <div className="h-24 md:hidden" />
    </footer>
  );
};

export default Footer;
