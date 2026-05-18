import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/* PAGES */
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import NhattyTutorial from "./pages/NhattyTutorial";

/* ---------------- SCROLL TO TOP ---------------- */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

/* ---------------- WHATSAPP BUTTON ---------------- */
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/251912345678"
      target="_blank"
      rel="noopener noreferrer"
      title="Chat on WhatsApp"
      className="
        fixed
        bottom-28
        md:bottom-8
        right-5
        md:right-8
        w-16
        h-16
        flex
        items-center
        justify-center
        rounded-full
        bg-green-500
        hover:bg-green-600
        text-white
        shadow-[0_10px_40px_rgba(0,0,0,0.4)]
        z-[999]
        transition-all
        duration-300
        hover:scale-110
        animate-pulse
      "
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
}

/* ---------------- APP ---------------- */
function App() {
  return (
    <Router>
      <div className="bg-black text-white overflow-x-hidden">
        <ScrollToTop />

        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT */}
        <main className="min-h-screen pb-24">
          <Routes>
            {/* HOME */}
            <Route path="/" element={<Home />} />

            {/* ABOUT */}
            <Route path="/about" element={<About />} />

            {/* SERVICES */}
            <Route path="/services" element={<Services />} />

            {/* GALLERY */}
            <Route path="/gallery" element={<Gallery />} />

            {/* REVIEWS */}
            <Route path="/reviews" element={<Reviews />} />

            {/* BOOKING */}
            <Route path="/booking" element={<Booking />} />

            {/* CONTACT */}
            <Route path="/contact" element={<Contact />} />

            {/* NHATTY TUTORIAL */}
            <Route path="/tutorial" element={<NhattyTutorial />} />

            {/* 404 PAGE */}
            <Route
              path="*"
              element={
                <div className="h-screen flex flex-col items-center justify-center px-6 text-center bg-black">
                  <h1 className="text-7xl md:text-9xl font-black text-yellow-400">
                    404
                  </h1>

                  <p className="mt-6 text-2xl md:text-3xl font-bold">
                    Page Not Found
                  </p>

                  <p className="mt-4 text-gray-400 max-w-xl">
                    The page you are looking for does not exist or has been
                    moved.
                  </p>

                  <a
                    href="/"
                    className="
                      mt-10
                      bg-yellow-400
                      hover:bg-yellow-300
                      text-black
                      px-8
                      py-4
                      rounded-full
                      font-bold
                      transition-all
                      duration-300
                      hover:scale-105
                    "
                  >
                    Back To Home
                  </a>
                </div>
              }
            />
          </Routes>
        </main>

        {/* FOOTER */}
        <Footer />

        {/* WHATSAPP */}
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
