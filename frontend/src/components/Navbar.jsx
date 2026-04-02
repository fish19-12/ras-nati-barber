import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.jpg";
import {
  FaHome,
  FaServicestack,
  FaImages,
  FaStar,
  FaBars,
  FaInfoCircle,
} from "react-icons/fa";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const desktopLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Clients", path: "/reviews" },
    { name: "Contact", path: "/contact" },
  ];

  const mobileLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Services", path: "/services", icon: <FaServicestack /> },
    { name: "Gallery", path: "/gallery", icon: <FaImages /> },
    { name: "Clients", path: "/reviews", icon: <FaStar /> },
    { name: "About", path: "/about", icon: <FaInfoCircle /> },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/90 backdrop-blur-md border-b border-gray-800"
            : "bg-transparent"
        } hidden md:block`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo + Name */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Ras Nati Barber Shop"
              className="h-10 w-10 object-cover rounded-full border border-primary"
            />
            <span className="text-xl font-display text-white">
              Ras Nati <span className="text-yellow-400">Barber Shop</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="flex items-center gap-8 font-medium">
            {desktopLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-1 py-1 transition-colors duration-300 hover:text-yellow-400 ${
                    isActive ? "text-yellow-400" : "text-white"
                  }`}
                >
                  {link.name}
                  <motion.div
                    layoutId="underline"
                    initial={false}
                    animate={{ width: isActive ? "100%" : "0%" }}
                    className="absolute left-0 -bottom-1 h-[2px] bg-yellow-400"
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop Book Button */}
          <Link
            to="/booking"
            className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Book Now
          </Link>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden flex justify-between items-center px-6 py-3 bg-black/90 backdrop-blur-md border-b border-gray-800">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt="Ras Nati Barber Shop"
            className="h-10 w-10 object-cover rounded-full border border-primary"
          />
          <span className="text-white font-semibold text-lg">
            Ras Nati <span className="text-yellow-400">Barber Shop</span>
          </span>
        </Link>

        {/* Hamburger Menu */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white text-2xl"
        >
          <FaBars />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 left-0 right-0 bg-black/90 border-b border-gray-800 md:hidden z-50 backdrop-blur-md"
          >
            <div className="flex flex-col items-center py-6 space-y-4">
              {desktopLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-white text-lg px-4 py-2 rounded-md transition-colors duration-300 hover:bg-yellow-400 hover:text-black ${
                    location.pathname === link.path
                      ? "bg-yellow-400 text-black"
                      : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
        <div className="bg-black/90 backdrop-blur-md border-t border-gray-800 flex justify-between items-center px-6 py-3 rounded-t-2xl shadow-xl relative">
          {mobileLinks.map((link, idx) => {
            const isActive = location.pathname === link.path;

            if (link.name === "Gallery") {
              return (
                <Link
                  key={idx}
                  to={link.path}
                  className={`absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 p-4 rounded-full shadow-2xl text-black text-2xl flex items-center justify-center transition-transform duration-200 z-50 ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                >
                  {link.icon}
                </Link>
              );
            }

            return (
              <Link
                key={idx}
                to={link.path}
                className={`flex flex-col items-center justify-center text-white text-sm transition-transform duration-200 ${
                  isActive ? "text-yellow-400 scale-110" : ""
                }`}
              >
                <div className="text-xl">{link.icon}</div>
                <span className="mt-1">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Spacer for mobile bottom nav */}
    </>
  );
};

export default Navbar;
