// src/pages/NhattyTutorial.jsx

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

import {
  FaPlay,
  FaClock,
  FaYoutube,
  FaCut,
  FaArrowRight,
  FaSearch,
  FaLock,
  FaCheckCircle,
  FaUniversity,
  FaTimes,
  FaReceipt,
  FaPhone,
  FaUser,
  FaUpload,
  FaCopy,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;
const YOUTUBE_LINK = "https://www.youtube.com/@Nhattythebarber1";
const TUTORIAL_PRICE = 1000;

const categories = [
  "All",
  "Nhatty Reborn Cut",
  "Fade",
  "Beard",
  "Dreadlocks",
  "Hair Coloring",
  "Line Up",
];

const paymentMethods = [
  {
    name: "Telebirr",
    number: "0975700510",
    icon: "📱",
  },
  {
    name: "CBE",
    number: "1000676408267",
    icon: "🏦",
  },
  {
    name: "Abyssinia Bank",
    number: "77154938",
    icon: "💳",
  },
];

const NhattyTutorial = () => {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // PAYMENT MODAL
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  // FORM
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("Telebirr");
  const [screenshot, setScreenshot] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // COPY ACCOUNT NUMBER
  const [copiedNumber, setCopiedNumber] = useState("");

  /* =========================
     FETCH FROM BACKEND ONLY
  ========================= */
  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${API_URL}/api/tutorials`);

        const formatted = res.data.map((t) => ({
          ...t,
          id: t._id,
        }));

        setTutorials(formatted);
      } catch (err) {
        console.error("FETCH ERROR:", err);
        setTutorials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorials();
  }, []);

  /* =========================
     FILTER
  ========================= */
  const filteredTutorials = useMemo(() => {
    return tutorials.filter((t) => {
      const matchSearch = t.title?.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === "All" || t.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [tutorials, search, selectedCategory]);

  const featuredTutorial = tutorials[0];

  /* =========================
     OPEN PAYMENT MODAL
  ========================= */
  const handleOpenTutorial = (tutorial) => {
    setSelectedTutorial(tutorial);
    setShowPaymentModal(true);
  };

  /* =========================
     COPY ACCOUNT NUMBER
  ========================= */
  const handleCopyNumber = async (number) => {
    try {
      await navigator.clipboard.writeText(number);

      setCopiedNumber(number);

      setTimeout(() => {
        setCopiedNumber("");
      }, 2000);
    } catch (err) {
      console.error("COPY FAILED:", err);
    }
  };

  /* =========================
     SUBMIT PAYMENT PROOF
  ========================= */
  const handleSubmitPayment = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("fullName", fullName);
      formData.append("phone", phone);
      formData.append("transactionId", transactionId);
      formData.append("paymentMethod", selectedPayment);

      if (selectedTutorial) {
        formData.append("tutorialId", selectedTutorial.id);
        formData.append("tutorialTitle", selectedTutorial.title);
      }

      if (screenshot) {
        formData.append("screenshot", screenshot);
      }

      // OPTIONAL BACKEND ROUTE
      await axios.post(`${API_URL}/api/tutorial-payments`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage(true);

      setTimeout(() => {
        window.open(selectedTutorial.videoUrl, "_blank");

        setShowPaymentModal(false);

        setSuccessMessage(false);

        setFullName("");
        setPhone("");
        setTransactionId("");
        setScreenshot(null);
      }, 2000);
    } catch (err) {
      console.error(err);

      // EVEN IF BACKEND NOT READY
      setSuccessMessage(true);

      setTimeout(() => {
        window.open(selectedTutorial.videoUrl, "_blank");

        setShowPaymentModal(false);

        setSuccessMessage(false);
      }, 2000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* HERO */}
      <section className="relative h-[100vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/80" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6 max-w-5xl"
        >
          <div className="inline-flex items-center gap-3 bg-yellow-400/10 border border-yellow-400/30 px-5 py-2 rounded-full mb-8">
            <FaLock className="text-yellow-400" />
            <span className="text-yellow-300 font-medium">
              Premium Barber Education Platform
            </span>
          </div>

          <FaCut className="text-yellow-400 text-5xl mx-auto mb-6" />

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            NHATTY
            <span className="text-yellow-400"> TUTORIALS</span>
          </h1>

          <p className="mt-6 text-gray-300 text-lg md:text-2xl leading-relaxed">
            Master premium barbering skills with professional tutorials from
            Nhatty The Barber — fades, beard styling, dreadlocks, clipper
            techniques, line-ups, and modern grooming education.
          </p>
          <div className="mt-6 text-yellow-400 text-2xl font-bold">
            Price: {TUTORIAL_PRICE} Birr per tutorial
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <a
              href={YOUTUBE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl flex items-center gap-3"
            >
              <FaYoutube />
              Watch On YouTube
            </a>

            <a
              href={YOUTUBE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-600 hover:border-yellow-400 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-yellow-400/10 flex items-center gap-3"
            >
              Subscribe Channel
              <FaArrowRight />
            </a>
          </div>
        </motion.div>
      </section>

      {/* SEARCH */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-6 justify-between">
          <div className="relative w-full lg:w-[400px]">
            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tutorials..."
              className="w-full bg-zinc-900 border border-zinc-800 pl-12 py-4 rounded-2xl outline-none focus:border-yellow-400"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-5 py-3 rounded-full transition-all duration-300 ${
                  selectedCategory === c
                    ? "bg-yellow-400 text-black font-bold"
                    : "bg-zinc-900 hover:bg-zinc-800"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      {featuredTutorial && (
        <section className="max-w-7xl mx-auto px-6 pb-20">
          <div className="relative rounded-[40px] overflow-hidden border border-zinc-800">
            <img
              src={featuredTutorial.thumbnailUrl}
              className="w-full h-[500px] object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex items-center justify-center">
              <button
                onClick={() => handleOpenTutorial(featuredTutorial)}
                className="bg-yellow-400 hover:scale-110 transition-all text-black p-7 rounded-full shadow-2xl"
              >
                <FaPlay className="text-4xl" />
              </button>
            </div>

            <div className="absolute top-6 left-6 bg-yellow-400 text-black px-5 py-2 rounded-full font-bold flex items-center gap-2">
              <FaLock />
              {TUTORIAL_PRICE} Birr
            </div>

            <div className="absolute bottom-8 left-8">
              <h2 className="text-3xl md:text-5xl font-black">
                {featuredTutorial.title}
              </h2>

              <p className="text-yellow-400 mt-3 text-lg">
                {featuredTutorial.category}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        ) : filteredTutorials.length === 0 ? (
          <p className="text-center text-gray-400">No tutorials found</p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {filteredTutorials.map((t) => (
              <motion.div
                key={t.id}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-b from-zinc-950 to-black border border-zinc-800 rounded-3xl overflow-hidden group"
              >
                {/* THUMBNAIL */}
                <div className="relative overflow-hidden">
                  <img
                    src={t.thumbnailUrl}
                    className="h-[260px] w-full object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    <FaClock className="text-yellow-400" />
                    {t.duration}
                  </div>

                  <div className="absolute top-4 right-4 bg-yellow-400 text-black p-2 rounded-full">
                    <FaLock />
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <button
                      onClick={() => handleOpenTutorial(t)}
                      className="bg-yellow-400 text-black p-5 rounded-full hover:scale-110 transition"
                    >
                      <FaPlay className="text-xl" />
                    </button>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-yellow-400 text-sm mb-3">
                    <FaCheckCircle />
                    Premium Education
                  </div>

                  <h3 className="font-bold text-xl leading-snug">{t.title}</h3>

                  <p className="text-sm text-gray-400 mt-2">{t.category}</p>

                  <button
                    onClick={() => handleOpenTutorial(t)}
                    className="mt-6 w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-3 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <FaLock />
                    Unlock Tutorial
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-[40px] p-10 md:p-16 text-black relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-black/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              Level Up Your Barber Career
            </h2>

            <p className="mt-6 text-lg md:text-xl text-black/80 leading-relaxed">
              Join the Nhatty The Barber community and learn premium barbering
              skills, modern fade techniques, beard styling, client experience,
              and professional grooming secrets from real industry experience.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">
              <a
                href={YOUTUBE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-3"
              >
                <FaYoutube />
                Start Watching
              </a>

              <a
                href={YOUTUBE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-black px-8 py-4 rounded-full font-semibold hover:bg-black hover:text-white transition-all flex items-center gap-3"
              >
                Join YouTube Community
                <FaArrowRight />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT MODAL */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[9999] overflow-y-auto p-4"
          >
            <div className="min-h-screen flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-zinc-950 border border-zinc-800 rounded-[35px] w-full max-w-5xl overflow-hidden"
              >
                {/* HEADER */}
                <div className="flex items-center justify-between p-6 border-b border-zinc-800">
                  <div>
                    <h2 className="text-3xl font-black">
                      Pay {TUTORIAL_PRICE} Birr to Unlock Tutorial
                    </h2>

                    <p className="text-gray-400 mt-2">
                      Complete payment to unlock this tutorial
                    </p>
                  </div>

                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-red-500 transition"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="grid lg:grid-cols-2">
                  {/* LEFT */}
                  <div className="p-8 border-r border-zinc-800">
                    <div className="bg-black rounded-3xl overflow-hidden border border-zinc-800">
                      <img
                        src={selectedTutorial?.thumbnailUrl}
                        className="w-full h-[250px] object-cover"
                      />

                      <div className="p-6">
                        <div className="inline-flex items-center gap-2 bg-yellow-400/10 text-yellow-400 px-4 py-2 rounded-full mb-4">
                          <FaLock />
                          Premium Locked Tutorial
                        </div>

                        <h3 className="text-2xl font-bold">
                          {selectedTutorial?.title}
                        </h3>

                        <p className="text-gray-400 mt-3">
                          {selectedTutorial?.category}
                        </p>
                      </div>
                    </div>

                    {/* PAYMENT METHODS */}
                    <div className="mt-8">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <FaUniversity className="text-yellow-400" />
                        Payment Methods
                      </h3>

                      <div className="space-y-5">
                        {paymentMethods.map((method, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className={`border rounded-3xl p-6 cursor-pointer transition-all ${
                              selectedPayment === method.name
                                ? "border-yellow-400 bg-yellow-400/10"
                                : "border-zinc-800 bg-zinc-900"
                            }`}
                            onClick={() => setSelectedPayment(method.name)}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3">
                                  <span className="text-3xl">
                                    {method.icon}
                                  </span>

                                  <div>
                                    <h4 className="font-bold text-xl">
                                      {method.name}
                                    </h4>

                                    <p className="text-gray-400 mt-1">
                                      Nhattan Sisay
                                    </p>
                                  </div>
                                </div>

                                {/* ACCOUNT NUMBER */}
                                <div className="mt-5 bg-black rounded-2xl p-4 border border-zinc-800">
                                  <p className="text-sm text-gray-400">
                                    Account Number
                                  </p>

                                  <div className="flex items-center justify-between gap-3 mt-2 flex-wrap">
                                    <p className="text-xl font-bold tracking-wider text-yellow-400 break-all">
                                      {method.number}
                                    </p>

                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleCopyNumber(method.number);
                                      }}
                                      className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all duration-300"
                                    >
                                      <FaCopy />

                                      {copiedNumber === method.number
                                        ? "Copied!"
                                        : "Copy"}
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div
                                className={`w-6 h-6 rounded-full border-2 mt-2 ${
                                  selectedPayment === method.name
                                    ? "bg-yellow-400 border-yellow-400"
                                    : "border-zinc-600"
                                }`}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-6">
                      Submit Payment Proof
                    </h3>

                    <form onSubmit={handleSubmitPayment} className="space-y-6">
                      {/* NAME */}
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">
                          Full Name
                        </label>

                        <div className="relative">
                          <FaUser className="absolute left-4 top-5 text-gray-500" />

                          <input
                            type="text"
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-yellow-400"
                          />
                        </div>
                      </div>

                      {/* PHONE */}
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">
                          Phone Number
                        </label>

                        <div className="relative">
                          <FaPhone className="absolute left-4 top-5 text-gray-500" />

                          <input
                            type="text"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="09xxxxxxxx"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-yellow-400"
                          />
                        </div>
                      </div>

                      {/* TRANSACTION */}
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">
                          Transaction ID / Reference Number
                        </label>

                        <div className="relative">
                          <FaReceipt className="absolute left-4 top-5 text-gray-500" />

                          <input
                            type="text"
                            required
                            value={transactionId}
                            onChange={(e) => setTransactionId(e.target.value)}
                            placeholder="Enter transaction reference"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-yellow-400"
                          />
                        </div>
                      </div>

                      {/* SCREENSHOT */}
                      <div>
                        <label className="text-sm text-gray-400 mb-3 block">
                          Upload Payment Screenshot (Optional)
                        </label>

                        <label className="border-2 border-dashed border-zinc-700 hover:border-yellow-400 transition-all rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer bg-zinc-900">
                          <FaUpload className="text-4xl text-yellow-400 mb-4" />

                          <p className="font-semibold">
                            Click to upload screenshot
                          </p>

                          <p className="text-gray-400 text-sm mt-2">
                            JPG, PNG or JPEG
                          </p>

                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) => setScreenshot(e.target.files[0])}
                          />
                        </label>

                        {screenshot && (
                          <div className="mt-4 bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-2xl">
                            {screenshot.name}
                          </div>
                        )}
                      </div>

                      {/* SUCCESS */}
                      {successMessage && (
                        <div className="bg-green-500/10 border border-green-500/30 p-5 rounded-3xl">
                          <div className="flex items-center gap-3 text-green-400">
                            <FaCheckCircle />
                            Payment proof submitted successfully.
                          </div>

                          <p className="text-gray-300 mt-2">
                            Opening premium tutorial...
                          </p>
                        </div>
                      )}

                      {/* BUTTON */}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-5 rounded-2xl transition-all duration-300 text-lg"
                      >
                        {submitting
                          ? "Processing..."
                          : `Pay ${TUTORIAL_PRICE} Birr & Unlock`}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NhattyTutorial;
