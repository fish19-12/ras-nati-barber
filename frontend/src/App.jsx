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

import Home from "./pages/Home";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import About from "./pages/About";

/* Scroll to top on page change */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* WhatsApp Floating Icon above bottom nav */
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/251912345678"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-32 right-6 w-16 h-16 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl z-50 transition-transform duration-300 hover:scale-110 animate-pulse"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />

      <main className="min-h-screen pb-24">
        {" "}
        {/* padding-bottom prevents footer overlap */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppButton />
    </Router>
  );
}

export default App;
