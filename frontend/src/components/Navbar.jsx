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
  FaYoutube,
  FaTimes,
  FaCalendarAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const location = useLocation();

  /* ---------------- SCROLL EFFECT ---------------- */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ---------------- CLOSE MENU ON ROUTE CHANGE ---------------- */
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  /* ---------------- DESKTOP LINKS ---------------- */
  const desktopLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Nhatty Tutorial", path: "/tutorial" },
    { name: "Clients", path: "/reviews" },
    { name: "Contact", path: "/contact" },
  ];

  /* ---------------- MOBILE LINKS ---------------- */
  const mobileLinks = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Services",
      path: "/services",
      icon: <FaServicestack />,
    },
    {
      name: "Gallery",
      path: "/gallery",
      icon: <FaImages />,
    },
    {
      name: "Tutorial",
      path: "/tutorial",
      icon: <FaYoutube />,
    },
    {
      name: "Reviews",
      path: "/reviews",
      icon: <FaStar />,
    },
  ];

  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <nav
        className={`
          fixed
          top-0
          left-0
          w-full
          z-50
          hidden
          md:block
          transition-all
          duration-500
          ${
            scrolled
              ? "bg-black/90 backdrop-blur-xl border-b border-zinc-800 shadow-2xl"
              : "bg-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[85px]">
            {/* LOGO */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img
                  src={logo}
                  alt="Nhatty The Barber"
                  className="
                    h-12
                    w-12
                    rounded-full
                    object-cover
                    border-2
                    border-yellow-400
                    shadow-lg
                    group-hover:scale-110
                    transition-transform
                    duration-300
                  "
                />

                <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div>
                <h1 className="text-xl font-black tracking-wide text-white leading-none">
                  NHATTY
                </h1>

                <p className="text-yellow-400 text-sm font-medium tracking-[3px] uppercase">
                  The Barber
                </p>
              </div>
            </Link>

            {/* NAV LINKS */}
            <div className="flex items-center gap-8">
              {desktopLinks.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`
                      relative
                      text-sm
                      uppercase
                      tracking-wider
                      font-semibold
                      transition-all
                      duration-300
                      hover:text-yellow-400
                      ${isActive ? "text-yellow-400" : "text-white"}
                    `}
                  >
                    {link.name}

                    {isActive && (
                      <motion.div
                        layoutId="activeDesktopLink"
                        className="
                          absolute
                          left-0
                          -bottom-2
                          w-full
                          h-[2px]
                          bg-yellow-400
                          rounded-full
                        "
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* BOOK BUTTON */}
            <Link
              to="/booking"
              className="
                group
                relative
                overflow-hidden
                bg-yellow-400
                hover:bg-yellow-300
                text-black
                px-7
                py-3
                rounded-full
                font-bold
                transition-all
                duration-300
                hover:scale-105
                shadow-xl
                flex
                items-center
                gap-3
              "
            >
              <FaCalendarAlt />

              <span>Book Now</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE TOP NAV ================= */}
      <div
        className="
          fixed
          top-0
          left-0
          right-0
          z-50
          md:hidden
          bg-black/90
          backdrop-blur-xl
          border-b
          border-zinc-800
        "
      >
        <div className="flex items-center justify-between px-5 py-4">
          {/* MOBILE LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Nhatty The Barber"
              className="
                h-11
                w-11
                rounded-full
                object-cover
                border-2
                border-yellow-400
              "
            />

            <div>
              <h2 className="text-white font-black text-lg leading-none">
                NHATTY
              </h2>

              <p className="text-yellow-400 text-xs tracking-[3px] uppercase">
                The Barber
              </p>
            </div>
          </Link>

          {/* MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="
              text-white
              text-2xl
              bg-zinc-900
              hover:bg-yellow-400
              hover:text-black
              p-3
              rounded-xl
              transition-all
              duration-300
            "
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.3 }}
            className="
              fixed
              top-[76px]
              left-0
              right-0
              z-50
              md:hidden
              bg-black/95
              backdrop-blur-xl
              border-b
              border-zinc-800
            "
          >
            <div className="px-6 py-8 flex flex-col gap-5">
              {desktopLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;

                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: idx * 0.05,
                    }}
                  >
                    <Link
                      to={link.path}
                      className={`
                        flex
                        items-center
                        justify-between
                        px-5
                        py-4
                        rounded-2xl
                        text-lg
                        font-semibold
                        transition-all
                        duration-300
                        ${
                          isActive
                            ? "bg-yellow-400 text-black"
                            : "bg-zinc-900 text-white hover:bg-zinc-800"
                        }
                      `}
                    >
                      <span>{link.name}</span>

                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-black" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              {/* MOBILE BOOK BUTTON */}
              <Link
                to="/booking"
                className="
                  mt-4
                  bg-yellow-400
                  hover:bg-yellow-300
                  text-black
                  py-4
                  rounded-2xl
                  font-bold
                  text-center
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >
                <FaCalendarAlt />
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-40
          md:hidden
        "
      >
        <div
          className="
            bg-black/95
            backdrop-blur-xl
            border-t
            border-zinc-800
            rounded-t-[30px]
            shadow-2xl
            px-6
            py-3
            flex
            justify-between
            items-center
            relative
          "
        >
          {mobileLinks.map((link, idx) => {
            const isActive = location.pathname === link.path;

            /* SPECIAL CENTER BUTTON */
            if (link.name === "Gallery") {
              return (
                <Link
                  key={idx}
                  to={link.path}
                  className={`
                    absolute
                    left-1/2
                    -translate-x-1/2
                    -top-7
                    w-16
                    h-16
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-2xl
                    shadow-2xl
                    transition-all
                    duration-300
                    border-4
                    border-black
                    ${
                      isActive
                        ? "bg-yellow-400 text-black scale-110"
                        : "bg-white text-black"
                    }
                  `}
                >
                  {link.icon}
                </Link>
              );
            }

            return (
              <Link
                key={idx}
                to={link.path}
                className={`
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-xs
                  transition-all
                  duration-300
                  ${isActive ? "text-yellow-400 scale-110" : "text-gray-400"}
                `}
              >
                <div className="text-xl mb-1">{link.icon}</div>

                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
