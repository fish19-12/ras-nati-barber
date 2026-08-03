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

import { Globe, ChevronDown } from "lucide-react";

import { useLanguage } from "../context/LanguageContext.jsx";

import en from "../translations/en.json";
import am from "../translations/am.json";

const Navbar = () => {
  const { language, setLanguage } = useLanguage();

  const translations = language === "AM" ? am : en;

  const [scrolled, setScrolled] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [languageOpen, setLanguageOpen] = useState(false);

  const location = useLocation();

  /* ================= SCROLL EFFECT ================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ================= CLOSE MOBILE MENU ================= */

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  /* ================= DESKTOP LINKS ================= */

  const desktopLinks = [
    {
      name: translations.navbar.home,
      path: "/",
    },

    {
      name: translations.navbar.tutorial,
      path: "/tutorial",
    },

    {
      name: translations.navbar.gallery,
      path: "/gallery",
    },

    {
      name: translations.navbar.reviews,
      path: "/reviews",
    },

    {
      name: translations.navbar.about,
      path: "/about",
    },

    {
      name: translations.navbar.services,
      path: "/services",
    },

    {
      name: translations.navbar.contact,
      path: "/contact",
    },
  ];

  /* ================= MOBILE BOTTOM LINKS ================= */

  const mobileLinks = [
    {
      name: translations.navbar.home,
      path: "/",
      icon: <FaHome />,
    },
    {
      name: translations.navbar.reviews,
      path: "/reviews",
      icon: <FaStar />,
    },

    {
      name: translations.navbar.gallery,
      path: "/gallery",
      icon: <FaImages />,
    },

    {
      name: translations.navbar.about,
      path: "/about",
      icon: <FaInfoCircle />,
    },
    {
      name: translations.navbar.contact,
      path: "/contact",
      icon: <FaPhoneAlt />,
    },
  ];

  /* ================= MOBILE MENU LINKS ================= */

  const mobileMenuLinks = [
    {
      name: translations.navbar.home,
      path: "/",
      icon: <FaHome />,
    },
    {
      name: translations.navbar.reviews,
      path: "/reviews",
      icon: <FaStar />,
    },

    {
      name: translations.navbar.gallery,
      path: "/gallery",
      icon: <FaImages />,
    },

    {
      name: translations.navbar.about,
      path: "/about",
      icon: <FaInfoCircle />,
    },

    {
      name: translations.navbar.services,
      path: "/services",
      icon: <FaCut />,
    },

    {
      name: translations.navbar.contact,
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
        <div
          className="
          max-w-7xl
          mx-auto
          px-6
          lg:px-8
        "
        >
          <div
            className="
            flex
            items-center
            justify-between
            h-[88px]
          "
          >
            {/* ================= LOGO ================= */}

            <Link
              to="/"
              className="
                flex
                items-center
                gap-3
                group
              "
            >
              <div className="relative">
                <img
                  src={logo}
                  alt="Fiyorina Chiffon"
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

                <div
                  className="
                    absolute
                    inset-0
                    rounded-full
                    bg-yellow-400/20
                    blur-lg
                    opacity-0
                    group-hover:opacity-100
                    transition-all
                    duration-300
                  "
                />
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
                  Nhatty The
                </h1>

                <p
                  className="
                    text-yellow-400
                    text-xs
                    font-medium
                    tracking-[4px]
                    uppercase
                    mt-1
                  "
                >
                  Barber
                </p>
              </div>
            </Link>

            {/* ================= DESKTOP LINKS ================= */}

            <div className="flex items-center gap-6">
              {desktopLinks.map((link) => {
                const isActive = location.pathname === link.path;

                return (
                  <Link
                    key={link.path}
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

            {/* ================= BOOK BUTTON ================= */}

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
              <span
                className="
                  absolute
                  inset-0
                  bg-white/20
                  opacity-0
                  group-hover:opacity-100
                  transition-all
                  duration-300
                "
              />

              <FaCalendarAlt className="relative z-10" />

              <span className="relative z-10">
                {translations.navbar.bookNow}
              </span>
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
        <div
          className="
          flex
          items-center
          justify-between
          px-5
          py-4
        "
        >
          {/* ================= MOBILE LOGO ================= */}

          <Link
            to="/"
            className="
              flex
              items-center
              gap-3
            "
          >
            <img
              src={logo}
              alt="Fiyorina Chiffon"
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
                Fiyorina
              </h2>

              <p
                className="
                  text-yellow-400
                  text-[10px]
                  tracking-[4px]
                  uppercase
                  mt-1
                "
              >
                Chiffon
              </p>
            </div>
          </Link>

          {/* ================= RIGHT ACTIONS ================= */}

          <div
            className="
            flex
            items-center
            gap-3
          "
          >
            {/* ================= LANGUAGE BUTTON ================= */}

            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="
                  flex
                  items-center
                  gap-1.5
                  px-3
                  py-3
                  rounded-2xl
                  bg-zinc-900
                  border
                  border-zinc-700
                  text-white
                  hover:border-yellow-400
                  hover:text-yellow-400
                  transition-all
                "
              >
                <Globe size={18} />

                <span
                  className="
                  text-xs
                  font-semibold
                "
                >
                  {language}
                </span>

                <ChevronDown
                  size={14}
                  className={`
                    transition-transform
                    duration-300

                    ${languageOpen ? "rotate-180" : ""}

                  `}
                />
              </button>

              <AnimatePresence>
                {languageOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -8,
                    }}
                    className="
                        absolute
                        right-0
                        mt-2
                        w-36
                        rounded-2xl
                        bg-zinc-900
                        border
                        border-zinc-700
                        overflow-hidden
                        shadow-2xl
                      "
                  >
                    <button
                      onClick={() => {
                        setLanguage("EN");

                        setLanguageOpen(false);
                      }}
                      className="
                          w-full
                          px-4
                          py-3
                          text-left
                          text-white
                          hover:bg-yellow-400
                          hover:text-black
                          transition-all
                        "
                    >
                      🇺🇸 {translations.navbar.languageEnglish}
                    </button>

                    <button
                      onClick={() => {
                        setLanguage("AM");

                        setLanguageOpen(false);
                      }}
                      className="
                          w-full
                          px-4
                          py-3
                          text-left
                          text-white
                          hover:bg-yellow-400
                          hover:text-black
                          transition-all
                        "
                    >
                      🇪🇹 {translations.navbar.languageAmharic}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ================= MENU BUTTON ================= */}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="
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
              "
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            className="
                fixed
                top-[76px]
                left-0
                right-0
                z-40
                md:hidden
                bg-black/95
                backdrop-blur-2xl
                border-b
                border-zinc-800
              "
          >
            <div
              className="
                px-6
                py-8
                flex
                flex-col
                gap-4
              "
            >
              {mobileMenuLinks.map((link, index) => {
                const isActive = location.pathname === link.path;

                return (
                  <motion.div
                    key={link.path}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.05,
                    }}
                  >
                    <Link
                      to={link.path}
                      className={`

                            flex
                            items-center
                            gap-4
                            px-5
                            py-4
                            rounded-2xl
                            font-semibold
                            transition-all


                            ${
                              isActive
                                ? "bg-yellow-400 text-black"
                                : "bg-zinc-900 text-white"
                            }


                          `}
                    >
                      <span className="text-xl">{link.icon}</span>

                      <span>{link.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* ================= MOBILE BOOK BUTTON ================= */}

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

              {translations.navbar.bookAppointment}
            </Link>
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
          {mobileLinks.map((link, index) => {
            const isActive = location.pathname === link.path;

            return (
              <Link
                key={index}
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
                <div
                  className="
                    text-xl
                    mb-1
                  "
                >
                  {link.icon}
                </div>

                <span>{link.name}</span>
              </Link>
            );
          })}

          {/* ================= CENTER GALLERY BUTTON ================= */}

          <Link
            to="/gallery"
            className="
              absolute
              left-1/2
              -translate-x-1/2
              -top-7
              w-[68px]
              h-[68px]
              rounded-full
              bg-gradient-to-r
              from-yellow-300
              via-yellow-400
              to-yellow-500
              text-black
              flex
              items-center
              justify-center
              text-2xl
              border-4
              border-black
              shadow-[0_0_35px_rgba(250,204,21,0.45)]
              transition-all
              duration-300
            "
          >
            <FaImages />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
