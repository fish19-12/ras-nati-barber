import { useState } from "react";
import {
  FaCopy,
  FaCheck,
  FaCrown,
  FaGem,
  FaMagic,
  FaCar,
  FaCity,
  FaClock,
} from "react-icons/fa";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const servicesList = [
  {
    name: "VIP Service",
    desc: "Premium Grooming Experience",
    icon: <FaCrown />,
    color: "from-yellow-400 to-amber-600",
  },

  {
    name: "VVIP Service",
    desc: "Luxury Elite Service",
    icon: <FaGem />,
    color: "from-purple-500 to-pink-500",
  },

  {
    name: "Nhatty Reborn",
    desc: "Complete Transformation",
    icon: <FaMagic />,
    color: "from-red-500 to-orange-500",
  },

  {
    name: "Outdoor",
    desc: "Service At Your Home",
    icon: <FaCar />,
    color: "from-green-500 to-emerald-600",
  },

  {
    name: "City To City",
    desc: "Travel Grooming Service",
    icon: <FaCity />,
    color: "from-blue-500 to-cyan-500",
  },
];

// INDIVIDUAL TIME LIST
const timePeriods = [
  {
    label: "Morning",
    times: [
      "12:00 AM",
      "1:00 AM",
      "2:00 AM",
      "3:00 AM",
      "4:00 AM",
      "5:00 AM",
      "6:00 AM",
    ],
  },

  {
    label: "Afternoon",
    times: ["8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM", "12:00 PM"],
  },

  {
    label: "Evening",
    times: ["7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"],
  },
];

const Booking = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  // ONLY ONE SERVICE
  const [selectedService, setSelectedService] = useState("");

  const [selectedDate, setSelectedDate] = useState("");

  // TIME STATES
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const [outdoorAddress, setOutdoorAddress] = useState("");

  const [cityLocation, setCityLocation] = useState("");
  const [cityNeedDate, setCityNeedDate] = useState("");

  const [paymentPhoto, setPaymentPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const [message, setMessage] = useState("");

  const [copied, setCopied] = useState("");

  const [loading, setLoading] = useState(false);

  // SUCCESS POPUP
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [bookingInfo, setBookingInfo] = useState({
    customer: "",
    date: "",
    time: "",
    service: "",
  });

  // SELECT ONLY ONE SERVICE
  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  // COPY NUMBER
  const copyNumber = (number) => {
    navigator.clipboard.writeText(number);

    setCopied(number);

    toast.success("Copied!");

    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  // IMAGE COMPRESS FUNCTION
  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = (event) => {
        const img = new Image();

        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");

          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;

          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              const compressedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });

              resolve(compressedFile);
            },
            "image/jpeg",
            0.7,
          );
        };
      };
    });
  };

  // FILE
  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      toast.info("Compressing image...");

      const compressedImage = await compressImage(file);

      setPaymentPhoto(compressedImage);

      setPhotoPreview(URL.createObjectURL(compressedImage));

      toast.success("Image optimized successfully!");
    }
  };

  // GET TIMES
  const getFilteredTimes = () => {
    const foundPeriod = timePeriods.find(
      (period) => period.label === selectedPeriod,
    );

    return foundPeriod ? foundPeriod.times : [];
  };

  // SUBMIT
  const handleSubmit = async () => {
    if (!name || !phone || !selectedService || !selectedDate || !selectedTime) {
      return toast.error("Please fill all required fields!");
    }

    // OUTDOOR VALIDATION
    if (selectedService === "Outdoor" && !outdoorAddress) {
      return toast.error("Please enter customer home address!");
    }

    // CITY VALIDATION
    if (
      selectedService === "City To City" &&
      (!cityLocation || !cityNeedDate)
    ) {
      return toast.error("Please complete city-to-city details!");
    }

    const formData = new FormData();

    formData.append("name", name);
    formData.append("phone", phone);

    // ONLY ONE SERVICE
    formData.append("service", selectedService);

    formData.append("date", selectedDate);

    // SAVE BOTH
    formData.append("timePeriod", selectedPeriod);
    formData.append("time", selectedTime);

    formData.append("outdoorAddress", outdoorAddress);

    formData.append("cityLocation", cityLocation);

    formData.append("cityNeedDate", cityNeedDate);

    formData.append("message", message);

    if (paymentPhoto) {
      formData.append("paymentPhoto", paymentPhoto);
    }

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      // MODERN SUCCESS POPUP
      setBookingInfo({
        customer: name,
        date: selectedDate,
        time: selectedTime,
        service: selectedService,
      });

      setShowSuccessModal(true);

      toast.success("Booking Confirmed!");

      // RESET
      setName("");
      setPhone("");
      setSelectedService("");
      setSelectedDate("");
      setSelectedPeriod("");
      setSelectedTime("");
      setOutdoorAddress("");
      setCityLocation("");
      setCityNeedDate("");
      setPaymentPhoto(null);
      setPhotoPreview(null);
      setMessage("");
    } catch (err) {
      console.error(err);

      toast.error("Booking Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg rounded-[30px] border border-yellow-500/20 bg-[#0d0d0d] p-6 sm:p-8 relative overflow-hidden animate-popup">
            {/* GLOW */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[250px] h-[250px] bg-yellow-500/10 blur-[120px] rounded-full"></div>

            {/* ICON */}
            <div className="relative z-10 flex justify-center mb-5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-black text-3xl shadow-2xl shadow-yellow-500/30">
                ✓
              </div>
            </div>

            {/* TITLE */}
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Booking Confirmed
              </h2>

              <p className="text-gray-400 mt-3 text-sm sm:text-base leading-relaxed">
                Thank you{" "}
                <span className="text-yellow-400 font-semibold">
                  {bookingInfo.customer}
                </span>{" "}
                for booking with{" "}
                <span className="text-white font-semibold">
                  Nhatty The Barber
                </span>
                .
              </p>
            </div>

            {/* BOOKING DETAILS */}
            <div className="relative z-10 mt-6 space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-xs text-gray-400 mb-1">Service</p>

                <h4 className="font-bold text-lg">{bookingInfo.service}</h4>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Date</p>

                  <h4 className="font-bold">{bookingInfo.date}</h4>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <p className="text-xs text-gray-400 mb-1">Time</p>

                  <h4 className="font-bold">{bookingInfo.time}</h4>
                </div>
              </div>

              {/* NOTICE */}
              <div className="rounded-2xl border border-yellow-500/20 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-5">
                <h4 className="text-yellow-400 font-bold mb-2">
                  Important Notice
                </h4>

                <p className="text-sm text-gray-300 leading-relaxed">
                  Please arrive at your scheduled appointment time. If you are
                  delayed by more than{" "}
                  <span className="text-yellow-400 font-semibold">
                    20 minutes
                  </span>
                  , availability may no longer be guaranteed.
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="relative z-10 mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:scale-[1.01] transition-all duration-300"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* BG */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-yellow-500/10 blur-[130px] rounded-full"></div>

      {/* MAIN */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-5 py-6 sm:py-10">
        {/* HEADER */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs mb-4">
            Luxury Booking System
          </div>

          <h1 className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Book Appointment
          </h1>

          <p className="text-gray-400 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
            Premium barber experience with luxury grooming services designed for
            elite clients.
          </p>
        </div>

        {/* LAYOUT */}
        <div className="flex flex-col xl:grid xl:grid-cols-[360px_1fr] gap-5">
          {/* PAYMENT */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 h-fit sticky top-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-yellow-400">Payment</h2>

              <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs">
                Active
              </div>
            </div>

            {/* AMOUNT */}
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/10 rounded-2xl p-5 mb-5">
              <p className="text-gray-400 text-sm mb-2">Required Deposit</p>

              <h3 className="text-4xl font-black text-yellow-400">1000 Birr</h3>
            </div>

            {/* NAME */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-gray-400 text-sm">Account Name</span>

              <span className="font-semibold">Nhattan Sisay</span>
            </div>

            {/* ACCOUNTS */}
            <div className="space-y-3">
              {[
                {
                  label: "Telebirr",
                  number: "0975700510",
                },

                {
                  label: "CBE",
                  number: "1000676408267",
                },

                {
                  label: "Abyssinia Bank",
                  number: "77154938",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-black/40 border border-white/10 rounded-2xl p-4"
                >
                  <p className="text-gray-400 text-xs mb-2">{item.label}</p>

                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-sm truncate">
                      {item.number}
                    </span>

                    <button
                      onClick={() => copyNumber(item.number)}
                      className="min-w-[42px] h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center"
                    >
                      {copied === item.number ? (
                        <FaCheck className="text-green-400 text-sm" />
                      ) : (
                        <FaCopy className="text-sm" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* INFO */}
            <div className="mt-6 pt-5 border-t border-white/10 space-y-2">
              <p className="text-xs text-gray-400">
                • Send the deposit payment
              </p>

              <p className="text-xs text-gray-400">• Take payment screenshot</p>

              <p className="text-xs text-gray-400">
                • Upload screenshot before booking
              </p>
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-7">
            {/* CUSTOMER INFO */}
            <div className="mb-7">
              <h3 className="section-title">Customer Information</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>

            {/* SERVICES */}
            <div className="mb-7">
              <h3 className="section-title">Choose One Service</h3>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {servicesList.map((service, i) => (
                  <div
                    key={i}
                    onClick={() => handleServiceSelect(service.name)}
                    className={`rounded-2xl p-4 cursor-pointer border transition-all duration-300 ${
                      selectedService === service.name
                        ? "border-yellow-400 bg-white/10 scale-[1.02]"
                        : "border-white/10 bg-black/30 hover:bg-white/5"
                    }`}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center text-white text-lg mb-3`}
                    >
                      {service.icon}
                    </div>

                    <h4 className="font-semibold text-sm">{service.name}</h4>

                    <p className="text-xs text-gray-400 mt-1">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* OUTDOOR */}
            {selectedService === "Outdoor" && (
              <div className="mb-7 bg-green-500/5 border border-green-500/20 rounded-2xl p-4">
                <h3 className="text-green-400 font-semibold mb-4">
                  Outdoor Service Details
                </h3>

                <input
                  type="text"
                  placeholder="Customer home address in Addis Abeba"
                  className="input"
                  value={outdoorAddress}
                  onChange={(e) => setOutdoorAddress(e.target.value)}
                />
              </div>
            )}

            {/* CITY TO CITY */}
            {selectedService === "City To City" && (
              <div className="mb-7 bg-blue-500/5 border border-blue-500/20 rounded-2xl p-4">
                <h3 className="text-blue-400 font-semibold mb-4">
                  City To City Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Customer location / city"
                    className="input"
                    value={cityLocation}
                    onChange={(e) => setCityLocation(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* APPOINTMENT */}
            <div className="mb-7">
              <h3 className="section-title">Appointment Schedule</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="label">Select Date</label>

                  <input
                    type="date"
                    className="input"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="label">Select Period</label>

                  <select
                    className="input"
                    value={selectedPeriod}
                    onChange={(e) => {
                      setSelectedPeriod(e.target.value);
                      setSelectedTime("");
                    }}
                  >
                    <option value="">Choose Time Period</option>

                    {timePeriods.map((period, i) => (
                      <option key={i} value={period.label}>
                        {period.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* TIME GRID */}
              {selectedPeriod && (
                <div className="bg-black/30 border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <FaClock className="text-yellow-400" />

                    <h4 className="font-semibold">
                      Select Exact Time ({selectedPeriod})
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {getFilteredTimes().map((time, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-xl text-sm font-medium border transition-all duration-300 ${
                          selectedTime === time
                            ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-yellow-400"
                            : "bg-white/5 border-white/10 hover:border-yellow-400/40 hover:bg-white/10"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                  {selectedTime && (
                    <div className="mt-4 p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
                      <p className="text-sm text-yellow-400 font-semibold">
                        Selected Booking Time:
                      </p>

                      <p className="text-lg font-bold mt-1">
                        {selectedPeriod} - {selectedTime}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SCREENSHOT */}
            <div className="mb-7">
              <h3 className="section-title">Payment Screenshot</h3>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-400"
              />

              <p className="text-xs text-gray-500 mt-2">
                Images are automatically optimized for faster booking.
              </p>

              {photoPreview && (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="mt-4 w-full h-52 object-cover rounded-2xl border border-white/10"
                />
              )}
            </div>

            {/* MESSAGE */}
            <div className="mb-7">
              <h3 className="section-title">Additional Message</h3>

              <textarea
                placeholder="Write additional information..."
                className="input resize-none h-32"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {/* BTN */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-sm sm:text-base hover:scale-[1.01] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Submitting Booking..." : "Confirm Booking"}
            </button>
          </div>
        </div>
      </div>

      {/* STYLES */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 15px 16px;
            border-radius: 16px;
            background: rgba(0,0,0,0.45);
            border: 1px solid rgba(255,255,255,0.1);
            outline: none;
            color: white;
            font-size: 14px;
            transition: 0.3s;
          }

          .input:focus {
            border-color: #facc15;
            box-shadow: 0 0 0 3px rgba(250,204,21,0.08);
          }

          .input::placeholder {
            color: #9ca3af;
          }

          .label {
            display: block;
            margin-bottom: 8px;
            font-size: 13px;
            color: #9ca3af;
          }

          .section-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 16px;
            color: white;
          }

          @keyframes popup {
            0% {
              opacity: 0;
              transform: scale(0.9) translateY(20px);
            }

            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          .animate-popup {
            animation: popup 0.35s ease;
          }

          @media (max-width: 640px) {
            .input {
              padding: 14px;
              border-radius: 14px;
              font-size: 13px;
            }

            .section-title {
              font-size: 16px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Booking;
