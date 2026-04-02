import { motion } from "framer-motion";
import ceoPhoto from "../assets/ceo.jpg";
import shop1 from "../assets/shop1.jpg";
import shop2 from "../assets/shop2.jpg";
import { FaCut, FaStar, FaUsers, FaGlobe } from "react-icons/fa";

const highlights = [
  {
    icon: FaStar,
    title: "Legendary Reputation",
    desc: "Recognized by celebrities and international clients for unmatched grooming excellence.",
  },
  {
    icon: FaUsers,
    title: "Elite Barbers",
    desc: "Highly skilled professionals mastering both modern trends and timeless styles.",
  },
  {
    icon: FaGlobe,
    title: "Global Clients",
    desc: "Trusted by clients worldwide who demand premium grooming experiences.",
  },
  {
    icon: FaCut,
    title: "Luxury Experience",
    desc: "Every service is crafted with precision, care, and premium attention.",
  },
];

const About = () => {
  return (
    <div className="w-full text-white font-exo bg-black overflow-x-hidden">
      {/* HERO */}
      <section className="relative h-[85vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1588776814546-13e6763ad7e0?auto=format&fit=crop&w=1400&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/75"></div>

        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center px-6 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase">
            About <span className="text-yellow-400">Ras Nati</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg md:text-xl">
            Where precision meets luxury. A world-class barber experience
            trusted by style leaders and global clients.
          </p>
        </motion.div>
      </section>

      {/* STORY */}
      <section className="max-w-7xl mx-auto py-24 px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute -inset-6 bg-gradient-to-tr from-yellow-400/30 to-primary/20 blur-3xl rounded-3xl"></div>

          <img
            src={ceoPhoto}
            alt="CEO"
            className="relative rounded-3xl shadow-2xl hover:scale-105 transition duration-500"
          />
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Meet <span className="text-yellow-400">Nati</span>
          </h2>

          <p className="text-gray-300 leading-relaxed text-lg">
            Founder of Ras Nati Barber Shop, Nati built a brand that stands for
            precision, style, and excellence. What started as passion is now a
            global grooming destination.
          </p>

          <p className="text-gray-300 leading-relaxed text-lg">
            Every haircut reflects dedication, creativity, and attention to
            detail — delivering not just a service, but a premium experience.
          </p>
        </motion.div>
      </section>

      {/* SHOP GALLERY */}
      <section className="py-24 px-6 bg-black/80">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400">
            Inside Our Shop
          </h2>
          <p className="text-gray-400 mt-4">
            A modern, stylish, and comfortable environment designed for premium
            grooming.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {[shop1, shop2].map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="relative overflow-hidden rounded-3xl group"
            >
              <img
                src={img}
                alt="shop"
                className="w-full h-[400px] object-cover"
              />

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <p className="text-yellow-400 text-xl font-semibold">
                  Premium Atmosphere
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400">
            Why Choose Us
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-lg text-center hover:shadow-[0_0_40px_rgba(255,215,0,0.3)] transition"
            >
              <item.icon className="text-yellow-400 text-4xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-black">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase">
          Ready for Your Best Look?
        </h2>
        <p className="mb-8 text-lg">
          Book your appointment today and experience premium grooming.
        </p>

        <a
          href="/booking"
          className="bg-black text-yellow-400 px-12 py-5 rounded-full font-bold text-lg hover:scale-105 transition"
        >
          Book Now
        </a>
      </section>
    </div>
  );
};

export default About;
