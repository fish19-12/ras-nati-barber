import { motion } from "framer-motion";
import ceoPhoto from "../assets/ceo.jpg";
import { FaCut, FaStar, FaUsers, FaGlobe } from "react-icons/fa";

const About = () => {
  return (
    <div className="w-full text-white font-sans bg-gray-900">
      {/* Hero Section */}
      <section
        className="relative h-[80vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1588776814546-13e6763ad7e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative text-center max-w-3xl px-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold">
            About <span className="text-primary">Ras Nati Barber Shop</span>
          </h1>
          <p className="mt-6 text-gray-300 text-lg md:text-xl">
            Where precision meets style — transforming haircuts into an art
            form.
          </p>
        </motion.div>
      </section>

      {/* Ras Nati Story */}
      <section className="max-w-6xl mx-auto py-24 px-6 flex flex-col md:flex-row gap-12 items-center">
        <motion.img
          src={ceoPhoto}
          alt="Nati Barber"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-1/2 rounded-3xl shadow-2xl object-cover"
        />
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:w-1/2 flex flex-col gap-6"
        >
          <h2 className="text-4xl font-bold text-primary">
            Meet <span className="text-white">Nati</span>
          </h2>
          <p className="text-gray-300 text-lg">
            Ras Nati Barber Shop was founded by Nati with one mission: to
            elevate grooming into an unforgettable experience. Over the years,
            our shop has become the go-to destination in Addis Abeba for both
            locals and international visitors seeking premium cuts, precision
            grooming, and modern styles.
          </p>
          <p className="text-gray-300 text-lg">
            At Ras Nati, we combine artistry, skill, and attention to detail to
            create a personalized experience for every client. Our philosophy is
            simple: exceptional haircuts + world-class service = happy clients.
          </p>
        </motion.div>
      </section>

      {/* Highlights Section */}
      <section className="bg-gray-800 py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">
            Why Choose <span className="text-primary">Ras Nati</span>?
          </h2>
          <div className="grid md:grid-cols-4 gap-10">
            {[
              {
                icon: FaStar,
                title: "Trusted & Famous",
                desc: "Ras Nati is renowned across Addis Abeba, trusted by celebrities, influencers, and international clients.",
              },
              {
                icon: FaUsers,
                title: "Professional Team",
                desc: "Our skilled barbers are certified, experienced, and experts in modern and classic styles.",
              },
              {
                icon: FaGlobe,
                title: "Global Clients",
                desc: "We attract clients from all over the world, delivering premium grooming experiences.",
              },
              {
                icon: FaCut,
                title: "Modern Styles",
                desc: "From timeless classics to trendy designs, every cut is precise, stylish, and tailored.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-4 bg-black/50 backdrop-blur-md p-8 rounded-3xl shadow-xl transition-transform"
              >
                <item.icon className="text-primary text-5xl" />
                <h3 className="text-xl md:text-2xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-center">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="bg-primary py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">
          Experience the Premium Cut
        </h2>
        <p className="text-black/90 mb-6 md:text-lg">
          Book your appointment today and join our growing family of stylish
          clients.
        </p>
        <a
          href="/booking"
          className="inline-block bg-black text-white px-10 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition"
        >
          Book Now
        </a>
      </section>
    </div>
  );
};

export default About;
