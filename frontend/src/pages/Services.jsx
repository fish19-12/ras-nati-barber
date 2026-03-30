import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCut, FaUserTie, FaFire, FaSpa, FaCrown } from "react-icons/fa";
import ServiceCard from "../components/ServiceCard"; // ✅ correct import path

const services = [
  {
    title: "Haircut",
    price: "R100",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a",
    icon: <FaCut />,
  },
  {
    title: "Shaving",
    price: "R50",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70",
    icon: <FaUserTie />,
  },
  {
    title: "Beard Trim",
    price: "R60",
    image: "https://images.unsplash.com/photo-1612197520061-cc66b7e8f4f0",
    icon: <FaUserTie />,
  },
  {
    title: "Hairstyle / Styling",
    price: "R120",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    icon: <FaFire />,
  },
  {
    title: "Massage / Head Massage",
    price: "R80",
    image: "https://images.unsplash.com/photo-1618237754827-6f7473b93b25",
    icon: <FaSpa />,
  },
  {
    title: "Hair / Scalp Treatment",
    price: "R150",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033",
    icon: <FaSpa />,
  },
  {
    title: "VIP Service",
    price: "R300",
    image: "https://images.unsplash.com/photo-1618226743353-1f8c4b1f3f8b",
    icon: <FaCrown className="text-yellow-400" />,
    vip: true,
  },
];

const Services = () => {
  return (
    <div className="bg-black text-white">
      {/* Hero Section */}
      <section className="py-24 text-center border-b border-gray-800 relative overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-bold mb-4"
        >
          Our Premium Services
        </motion.h1>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Elevate your style with professional barbering. Precision cuts, expert
          grooming, and modern luxury for your look.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              price={service.price}
              image={service.image}
              icon={service.icon}
              vip={service.vip || false}
            />
          ))}
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-primary text-black py-20 text-center relative overflow-hidden">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Ready for a Fresh Look?
        </h2>
        <p className="mb-6 max-w-lg mx-auto">
          Book your appointment today and experience premium grooming like never
          before!
        </p>

        <Link
          to="/booking"
          className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:scale-105 shadow-lg transition"
        >
          Book Now
        </Link>
      </section>
    </div>
  );
};

export default Services;
