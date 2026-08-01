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

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import NhattyTutorial from "./pages/NhattyTutorial";

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

function App() {
  return (
    <Router>
      <div
        className="

relative

min-h-screen

bg-black

text-white

overflow-x-hidden

"
      >
        <ScrollToTop />

        <Navbar />

        <main
          className="

min-h-screen

pb-24

"
        >
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />} />

            <Route path="/services" element={<Services />} />

            <Route path="/gallery" element={<Gallery />} />

            <Route path="/reviews" element={<Reviews />} />

            <Route path="/booking" element={<Booking />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/tutorial" element={<NhattyTutorial />} />

            <Route
              path="*"
              element={
                <div
                  className="

min-h-screen

flex

items-center

justify-center

bg-black

text-center

px-6

"
                >
                  <div>
                    <h1
                      className="

text-7xl

font-black

text-yellow-400

"
                    >
                      404
                    </h1>

                    <p
                      className="

mt-5

text-2xl

font-bold

"
                    >
                      Page Not Found
                    </p>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>

        <Footer />

        <NatiAIChat />
      </div>
    </Router>
  );
}

export default App;
