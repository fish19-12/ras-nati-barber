import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "./Services";
import Gallery from "./Gallery";
import Reviews from "./Reviews";
import About from "./About";
import Contact from "./Contact";

const Home = () => {
  return (
    <div>
      <Hero />
      <Gallery />
      <Services />
      <Reviews />
      <About />
      <Contact />
    </div>
  );
};

export default Home;
