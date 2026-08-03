import { motion } from "framer-motion";

import ceoPhoto from "../assets/ceo.jpg";
import shop2 from "../assets/shop2.jpg";

import { FaCut, FaStar, FaUsers, FaGlobe } from "react-icons/fa";

import { useLanguage } from "../context/LanguageContext.jsx";

import en from "../translations/en.json";
import am from "../translations/am.json";

const About = () => {
  const { language } = useLanguage();

  const translations = language === "AM" ? am : en;

  const highlights = [
    {
      icon: FaStar,

      title: translations.about.highlights.reputation.title,

      desc: translations.about.highlights.reputation.desc,
    },

    {
      icon: FaUsers,

      title: translations.about.highlights.barbers.title,

      desc: translations.about.highlights.barbers.desc,
    },

    {
      icon: FaGlobe,

      title: translations.about.highlights.clients.title,

      desc: translations.about.highlights.clients.desc,
    },

    {
      icon: FaCut,

      title: translations.about.highlights.luxury.title,

      desc: translations.about.highlights.luxury.desc,
    },
  ];

  return (
    <div className="w-full text-white font-exo bg-black overflow-x-hidden">
      {" "}
      {/* HERO */}
      <section className="relative h-[85vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1588776814546-13e6763ad7e0?auto=format&fit=crop&w=1400&q=80')",
          }}
        />

        <div className="absolute inset-0 bg-black/75" />

        <motion.div
          initial={{
            opacity: 0,
            y: -60,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
          }}
          className="relative text-center px-6 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase">
            {translations.about.heroTitle}{" "}
            <span className="text-yellow-400">Nhatty The Barber</span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg md:text-xl">
            {translations.about.heroDescription}
          </p>
        </motion.div>
      </section>
      {/* STORY */}
      <section className="max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* IMAGE */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.8,
          }}
          className="relative flex justify-center"
        >
          {/* background glow */}

          <div className="absolute -inset-10 bg-gradient-to-tr from-yellow-400/20 to-white/5 blur-3xl rounded-full"></div>

          {/* frame card */}

          <div className="relative w-full max-w-sm">
            <div className="absolute -inset-2 bg-gradient-to-tr from-yellow-400/40 to-transparent rounded-3xl blur-sm"></div>

            <div className="relative bg-zinc-950/60 border border-zinc-800 backdrop-blur-xl rounded-3xl p-4 shadow-2xl">
              <img
                src={ceoPhoto}
                alt="CEO"
                className="w-full h-[420px] object-cover rounded-2xl"
              />

              <div className="mt-4 flex items-center justify-between">
                <span className="text-yellow-400 text-sm font-semibold">
                  {translations.about.founderRole}
                </span>

                <div className="flex gap-1 text-yellow-400">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* TEXT */}

        <motion.div
          initial={{
            opacity: 0,
            x: 60,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            {translations.about.meet}{" "}
            <span className="text-yellow-400">Nati</span>
          </h2>

          <p className="text-gray-300 leading-relaxed text-lg">
            {translations.about.storyOne}
          </p>

          <p className="text-gray-300 leading-relaxed text-lg">
            {translations.about.storyTwo}
          </p>

          <p className="text-gray-400 leading-relaxed text-md">
            {translations.about.storyThree}
          </p>
        </motion.div>
      </section>{" "}
      {/* SHOP GALLERY */}
      <section className="py-24 px-6 bg-black/80">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400">
            {translations.about.shopTitle}
          </h2>

          <p className="text-gray-400 mt-4">
            {translations.about.shopDescription}
          </p>
        </div>

        {/* ONLY ONE SHOP IMAGE */}

        <div className="max-w-4xl mx-auto">
          <motion.div
            whileHover={{
              scale: 1.03,
            }}
            className="relative overflow-hidden rounded-3xl group"
          >
            <img
              src={shop2}
              alt="shop"
              className="w-full h-[400px] md:h-[520px] object-cover"
            />

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
              <p className="text-yellow-400 text-xl md:text-2xl font-semibold">
                {translations.about.premiumAtmosphere}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      {/* HIGHLIGHTS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400">
            {translations.about.whyChoose}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -10,
              }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg text-center hover:shadow-[0_0_40px_rgba(255,215,0,0.3)] transition"
            >
              <item.icon className="text-yellow-400 text-4xl mx-auto mb-4" />

              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>

              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>{" "}
      {/* CTA */}
      <section className="py-24 text-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">
          {translations.about.ctaTitle}
        </h2>

        <p className="mb-8 text-lg">{translations.about.ctaDescription}</p>

        <a
          href="/booking"
          className="bg-black text-yellow-400 px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition"
        >
          {translations.about.bookNow}
        </a>
      </section>
    </div>
  );
};

export default About;
