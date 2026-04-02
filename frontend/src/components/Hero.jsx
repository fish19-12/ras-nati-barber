import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
import { motion } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const Hero = () => {
  const [text] = useTypewriter({
    words: [
      "Ras Nati Barber Shop",
      "Premium Grooming Experience",
      "Modern Cuts & Clean Styles",
    ],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 40,
    delaySpeed: 2000,
  });

  return (
    <section className="relative w-full min-h-screen pt-20 flex items-center justify-center text-white overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 px-5 py-2 text-[10px] sm:text-xs uppercase tracking-widest border border-amber-400/40 rounded-full text-amber-400 backdrop-blur"
        >
          Premium Barber Experience
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-extrabold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
        >
          <span className="text-amber-400">
            {text}
            <Cursor cursorStyle="|" />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-5 text-cyan-300 text-sm sm:text-base md:text-lg max-w-xl"
        >
          Clean fades, sharp lines, and a premium barber experience crafted for
          men who value style, confidence, and precision.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto"
        >
          <Link
            to="/booking"
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-amber-400 text-black font-semibold hover:scale-105 hover:bg-amber-300 transition"
          >
            Book Appointment
          </Link>

          <Link
            to="/gallery"
            className="w-full sm:w-auto px-8 py-3 rounded-full border border-white/40 hover:bg-white hover:text-black transition"
          >
            View Work
          </Link>
        </motion.div>

        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10 text-[10px] sm:text-xs uppercase tracking-widest text-cyan-300 flex gap-3"
        >
          <span>Confidence</span>
          <span>•</span>
          <span>Style</span>
          <span>•</span>
          <span>Precision</span>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cyan-300 text-sm"
      >
        ↓ Scroll
      </motion.div>
    </section>
  );
};

export default Hero;
