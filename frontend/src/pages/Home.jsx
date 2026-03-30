import Hero from "../components/Hero";
import ServiceCard from "../components/ServiceCard";
import GalleryItem from "../components/GalleryItem";
import ReviewCard from "../components/ReviewCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div>
      <Hero />

      {/* Services */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-display text-center mb-14"
        >
          Our Services
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard title="Haircut" price="R100" />
          <ServiceCard title="Beard Trim" price="R60" />
          <ServiceCard title="Hair + Beard" price="R140" />
        </div>

        <div className="text-center mt-10">
          <Link to="/services" className="text-primary text-lg">
            View All Services →
          </Link>
        </div>
      </section>

      {/* About */}
      <section className="bg-card py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-display mb-6">
              About Ras Nati Barber
            </h2>
            <p className="text-gray-300 mb-6">
              Ras Nati Barber Shop is a modern barbershop offering professional
              haircuts, beard grooming, hair styling, and premium grooming
              services. We focus on quality, cleanliness, and customer
              satisfaction.
            </p>
            <Link
              to="/booking"
              className="bg-primary text-black px-6 py-3 rounded-lg font-semibold"
            >
              Book Appointment
            </Link>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1503951458645-643d53d2196f"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-display text-center mb-14">Gallery</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <GalleryItem image="https://images.unsplash.com/photo-1621605815971-fbc98d665033" />
          <GalleryItem image="https://images.unsplash.com/photo-1585747860715-2ba37e788b70" />
          <GalleryItem image="https://images.unsplash.com/photo-1599351431202-1e0f0137899a" />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-card py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-display mb-14">Why Choose Us</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-black p-6 rounded-2xl">
              <h3 className="text-primary text-xl mb-2">Professional</h3>
              <p className="text-gray-400">Experienced barber services</p>
            </div>

            <div className="bg-black p-6 rounded-2xl">
              <h3 className="text-primary text-xl mb-2">Clean</h3>
              <p className="text-gray-400">Clean tools & environment</p>
            </div>

            <div className="bg-black p-6 rounded-2xl">
              <h3 className="text-primary text-xl mb-2">Affordable</h3>
              <p className="text-gray-400">Best prices for quality</p>
            </div>

            <div className="bg-black p-6 rounded-2xl">
              <h3 className="text-primary text-xl mb-2">Modern Style</h3>
              <p className="text-gray-400">Latest haircut styles</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-display text-center mb-14">
          Customer Reviews
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <ReviewCard />
          <ReviewCard />
          <ReviewCard />
        </div>
      </section>
    </div>
  );
};

export default Home;
