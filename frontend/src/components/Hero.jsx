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
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8 }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

      {/* Luxury spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,215,0,0.18),transparent_45%)]"></div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-5xl md:text-7xl font-bold leading-tight tracking-tight"
          >
            Precision Cuts <br />
            <span className="text-primary">Luxury Grooming</span> <br />
            Redefined
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-lg mt-6 mb-10 leading-relaxed"
          >
            Experience premium barbering at
            <span className="text-primary font-semibold">
              {" "}
              Ras Nat Barber Shop
            </span>
            . From precision fades to expert beard grooming, we deliver a
            grooming experience designed for confidence and style.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-5"
          >
            <Link
              to="/booking"
              className="bg-primary text-black px-9 py-3 rounded-full font-semibold tracking-wide hover:scale-105 hover:shadow-[0_0_25px_rgba(255,215,0,0.6)] transition"
            >
              Book Appointment
            </Link>

            <Link
              to="/gallery"
              className="border border-primary px-9 py-3 rounded-full hover:bg-primary hover:text-black transition font-medium"
            >
              View Gallery
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="grid grid-cols-3 gap-6 mt-14 max-w-lg"
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
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
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
