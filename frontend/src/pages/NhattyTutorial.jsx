// src/pages/NhattyTutorial.jsx

import { motion } from "framer-motion";
import { FaPlay, FaClock, FaStar, FaYoutube, FaCut } from "react-icons/fa";

const tutorials = [
  {
    id: 1,
    title: "Perfect Skin Fade Tutorial",
    duration: "12 Min",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1200&auto=format&fit=crop",
    video: "https://www.youtube.com/",
  },
  {
    id: 2,
    title: "Sharp Beard Line Up",
    duration: "9 Min",
    level: "Intermediate",
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1200&auto=format&fit=crop",
    video: "https://www.youtube.com/",
  },
  {
    id: 3,
    title: "Modern Afro Haircut",
    duration: "15 Min",
    level: "Advanced",
    image:
      "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?q=80&w=1200&auto=format&fit=crop",
    video: "https://www.youtube.com/",
  },
  {
    id: 4,
    title: "Professional Clipper Guide",
    duration: "11 Min",
    level: "Beginner",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1200&auto=format&fit=crop",
    video: "https://www.youtube.com/",
  },
];

const categories = [
  "All",
  "Fade",
  "Beard",
  "Dreadlocks",
  "Coloring",
  "Line Up",
];

const NhattyTutorial = () => {
  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-[100vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-yellow-400/20 border border-yellow-400/30 p-5 rounded-full">
              <FaCut className="text-yellow-400 text-4xl" />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            NHATTY
            <span className="text-yellow-400"> TUTORIAL</span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg md:text-2xl leading-relaxed">
            Learn professional barber techniques, fades, beard styling,
            dreadlocks, and modern haircut skills from Nhatty The Barber.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl">
              Watch Tutorials
            </button>

            <button className="border border-gray-600 hover:border-yellow-400 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-yellow-400/10">
              Explore Courses
            </button>
          </div>
        </motion.div>
      </section>

      {/* SEARCH + CATEGORY */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="w-full lg:w-[400px]">
            <input
              type="text"
              placeholder="Search tutorials..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-4 text-white outline-none focus:border-yellow-400 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, idx) => (
              <button
                key={idx}
                className={`px-5 py-2 rounded-full transition-all duration-300 ${
                  idx === 0
                    ? "bg-yellow-400 text-black font-semibold"
                    : "bg-zinc-900 hover:bg-yellow-400/20 border border-zinc-800 hover:border-yellow-400"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED VIDEO */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[40px] overflow-hidden border border-zinc-800 bg-zinc-950"
        >
          <img
            src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=2070&auto=format&fit=crop"
            alt=""
            className="w-full h-[500px] object-cover opacity-40"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <button className="bg-yellow-400 hover:scale-110 transition-transform duration-300 text-black p-8 rounded-full shadow-2xl">
              <FaPlay className="text-4xl ml-2" />
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/70 to-transparent">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-yellow-400 text-black px-4 py-1 rounded-full font-semibold text-sm">
                FEATURED
              </span>

              <span className="flex items-center gap-2 text-gray-300 text-sm">
                <FaClock />
                18 Min
              </span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold">
              How To Make A Perfect Skin Fade
            </h2>

            <p className="text-gray-300 mt-4 max-w-3xl">
              Master professional fade blending techniques, clean line-ups,
              clipper control, and modern barber finishing.
            </p>
          </div>
        </motion.div>
      </section>

      {/* TUTORIAL GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-black">
            Latest <span className="text-yellow-400">Tutorials</span>
          </h2>

          <button className="text-yellow-400 hover:text-yellow-300 font-semibold">
            View All
          </button>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {tutorials.map((tutorial, idx) => (
            <motion.div
              key={tutorial.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-zinc-950 border border-zinc-800 rounded-[30px] overflow-hidden hover:border-yellow-400/40 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={tutorial.image}
                  alt={tutorial.title}
                  className="h-[280px] w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <button className="bg-yellow-400 text-black p-5 rounded-full hover:scale-110 transition-transform">
                    <FaPlay className="text-xl ml-1" />
                  </button>
                </div>

                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full text-sm flex items-center gap-2">
                  <FaClock className="text-yellow-400" />
                  {tutorial.duration}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 px-4 py-1 rounded-full text-sm">
                    {tutorial.level}
                  </span>

                  <div className="flex items-center gap-1 text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                  </div>
                </div>

                <h3 className="text-xl font-bold leading-snug">
                  {tutorial.title}
                </h3>

                <button className="mt-6 w-full bg-zinc-900 hover:bg-yellow-400 hover:text-black border border-zinc-800 hover:border-yellow-400 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-3">
                  <FaYoutube />
                  Watch Tutorial
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TIPS SECTION */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-[40px] p-10 md:p-16 text-black">
          <div className="max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Become A Professional Barber
            </h2>

            <p className="mt-6 text-lg md:text-xl text-black/80">
              Learn modern techniques, client communication, fade blending,
              beard shaping, and premium barber styling from Nhatty The Barber.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <button className="bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
                Start Learning
              </button>

              <button className="border border-black px-8 py-4 rounded-full font-semibold hover:bg-black hover:text-white transition-all">
                Join Community
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NhattyTutorial;
