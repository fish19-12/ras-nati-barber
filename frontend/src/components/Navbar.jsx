import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import logo from "../assets/logo.jpg";

import {
  FaHome,
  FaImages,
  FaStar,
  FaBars,
  FaInfoCircle,
  FaYoutube,
  FaTimes,
  FaCalendarAlt,
  FaCut,
  FaPhoneAlt,
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
    { name: "Tutorial", path: "/tutorial" },
    { name: "Gallery", path: "/gallery" },
    { name: "Reviews", path: "/reviews" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  /* ---------------- MOBILE BOTTOM LINKS ---------------- */
  const mobileLinks = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Tutorial",
      path: "/tutorial",
      icon: <FaYoutube />,
    },
    {
      name: "Gallery",
      path: "/gallery",
      icon: <FaImages />,
    },
    {
      name: "Reviews",
      path: "/reviews",
      icon: <FaStar />,
    },
    {
      name: "About",
      path: "/about",
      icon: <FaInfoCircle />,
    },
  ];

  /* ---------------- MOBILE MENU LINKS ---------------- */
  const mobileMenuLinks = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Tutorial",
      path: "/tutorial",
      icon: <FaYoutube />,
    },
    {
      name: "Gallery",
      path: "/gallery",
      icon: <FaImages />,
    },
    {
      name: "Reviews",
      path: "/reviews",
      icon: <FaStar />,
    },
    {
      name: "About",
      path: "/about",
      icon: <FaInfoCircle />,
    },
    {
      name: "Services",
      path: "/services",
      icon: <FaCut />,
    },
    {
      name: "Contact",
      path: "/contact",
      icon: <FaPhoneAlt />,
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
              ? "bg-black/85 backdrop-blur-2xl border-b border-yellow-400/10 shadow-2xl"
              : "bg-transparent"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-[88px]">
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
                    shadow-[0_0_25px_rgba(250,204,21,0.35)]
                    group-hover:scale-110
                    transition-all
                    duration-300
                  "
                />

                <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>

              <div>
                <h1
                  className="
                    text-xl
                    font-black
                    tracking-wide
                    leading-none
                    bg-gradient-to-r
                    from-white
                    via-yellow-200
                    to-yellow-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  NHATTY
                </h1>

                <p className="text-yellow-400 text-xs font-medium tracking-[4px] uppercase mt-1">
                  The Barber
                </p>
              </div>
            </Link>

            {/* NAV LINKS */}
            <div className="flex items-center gap-6">
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
                      tracking-[2px]
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
                          shadow-[0_0_12px_rgba(250,204,21,0.9)]
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
                relative
                overflow-hidden
                group
                bg-gradient-to-r
                from-yellow-300
                via-yellow-400
                to-yellow-500
                text-black
                px-7
                py-3
                rounded-full
                font-bold
                transition-all
                duration-300
                hover:scale-105
                shadow-[0_0_30px_rgba(250,204,21,0.35)]
                flex
                items-center
                gap-3
              "
            >
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300" />

              <FaCalendarAlt className="relative z-10" />

              <span className="relative z-10">Book Now</span>
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
          backdrop-blur-2xl
          border-b
          border-yellow-400/10
        "
      >
        <div className="flex items-center justify-between px-5 py-4">
          {/* MOBILE LOGO */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative">
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
                  shadow-[0_0_20px_rgba(250,204,21,0.35)]
                "
              />

              <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-lg" />
            </div>

            <div>
              <h2
                className="
                  text-lg
                  font-black
                  leading-none
                  bg-gradient-to-r
                  from-white
                  via-yellow-200
                  to-yellow-500
                  bg-clip-text
                  text-transparent
                "
              >
                NHATTY
              </h2>

              <p className="text-yellow-400 text-[10px] tracking-[4px] uppercase mt-1">
                The Barber
              </p>
            </div>
          </Link>

          {/* MENU BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="
              relative
              overflow-hidden
              text-white
              text-xl
              bg-zinc-900
              hover:bg-yellow-400
              hover:text-black
              p-3
              rounded-2xl
              transition-all
              duration-300
              border
              border-zinc-700
              shadow-lg
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
              backdrop-blur-2xl
              border-b
              border-zinc-800
            "
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              {mobileMenuLinks.map((link, idx) => {
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
                            ? "bg-yellow-400 text-black shadow-[0_0_25px_rgba(250,204,21,0.35)]"
                            : "bg-zinc-900 text-white hover:bg-zinc-800"
                        }
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-xl">{link.icon}</span>

                        <span>{link.name}</span>
                      </div>

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
                  bg-gradient-to-r
                  from-yellow-300
                  via-yellow-400
                  to-yellow-500
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
                  shadow-[0_0_30px_rgba(250,204,21,0.35)]
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
            backdrop-blur-2xl
            border-t
            border-yellow-400/10
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

            /* CENTER GALLERY BUTTON */
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
                    w-[68px]
                    h-[68px]
                    rounded-full
                    flex
                    items-center
                    justify-center
                    text-2xl
                    transition-all
                    duration-300
                    border-4
                    border-black
                    shadow-2xl
                    ${
                      isActive
                        ? "bg-gradient-to-r from-yellow-300 to-yellow-500 text-black scale-110 shadow-[0_0_35px_rgba(250,204,21,0.45)]"
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
                  text-[11px]
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
