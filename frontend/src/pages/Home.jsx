import Hero from "../components/Hero";
import Services from "./Services";
import Gallery from "./Gallery";
import Reviews from "./Reviews";
import NhattyTutorial from "./NhattyTutorial";
import About from "./About";
import Contact from "./Contact";

import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Nhatty The Barber | Best Barber Shop in Ethiopia</title>

        <meta
          name="description"
          content="Nhatty The Barber is a premium barber shop in Ethiopia offering luxury haircuts, skin fades, beard grooming, VIP barber services, and professional modern styles."
        />

        <meta
          name="keywords"
          content="Nhatty The Barber, barber Ethiopia, best barber Addis Ababa, luxury barber shop, skin fade Ethiopia, beard grooming, haircut Ethiopia"
        />

        <meta name="author" content="Nhatty The Barber" />

        <meta name="robots" content="index, follow" />

        {/* CANONICAL */}
        <link rel="canonical" href="https://nhattythebarber.com/" />

        {/* OPEN GRAPH */}
        <meta
          property="og:title"
          content="Nhatty The Barber | Premium Barber Shop Ethiopia"
        />

        <meta
          property="og:description"
          content="Experience premium grooming, modern fades, beard styling, and luxury barber services in Ethiopia."
        />

        <meta
          property="og:image"
          content="https://nhattythebarber.com/logo.jpg"
        />

        <meta property="og:url" content="https://nhattythebarber.com/" />

        <meta property="og:type" content="website" />

        {/* TWITTER */}
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="twitter:title" content="Nhatty The Barber" />

        <meta
          name="twitter:description"
          content="Premium barber experience in Ethiopia with luxury grooming and modern styles."
        />

        <meta
          name="twitter:image"
          content="https://nhattythebarber.com/logo.jpg"
        />
      </Helmet>

      {/* HOME CONTENT */}
      <Hero />

      <Services />

      <Gallery />

      <Reviews />

      <NhattyTutorial />

      <About />

      <Contact />
    </>
  );
};

export default Home;
