// src/pages/NhattyRegistration.jsx

import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUser,
  FaPhone,
  FaVenusMars,
  FaBirthdayCake,
  FaGlobeAfrica,
  FaCheckCircle,
  FaCut,
  FaArrowRight,
} from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const NhattyRegistration = () => {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    sex: "",
    age: "",
    studentType: "Local Ethiopia",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await axios.post(`${API_URL}/api/register`, form);

      setSuccess(true);

      setForm({
        name: "",
        phone: "",
        sex: "",
        age: "",
        studentType: "Local Ethiopia",
      });

      setTimeout(() => {
        setSuccess(false);
        setStep(1);
      }, 2500);
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10 pt-28">
      <div className="w-full max-w-5xl">
        <AnimatePresence mode="wait">
          {/* ================= LANDING ================= */}
          {step === 1 && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              {/* LEFT TEXT */}
              <div>
                <div className="flex items-center gap-3 text-yellow-400 mb-4">
                  <FaCut className="text-3xl" />
                  <span className="font-semibold tracking-wider">
                    NHATTY BARBER TUTORIALS
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-black leading-tight">
                  Learn <span className="text-yellow-400">Professional</span>
                  <br />
                  Barber Skills
                </h1>

                <p className="text-gray-400 mt-6 text-lg leading-relaxed">
                  Master fades, beard grooming, modern cuts, line-ups and
                  advanced barber techniques from real industry experience.
                  Built for both{" "}
                  <span className="text-white">local Ethiopia</span> and
                  <span className="text-white"> diaspora students</span>.
                </p>

                <button
                  onClick={() => setStep(2)}
                  className="mt-8 bg-yellow-400 hover:bg-yellow-300 text-black font-black px-8 py-4 rounded-2xl flex items-center gap-3 transition"
                >
                  Register Now <FaArrowRight />
                </button>
              </div>

              {/* RIGHT CARD */}
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-2xl">
                <div className="space-y-5">
                  <div className="bg-black border border-zinc-800 p-5 rounded-2xl">
                    🔥 Premium Video Tutorials
                  </div>

                  <div className="bg-black border border-zinc-800 p-5 rounded-2xl">
                    ✂️ Real Barber Techniques
                  </div>

                  <div className="bg-black border border-zinc-800 p-5 rounded-2xl">
                    🌍 Learn Anywhere Anytime
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ================= FORM ================= */}
          {step === 2 && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="w-full"
            >
              <div className="max-w-2xl mx-auto bg-zinc-950 border border-zinc-800 rounded-3xl p-5 md:p-10 shadow-2xl">
                {/* HEADER */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-black">
                    Student{" "}
                    <span className="text-yellow-400">Registration</span>
                  </h2>
                  <p className="text-gray-400 mt-2 text-sm md:text-base">
                    Fill your details to join Nhatty Barber Tutorials
                  </p>
                </div>

                {/* SUCCESS */}
                {success && (
                  <div className="mb-4 bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-2xl flex items-center gap-3 text-sm">
                    <FaCheckCircle />
                    Registration successful!
                  </div>
                )}

                {/* ERROR */}
                {error && (
                  <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-2xl text-sm">
                    {error}
                  </div>
                )}

                {/* FORM */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* GRID INPUTS */}
                  <div className="grid md:grid-cols-2 gap-5">
                    <Input
                      icon={<FaUser />}
                      name="name"
                      placeholder="Full Name"
                      form={form}
                      handleChange={handleChange}
                    />
                    <Input
                      icon={<FaPhone />}
                      name="phone"
                      placeholder="Phone Number"
                      form={form}
                      handleChange={handleChange}
                    />
                    <Input
                      icon={<FaBirthdayCake />}
                      name="age"
                      placeholder="Age"
                      type="number"
                      form={form}
                      handleChange={handleChange}
                    />

                    {/* SEX */}
                    <div className="relative">
                      <FaVenusMars className="absolute left-4 top-4 text-gray-500" />
                      <select
                        name="sex"
                        value={form.sex}
                        onChange={handleChange}
                        className="w-full bg-black border border-zinc-800 rounded-2xl pl-12 py-4 focus:border-yellow-400 outline-none"
                        required
                      >
                        <option value="">Select Sex</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* STUDENT TYPE */}
                  <div className="relative">
                    <FaGlobeAfrica className="absolute left-4 top-4 text-gray-500" />
                    <select
                      name="studentType"
                      value={form.studentType}
                      onChange={handleChange}
                      className="w-full bg-black border border-zinc-800 rounded-2xl pl-12 py-4 focus:border-yellow-400 outline-none"
                    >
                      <option>Local Ethiopia</option>
                      <option>Diaspora</option>
                    </select>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex flex-col md:flex-row gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full border border-zinc-700 py-4 rounded-2xl hover:bg-zinc-900 transition"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-black py-4 rounded-2xl transition"
                    >
                      {loading ? "Registering..." : "Complete Registration"}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ================= INPUT COMPONENT ================= */
const Input = ({
  icon,
  name,
  placeholder,
  form,
  handleChange,
  type = "text",
}) => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-4 text-gray-500">{icon}</div>
      <input
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        placeholder={placeholder}
        required
        className="w-full bg-black border border-zinc-800 rounded-2xl pl-12 py-4 focus:border-yellow-400 outline-none text-sm md:text-base"
      />
    </div>
  );
};

export default NhattyRegistration;
