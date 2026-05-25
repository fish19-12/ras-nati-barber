import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Hero = () => {
  const [text] = useTypewriter({
    words: [
      "Nhatty The Barber",
      "Premium Grooming Experience",
      "Modern Cuts & Clean Styles",
      "Best Barber In Ethiopia",
      "Luxury Barber Experience",
    ],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 40,
    delaySpeed: 2000,
  });

  return (
    <section
      className="relative w-full min-h-screen pt-20 flex items-center justify-center text-white overflow-hidden"
      aria-label="Nhatty The Barber Hero Section"
    >
      {/* SEO FRIENDLY HIDDEN TEXT */}
      <h1 className="sr-only">
        Nhatty The Barber - Premium Barber Shop in Addis Ababa Ethiopia
      </h1>

      <p className="sr-only">
        Nhatty The Barber provides premium grooming services, modern fades,
        luxury haircuts, beard styling, VIP barber experiences, and professional
        grooming in Ethiopia.
      </p>

      {/* Background Image */}
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-top md:bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${hero})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/75" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/90" />

      {/* Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full"></div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 px-5 py-2 text-[10px] sm:text-xs uppercase tracking-widest border border-amber-400/40 rounded-full text-amber-400 backdrop-blur bg-white/5"
        >
          Premium Barber Experience In Ethiopia
        </motion.div>

        {/* Hero Title */}
        <motion.h2
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-extrabold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
            {text}
            <Cursor cursorStyle="|" />
          </span>
        </motion.h2>

        {/* Subtitle */}

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/booking"
            aria-label="Book barber appointment"
            className="
      group
      inline-flex items-center justify-center
      min-w-[190px]
      px-6 py-3.5
      rounded-2xl
      bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500
      text-black font-bold
      text-sm sm:text-base
      shadow-[0_10px_40px_rgba(251,191,36,0.25)]
      hover:scale-105
      hover:shadow-[0_0_45px_rgba(251,191,36,0.45)]
      active:scale-95
      transition-all duration-300
    "
          >
            Book Appointment
          </Link>

          <Link
            to="/services"
            aria-label="View barber services"
            className="
      inline-flex items-center justify-center
      min-w-[190px]
      px-6 py-3.5
      rounded-2xl
      border border-white/15
      bg-white/5
      backdrop-blur-xl
      text-white
      font-semibold
      text-sm sm:text-base
      hover:bg-white
      hover:text-black
      hover:scale-105
      active:scale-95
      transition-all duration-300
    "
          >
            View Services
          </Link>
        </motion.div>

        {/* FEATURES */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-10 flex flex-wrap justify-center gap-3 text-[11px] sm:text-xs uppercase tracking-widest text-gray-300"
        >
          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            Skin Fades
          </span>

          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            Beard Styling
          </span>

          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            VIP Service
          </span>

          <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
            Luxury Grooming
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-cyan-300 flex gap-3 flex-wrap justify-center"
        >
          <span>Confidence</span>

          <span>•</span>

          <span>Style</span>

          <span>•</span>

          <span>Precision</span>

          <span>•</span>

          <span>Luxury</span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cyan-300 text-sm flex flex-col items-center"
      >
        <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>

        <span className="text-lg">↓</span>
      </motion.div>
    </section>
  );
};

export default Hero;
