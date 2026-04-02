import { useState } from "react";
import { FaCopy, FaCheck } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const servicesList = [
  { name: "Haircut", desc: "Clean & modern cut" },
  { name: "Shaving", desc: "Hot towel shave" },
  { name: "Trimming", desc: "Beard & line up" },
  { name: "Styling", desc: "Professional look" },
  { name: "Treatment", desc: "Hair care & massage" },
  { name: "VIP", desc: "Full premium package" },
];

const timeOptions = [
  "Morning (2:00 - 6:00)",
  "Midday (6:00 - 9:00)",
  "Afternoon (9:00 - 12:00)",
  "Evening (12:00 - 2:00)",
];

const Booking = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [paymentPhoto, setPaymentPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const copyNumber = () => {
    navigator.clipboard.writeText("0976854326");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !phone ||
      selectedServices.length === 0 ||
      !selectedDate ||
      !selectedTime
    ) {
      return toast.error("Please fill all required fields!");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("services", JSON.stringify(selectedServices));
    formData.append("date", selectedDate);
    formData.append("time", selectedTime);
    if (paymentPhoto) formData.append("paymentPhoto", paymentPhoto);
    formData.append("message", message);

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      toast.success("Booking confirmed!");

      // Reset form
      setName("");
      setPhone("");
      setSelectedServices([]);
      setSelectedDate("");
      setSelectedTime("");
      setPaymentPhoto(null);
      setPhotoPreview(null);
      setMessage("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create booking!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen px-4 py-16 md:py-24">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 to-primary bg-clip-text text-transparent">
          Book Appointment
        </h1>
        <p className="text-gray-400 mt-3">Fast and simple booking experience</p>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
        {/* PAYMENT */}
        <div className="bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10">
          <h2 className="text-xl font-semibold text-yellow-400 mb-6">
            Payment Details
          </h2>

          <div className="space-y-5">
            <div className="flex justify-between">
              <span className="text-gray-400">Amount</span>
              <span className="font-bold text-xl">1000 Birr</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Name</span>
              <span>Nati</span>
            </div>

            <div>
              <p className="text-gray-400 mb-2">Telebirr</p>
              <div className="flex justify-between items-center bg-black px-4 py-3 rounded-xl border border-white/20">
                <span>0976854326</span>
                <button onClick={copyNumber}>
                  {copied ? <FaCheck className="text-green-400" /> : <FaCopy />}
                </button>
              </div>
            </div>

            <div className="text-sm text-gray-400 border-t border-white/10 pt-4">
              <p>• Send deposit</p>
              <p>• Take screenshot</p>
              <p>• Upload below</p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-white/5 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10">
          {/* NAME + PHONE */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Full Name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* DATE */}
          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-2 block">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="input"
            />
          </div>

          {/* TIME */}
          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-2 block">
              Preferred Time
            </label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="input"
            >
              <option value="">Select time</option>
              {timeOptions.map((time, i) => (
                <option key={i} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>

          {/* SERVICES */}
          <h3 className="text-sm text-gray-300 mb-3">Choose Services</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {servicesList.map((service, i) => (
              <div
                key={i}
                onClick={() => toggleService(service.name)}
                className={`p-4 rounded-2xl cursor-pointer border transition ${
                  selectedServices.includes(service.name)
                    ? "bg-primary text-black border-primary scale-105"
                    : "bg-black/40 border-white/10 hover:border-primary"
                }`}
              >
                <h4 className="font-semibold text-sm">{service.name}</h4>
                <p className="text-xs opacity-70">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* PAYMENT PHOTO */}
          <div className="mb-6">
            <label className="text-sm text-gray-400">Payment Screenshot</label>
            <input
              type="file"
              className="w-full mt-2 text-sm text-gray-400"
              onChange={handleFileChange}
            />
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                className="mt-2 w-full h-40 object-cover rounded-xl"
              />
            )}
          </div>

          {/* MESSAGE */}
          <div className="mb-6">
            <textarea
              placeholder="Message (optional)"
              className="input resize-none h-24"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-full bg-gradient-to-r from-yellow-400 to-primary text-black font-bold hover:scale-105 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Confirm Booking"}
          </button>
        </div>
      </div>

      {/* INPUT STYLE */}
      <style>
        {`
        .input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 12px;
          background: black;
          border: 1px solid rgba(255,255,255,0.2);
          outline: none;
        }
        .input:focus {
          border-color: #facc15;
        }
        `}
      </style>
    </div>
  );
};

export default Booking;
