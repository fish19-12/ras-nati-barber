import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <>{count}</>;
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12 }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

      {/* Animated geometric shapes */}
      <motion.div
        className="absolute top-20 left-10 w-40 h-40 border-2 border-primary rounded-full opacity-40"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-32 right-20 w-60 h-60 border border-yellow-400 rounded-xl opacity-30"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-1 bg-gradient-to-r from-yellow-400 via-transparent to-yellow-400 opacity-20 blur-xl -translate-x-1/2"
        animate={{ x: [0, 300, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col justify-center h-full">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight"
        >
          Precision Cuts, <br />
          <span className="text-primary">Luxury Grooming</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="text-gray-300 text-lg md:text-xl mt-6 max-w-xl"
        >
          Elevate your style with expert barbering at{" "}
          <span className="text-primary font-semibold">
            Ras Nat Barber Shop
          </span>
          .
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="flex flex-wrap gap-5 mt-8"
        >
          <Link
            to="/booking"
            className="bg-primary text-black px-8 py-3 rounded-full font-semibold tracking-wide hover:scale-105 hover:shadow-lg transition-transform"
          >
            Book Appointment
          </Link>
          <Link
            to="/gallery"
            className="border border-primary px-8 py-3 rounded-full text-white hover:bg-primary hover:text-black transition"
          >
            View Gallery
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="grid grid-cols-3 gap-6 mt-16 max-w-3xl"
        >
          <div className="backdrop-blur-md bg-white/5 border border-white/10 p-5 rounded-xl text-center">
            <h3 className="text-3xl font-bold text-primary">
              <Counter end={500} />+
            </h3>
            <p className="text-gray-400 text-sm">Happy Clients</p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 p-5 rounded-xl text-center">
            <h3 className="text-3xl font-bold text-primary">5★</h3>
            <p className="text-gray-400 text-sm">Top Rating</p>
          </div>

          <div className="backdrop-blur-md bg-white/5 border border-white/10 p-5 rounded-xl text-center">
            <h3 className="text-3xl font-bold text-primary">
              <Counter end={3} />+
            </h3>
            <p className="text-gray-400 text-sm">Years Experience</p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary mt-2 animate-bounce"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
