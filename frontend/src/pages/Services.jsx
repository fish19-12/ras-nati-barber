import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCut, FaUserTie, FaFire, FaSpa } from "react-icons/fa";

const services = [
  {
    title: "Haircut",
    price: "R100",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a",
    icon: <FaCut className="text-primary" />,
  },
  {
    title: "Shaving",
    price: "R50",
    image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70",
    icon: <FaUserTie className="text-primary" />,
  },
  {
    title: "Beard Trim",
    price: "R60",
    image: "https://images.unsplash.com/photo-1612197520061-cc66b7e8f4f0",
    icon: <FaUserTie className="text-primary" />,
  },
  {
    title: "Hairstyle / Styling",
    price: "R120",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
    icon: <FaFire className="text-primary" />,
  },
  {
    title: "Massage / Head Massage",
    price: "R80",
    image: "https://images.unsplash.com/photo-1618237754827-6f7473b93b25",
    icon: <FaSpa className="text-primary" />,
  },
  {
    title: "Hair / Scalp Treatment",
    price: "R150",
    image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033",
    icon: <FaSpa className="text-primary" />,
  },
];

const ServiceCard = ({ title, price, image }) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.05 }}
    className="bg-black/60 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden cursor-pointer shadow-lg"
  >
    <img src={image} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6 text-center">
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-primary font-semibold mb-4">{price}</p>
      <Link
        to="/booking"
        className="bg-primary text-black px-6 py-2 rounded-lg font-semibold hover:scale-105 transition"
      >
        Book Now
      </Link>
    </div>
  </motion.div>
);

const Services = () => {
  return (
    <div>
      {/* Page Hero */}
      <section className="bg-black py-24 text-center border-b border-gray-800">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-display mb-4"
        >
          Our Services
        </motion.h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Experience professional barber services with premium grooming,
          precision cuts, and modern styles.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              price={service.price}
              image={service.image}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-black py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready for a Fresh Look?</h2>
        <p className="mb-6">
          Book your appointment today and enjoy a premium grooming experience!
        </p>

        <Link
          to="/booking"
          className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          Book Now
        </Link>
      </section>
    </div>
  );
};

export default Services;
