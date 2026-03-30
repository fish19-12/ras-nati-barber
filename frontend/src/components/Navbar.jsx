import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Professional sequence
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Reviews", path: "/reviews" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-gray-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Ras Nati Barber"
            className="h-10 w-10 object-cover rounded-full border border-primary"
          />
          <span className="text-xl font-display text-white">
            Ras Nati <span className="text-primary">Barber Shop</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-1 py-1 transition-colors duration-300 hover:text-primary ${
                  isActive ? "text-primary" : "text-white"
                }`}
              >
                {link.name}
                <motion.div
                  layoutId="underline"
                  initial={false}
                  animate={{
                    width: isActive ? "100%" : "0%",
                  }}
                  className="absolute left-0 -bottom-1 h-[2px] bg-primary"
                />
              </Link>
            );
          })}
        </div>

        {/* Book Now Button */}
        <div className="hidden md:block">
          <Link
            to="/booking"
            className="bg-primary text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-white text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-black border-t border-gray-800"
          >
            <div className="flex flex-col items-center py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`text-white text-lg px-4 py-2 rounded-md transition-colors duration-300 hover:bg-primary hover:text-black ${
                    location.pathname === link.path
                      ? "bg-primary text-black"
                      : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link
                to="/booking"
                onClick={() => setOpen(false)}
                className="bg-primary text-black px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
