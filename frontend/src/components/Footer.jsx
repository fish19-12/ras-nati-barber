import {
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhone,
  FaClock,
  FaYoutube,
  FaArrowRight,
} from "react-icons/fa";

import { SiTiktok } from "react-icons/si";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-black via-[#0b0b0b] to-black border-t border-yellow-400/10 overflow-hidden">
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-500/10 blur-[140px] rounded-full"></div>

      {/* TOP BORDER */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-14">
          {/* ===================================== */}
          {/* BRAND */}
          {/* ===================================== */}

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Nhatty{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                The Barber
              </span>
            </h2>

            <p className="text-gray-400 text-sm mt-5 leading-relaxed max-w-sm">
              Premium barber services in Addis Ababa Ethiopia. Nhatty The Barber
              is trusted by influencers, celebrities, and loyal clients for
              modern fades, luxury haircuts, beard grooming, and VIP barber
              experiences.
            </p>

            {/* TAGS */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center md:justify-start">
              <span className="px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-xs">
                Skin Fades
              </span>

              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs">
                VIP Service
              </span>

              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs">
                Beard Grooming
              </span>
            </div>
          </div>

          {/* ===================================== */}
          {/* CONTACT */}
          {/* ===================================== */}

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-6">
              Contact Information
            </h3>

            <div className="flex flex-col gap-5">
              {/* PHONE */}
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <FaPhone className="text-yellow-400" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Call Us
                  </p>

                  <a
                    href="tel:+251915369490"
                    className="hover:text-yellow-400 transition"
                  >
                    +251 975700510
                  </a>
                </div>
              </div>

              {/* ADDRESS */}
              <div className="flex items-start gap-3 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt className="text-yellow-400" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Location
                  </p>

                  <p className="text-sm leading-relaxed">
                    Addis Ababa, Welo Sefer <br />
                    Garad Mall – 2nd Floor
                  </p>
                </div>
              </div>

              {/* HOURS */}
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-10 h-10 rounded-full bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                  <FaClock className="text-yellow-400" />
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    Opening Hours
                  </p>

                  <p className="text-sm">Daily: 12:00 PM – 4:00 AM</p>
                </div>
              </div>
            </div>

            {/* MAP BUTTON */}
            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition text-sm font-medium"
            >
              View On Google Maps
              <FaArrowRight className="text-xs" />
            </a>
          </div>

          {/* ===================================== */}
          {/* SOCIAL + QUICK LINKS */}
          {/* ===================================== */}

          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-bold text-white mb-6">
              Follow & Explore
            </h3>

            {/* SOCIALS */}
            <div className="flex gap-4 mb-8">
              {/* WHATSAPP */}
              <a
                href="https://wa.me/251975700510"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 hover:scale-110 hover:bg-green-500 hover:text-white transition duration-300"
              >
                <FaWhatsapp className="text-xl" />
              </a>

              {/* INSTAGRAM */}
              <a
                href="https://www.instagram.com/nhatty_the_barber?igsh=MTg5Y3RlY2RtdDJlaQ=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-12 h-12 rounded-full bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-500 hover:scale-110 hover:bg-pink-500 hover:text-white transition duration-300"
              >
                <FaInstagram className="text-xl" />
              </a>

              {/* YOUTUBE */}
              <a
                href="https://www.youtube.com/@Nhattythebarber1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:scale-110 hover:bg-red-500 hover:text-white transition duration-300"
              >
                <FaYoutube className="text-xl" />
              </a>

              {/* TIKTOK */}
              <a
                href="https://www.tiktok.com/@nhattythebarber"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:scale-110 hover:bg-white hover:text-black transition duration-300"
              >
                <SiTiktok className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* ===================================== */}
        {/* BOTTOM */}
        {/* ===================================== */}

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 Nhatty The Barber. All rights reserved.
          </p>

          <p className="text-gray-600 text-xs max-w-xl">
            Best barber shop in Ethiopia offering luxury haircuts, premium
            grooming, skin fades, beard styling, and VIP barber experiences in
            Addis Ababa.
          </p>
        </div>
      </div>

      {/* MOBILE SPACER */}
      <div className="h-20 md:hidden"></div>
    </footer>
  );
};

export default Footer;
