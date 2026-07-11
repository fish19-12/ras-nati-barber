import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NatiAIChat from "./components/NatiAIChat";

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

        {/* Nati AI */}
        <NatiAIChat />
      </div>
    </Router>
  );
}

export default App;
