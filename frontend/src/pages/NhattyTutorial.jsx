// src/pages/NhattyTutorial.jsx

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaCut,
  FaSearch,
  FaLock,
  FaCheckCircle,
  FaTimes,
  FaGraduationCap,
  FaBell,
  FaRocket,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const categories = ["All", "Fade", "Beard", "Dreadlocks", "Line Up"];

/* ================= TOAST ================= */
const Toast = ({ message }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 30 }}
    className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-6 py-4 rounded-2xl font-bold shadow-2xl z-[99999] max-w-[90%] text-center"
  >
    {message}
  </motion.div>
);

const NhattyTutorial = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [isRegistered, setIsRegistered] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [toast, setToast] = useState("");

  // ✅ MODERN FORM STATE
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    experience: "",
    skillLevel: "",
  });

  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/tutorials`);
        setTutorials(res.data.map((t) => ({ ...t, id: t._id })));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorials();
  }, []);

  const filtered = useMemo(() => {
    return tutorials.filter((t) => {
      const matchSearch = t.title?.toLowerCase().includes(search.toLowerCase());

      const matchCat =
        selectedCategory === "All" || t.category === selectedCategory;

      return matchSearch && matchCat;
    });
  }, [tutorials, search, selectedCategory]);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setRegistering(true);

      await axios.post(`${API_URL}/api/tutorial-register`, form);

      setIsRegistered(true);
      setShowRegisterModal(false);

      setToast(
        "🎉 Thanks for registering for Nhatty Barber Tutorials! We will contact you when the tutorials start soon.",
      );

      setTimeout(() => setToast(""), 5000);

      setForm({
        name: "",
        phone: "",
        email: "",
        location: "",
        experience: "",
        skillLevel: "",
      });
    } catch (err) {
      console.log(err);

      setIsRegistered(true);
      setShowRegisterModal(false);

      setToast(
        "🎉 Registration successful! We will contact you when tutorials launch soon.",
      );

      setTimeout(() => setToast(""), 5000);
    } finally {
      setRegistering(false);
    }
  };

  const handleOpen = () => {
    if (!isRegistered) {
      setShowRegisterModal(true);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex items-center justify-center px-4 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/85" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 px-5 py-2 rounded-full border border-yellow-400/30">
            <FaBell className="text-yellow-400" />
            <span className="text-yellow-300 text-sm md:text-base">
              Premium Barber Academy • Launching Soon 🚀
            </span>
          </div>

          <FaCut className="text-yellow-400 text-5xl mx-auto mt-6" />

          <h1 className="text-4xl md:text-7xl font-black mt-4">
            NHATTY <span className="text-yellow-400">TUTORIALS</span>
          </h1>

          <p className="mt-6 text-gray-300 text-base md:text-xl">
            Master professional barber skills — fades, beard styling,
            dreadlocks, line-ups & modern grooming techniques ✂️
          </p>

          <p className="mt-4 text-yellow-400 font-semibold">
            📢 Registration required before access
          </p>

          <button
            onClick={() => setShowRegisterModal(true)}
            className="mt-8 bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition"
          >
            <FaRocket className="inline mr-2" />
            Join Waiting List
          </button>

          {/* INFO */}
          <div className="grid md:grid-cols-3 gap-4 mt-10 text-left">
            {[
              "Beginner → Advanced structured learning",
              "Real barbershop techniques",
              "Early access before public launch",
            ].map((t, i) => (
              <div
                key={i}
                className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-2xl"
              >
                <FaCheckCircle className="text-yellow-400 mb-2" />
                {t}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= INFO ================= */}
      <section className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-black">
          Professional Barber Education System ✂️
        </h2>

        <p className="mt-6 text-gray-400 leading-relaxed">
          This academy is built for barbers who want to level up real-world
          skills used in modern barbershops. Each lesson is structured,
          practical, and focused on precision and client satisfaction.
        </p>

        <div className="mt-10 text-yellow-400 font-bold text-lg md:text-xl">
          🚧 Content is being prepared — launching very soon
        </div>
      </section>

      {/* ================= SEARCH ================= */}
      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tutorials..."
            className="w-full md:w-[400px] bg-zinc-900 border border-zinc-800 px-4 py-4 rounded-2xl"
          />

          <div className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === c
                    ? "bg-yellow-400 text-black font-bold"
                    : "bg-zinc-900"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GRID ================= */}
      <section className="max-w-6xl mx-auto px-4 pb-28">
        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ y: -8 }}
                className="bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={t.thumbnailUrl}
                    className="h-52 w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <FaLock className="text-yellow-400 text-2xl" />
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-lg">{t.title}</h3>
                  <p className="text-gray-400 text-sm">{t.category}</p>

                  <button
                    onClick={handleOpen}
                    className="mt-4 w-full bg-yellow-400 text-black py-3 rounded-2xl font-bold"
                  >
                    Coming Soon 🔒
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ================= REGISTER MODAL ================= */}
      <AnimatePresence>
        {showRegisterModal && (
          <motion.div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-[9999]">
            <motion.div className="bg-zinc-950 border border-zinc-800 w-full max-w-2xl rounded-3xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                  <FaGraduationCap className="text-yellow-400" />
                  Join Barber Academy Waiting List
                </h2>

                <button onClick={() => setShowRegisterModal(false)}>
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <input
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-4 bg-zinc-900 rounded-2xl"
                />

                <input
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full p-4 bg-zinc-900 rounded-2xl"
                />

                <input
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full p-4 bg-zinc-900 rounded-2xl"
                />

                <input
                  placeholder="Location (City / Country)"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  className="w-full p-4 bg-zinc-900 rounded-2xl"
                />

                {/* EXPERIENCE SELECT */}
                <select
                  value={form.experience}
                  onChange={(e) =>
                    setForm({ ...form, experience: e.target.value })
                  }
                  className="w-full p-4 bg-zinc-900 rounded-2xl"
                >
                  <option value="">Select Experience Level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="professional">Professional Barber</option>
                </select>

                {/* SKILL LEVEL SELECT */}
                <select
                  value={form.skillLevel}
                  onChange={(e) =>
                    setForm({ ...form, skillLevel: e.target.value })
                  }
                  className="w-full p-4 bg-zinc-900 rounded-2xl"
                >
                  <option value="">How did you learn?</option>
                  <option value="self-taught">Self Taught</option>
                  <option value="barber-school">Barber School</option>
                  <option value="apprentice">Apprentice</option>
                  <option value="working-barber">Working Barber</option>
                </select>

                <button
                  disabled={registering}
                  className="w-full bg-yellow-400 text-black py-4 rounded-2xl font-bold"
                >
                  {registering ? "Registering..." : " Register Now 🚀"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= TOAST ================= */}
      <AnimatePresence>{toast && <Toast message={toast} />}</AnimatePresence>
    </div>
  );
};

export default NhattyTutorial;
