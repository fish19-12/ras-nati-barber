import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "./Services";
import Gallery from "./Gallery";
import Reviews from "./Reviews";
import About from "./About";
import Contact from "./Contact";
import NhattyTutorial from "./NhattyTutorial";

const Home = () => {
  return (
    <div>
      <Hero />
      <Services />
      <Gallery />
      <Reviews />
      <NhattyTutorial />
      <About />
    </div>
  );
};

export default Home;
