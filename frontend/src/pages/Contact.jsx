import { useEffect, useMemo, useState } from "react";

import {
  FaCopy,
  FaCheck,
  FaCrown,
  FaGem,
  FaMagic,
  FaCar,
  FaCity,
  FaClock,
  FaLock,
  FaCheckCircle,
  FaUpload,
} from "react-icons/fa";

import axios from "axios";

import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useLanguage } from "../context/LanguageContext.jsx";

import en from "../translations/en.json";
import am from "../translations/am.json";

// ================= SERVICES =================

const servicesList = [
  {
    name: "VIP Service",
    key: "vip",
    desc: "Premium Grooming Experience",
    icon: <FaCrown />,
    color: "from-yellow-400 to-amber-600",
  },

  {
    name: "VVIP Service",
    key: "vvip",
    desc: "Luxury Elite Service",
    icon: <FaGem />,
    color: "from-purple-500 to-pink-500",
  },

  {
    name: "Nhatty Reborn",
    key: "reborn",
    desc: "Complete Transformation",
    icon: <FaMagic />,
    color: "from-red-500 to-orange-500",
  },

  {
    name: "Outdoor",
    key: "outdoor",
    desc: "Service At Your Home",
    icon: <FaCar />,
    color: "from-green-500 to-emerald-600",
  },

  {
    name: "City To City",
    key: "city",
    desc: "Travel Grooming Service",
    icon: <FaCity />,
    color: "from-blue-500 to-cyan-500",
  },
];

// ================= TIME =================

const timePeriods = [
  {
    label: "Morning",
    key: "morning",
    times: ["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM"],
  },

  {
    label: "Afternoon",
    key: "afternoon",
    times: ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM"],
  },

  {
    label: "Evening",
    key: "evening",
    times: ["4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"],
  },
];

// ================= COMPONENT =================

const Booking = () => {
  // ================= LANGUAGE =================

  const { language } = useLanguage();

  const translations = language === "AM" ? am : en;

  // ================= CUSTOMER =================

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  // ================= SERVICE =================

  const [selectedService, setSelectedService] = useState("");

  // ================= DATE TIME =================

  const [selectedDate, setSelectedDate] = useState("");

  const [selectedPeriod, setSelectedPeriod] = useState("");

  const [selectedTime, setSelectedTime] = useState("");

  // ================= EXTRA SERVICES =================

  const [outdoorAddress, setOutdoorAddress] = useState("");

  const [cityLocation, setCityLocation] = useState("");

  const [cityNeedDate, setCityNeedDate] = useState("");

  // ================= PAYMENT =================

  const [paymentPhoto, setPaymentPhoto] = useState(null);

  const [photoPreview, setPhotoPreview] = useState(null);

  // ================= UI =================

  const [copied, setCopied] = useState("");

  const [loading, setLoading] = useState(false);

  // ================= BOOKINGS =================

  const [bookings, setBookings] = useState([]);

  const [loadingBookings, setLoadingBookings] = useState(false);

  const [unavailableSlots, setUnavailableSlots] = useState([]);

  // ================= SUCCESS =================

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [bookingInfo, setBookingInfo] = useState({
    customer: "",

    date: "",

    time: "",

    service: "",
  });

  // ================= FETCH BOOKINGS =================

  const fetchBookings = async () => {
    try {
      setLoadingBookings(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
      );

      setBookings(res.data || []);
    } catch (error) {
      console.error("Booking fetch error:", error);
    } finally {
      setLoadingBookings(false);
    }
  };

  // ================= LOCKED SLOTS =================

  const fetchUnavailableSlots = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/unavailable-slots`,
      );

      setUnavailableSlots(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBookings();

    fetchUnavailableSlots();
  }, []);

  // ================= BOOKED TIMES =================

  const bookedTimes = useMemo(() => {
    if (!selectedDate) return [];

    return bookings

      .filter((booking) => {
        const date = new Date(booking.date).toISOString().split("T")[0];

        return date === selectedDate;
      })

      .map((booking) => booking.time);
  }, [bookings, selectedDate]);

  // ================= AVAILABLE TIMES =================

  const availableTimes = useMemo(() => {
    const period = timePeriods.find((item) => item.label === selectedPeriod);

    return period ? period.times : [];
  }, [selectedPeriod]);

  // ================= SERVICE SELECT =================

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  // ================= COPY NUMBER =================

  const copyNumber = (number) => {
    navigator.clipboard.writeText(number);

    setCopied(number);

    toast.success(translations.booking.messages.copied);

    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  // ================= IMAGE COMPRESS =================

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const img = new Image();

        img.onload = () => {
          const canvas = document.createElement("canvas");

          const MAX_WIDTH = 1200;

          const MAX_HEIGHT = 1200;

          let width = img.width;

          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height = height * (MAX_WIDTH / width);

              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width = width * (MAX_HEIGHT / height);

              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;

          canvas.height = height;

          const ctx = canvas.getContext("2d");

          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Compression failed"));

                return;
              }

              resolve(
                new File([blob], file.name, {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                }),
              );
            },
            "image/jpeg",
            0.75,
          );
        };

        img.onerror = reject;

        img.src = event.target.result;
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }; // ================= FILE UPLOAD =================

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];

      e.target.value = null;

      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error(translations.booking.messages.invalidImage);

        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error(translations.booking.messages.imageSize);

        return;
      }

      toast.info(translations.booking.messages.processing);

      const compressed = await compressImage(file);

      setPaymentPhoto(compressed);

      setPhotoPreview(URL.createObjectURL(compressed));

      toast.success(translations.booking.messages.uploadSuccess);
    } catch (error) {
      console.error(error);

      toast.error(translations.booking.messages.uploadFailed);
    }
  };

  // ================= TODAY =================

  const today = new Date().toISOString().split("T")[0];

  // ================= VALIDATION =================

  const validateForm = () => {
    if (!name.trim()) {
      toast.error(translations.booking.validation.name);

      return false;
    }

    if (!phone.trim()) {
      toast.error(translations.booking.validation.phone);

      return false;
    }

    if (!selectedService) {
      toast.error(translations.booking.validation.service);

      return false;
    }

    if (!selectedDate) {
      toast.error(translations.booking.validation.date);

      return false;
    }

    if (!selectedPeriod) {
      toast.error(translations.booking.validation.period);

      return false;
    }

    if (!selectedTime) {
      toast.error(translations.booking.validation.time);

      return false;
    }

    if (!paymentPhoto) {
      toast.error(translations.booking.validation.payment);

      return false;
    }

    if (selectedService === "Outdoor" && !outdoorAddress.trim()) {
      toast.error(translations.booking.validation.outdoor);

      return false;
    }

    if (
      selectedService === "City To City" &&
      (!cityLocation.trim() || !cityNeedDate)
    ) {
      toast.error(translations.booking.validation.city);

      return false;
    }

    return true;
  };

  // ================= DUPLICATE CHECK =================

  const checkExistingBooking = () => {
    return bookings.some((booking) => {
      const bookingDate = new Date(booking.date).toISOString().split("T")[0];

      return bookingDate === selectedDate && booking.time === selectedTime;
    });
  };

  // ================= SUBMIT =================

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (checkExistingBooking()) {
      toast.error(translations.booking.messages.slotBooked);

      return;
    }

    const formData = new FormData();

    formData.append("name", name);

    formData.append("phone", phone);

    formData.append("service", selectedService);

    formData.append("date", selectedDate);

    formData.append("timePeriod", selectedPeriod);

    formData.append("time", selectedTime);

    formData.append("outdoorAddress", outdoorAddress);

    formData.append("cityLocation", cityLocation);

    formData.append("cityNeedDate", cityNeedDate);

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

      setBookingInfo({
        customer: name,

        date: selectedDate,

        time: selectedTime,

        service: selectedService,
      });

      setShowSuccessModal(true);

      toast.success(translations.booking.messages.success);

      fetchBookings();

      fetchUnavailableSlots();

      // RESET FORM

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

      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }

      setPhotoPreview(null);
    } catch (error) {
      console.error("Booking Error:", error);

      toast.error(
        error.response?.data?.message || translations.booking.messages.failed,
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= JSX START =================

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      {/* SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-lg rounded-3xl bg-[#0d0d0d] border border-yellow-500/20 p-6 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-52 h-52 bg-yellow-500/20 blur-[100px] rounded-full" />

            <div className="relative z-10 text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-black text-4xl font-black">
                ✓
              </div>

              <h2 className="mt-5 text-3xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                {translations.booking.successTitle}
              </h2>

              <p className="mt-3 text-gray-400">
                {translations.booking.successMessage}{" "}
                <span className="text-yellow-400 font-bold">
                  {bookingInfo.customer}
                </span>
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-gray-400 text-xs">
                  {translations.booking.service}
                </p>

                <p className="font-bold">{bookingInfo.service}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-2xl p-4">
                  <p className="text-gray-400 text-xs">
                    {translations.booking.date}
                  </p>

                  <p className="font-bold">{bookingInfo.date}</p>
                </div>

                <div className="bg-white/5 rounded-2xl p-4">
                  <p className="text-gray-400 text-xs">
                    {translations.booking.time}
                  </p>

                  <p className="font-bold">{bookingInfo.time}</p>
                </div>
              </div>

              <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-4">
                <h3 className="text-yellow-400 font-bold">
                  {translations.booking.policy}
                </h3>

                <p className="text-sm text-gray-300 mt-2">
                  {translations.booking.policyText}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="mt-6 w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold"
            >
              {translations.booking.done}
            </button>
          </div>
        </div>
      )}{" "}
      {/* BACKGROUND */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-yellow-500/10 blur-[130px] rounded-full"></div>
      {/* MAIN */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10">
        {/* HEADER */}

        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs mb-4">
            {translations.booking.badge}
          </div>

          <h1 className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            {translations.booking.title}
          </h1>

          <p className="text-gray-400 mt-3 max-w-xl mx-auto">
            {translations.booking.description}
          </p>
        </div>

        <div className="grid xl:grid-cols-[360px_1fr] gap-6">
          {/* ================= LEFT FORM ================= */}

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-5">
            {/* CUSTOMER */}

            <section className="mb-8">
              <h3 className="section-title">{translations.booking.customer}</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  className="input"
                  placeholder={translations.booking.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <input
                  className="input"
                  placeholder={translations.booking.phone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </section>

            {/* SERVICES */}

            <section className="mb-8">
              <h3 className="section-title">
                {translations.booking.chooseService}
              </h3>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {servicesList.map((service, index) => (
                  <div
                    key={index}
                    onClick={() => handleServiceSelect(service.name)}
                    className={`cursor-pointer rounded-2xl p-4 border transition-all

${
  selectedService === service.name
    ? "border-yellow-400 bg-white/10 scale-[1.02]"
    : "border-white/10 bg-black/30 hover:bg-white/5"
}

`}
                  >
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-3`}
                    >
                      {service.icon}
                    </div>

                    <h4 className="font-semibold text-sm">
                      {translations.booking.services[service.key].name}
                    </h4>

                    <p className="text-xs text-gray-400 mt-1">
                      {translations.booking.services[service.key].desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* OUTDOOR */}

            {selectedService === "Outdoor" && (
              <div className="mb-7 rounded-3xl p-5 bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center">
                    <FaCar />
                  </div>

                  <div>
                    <h3 className="font-bold text-green-400">
                      {translations.booking.outdoorTitle}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {translations.booking.outdoorDesc}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-yellow-300 mb-4">
                  {translations.booking.outdoorNotice}
                </p>

                <input
                  className="input"
                  placeholder={translations.booking.address}
                  value={outdoorAddress}
                  onChange={(e) => setOutdoorAddress(e.target.value)}
                />
              </div>
            )}

            {/* CITY */}

            {selectedService === "City To City" && (
              <div className="mb-7 rounded-3xl p-5 bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center">
                    <FaCity />
                  </div>

                  <div>
                    <h3 className="font-bold text-blue-400">
                      {translations.booking.cityTitle}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {translations.booking.cityDesc}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-orange-300 mb-4">
                  {translations.booking.cityNotice}
                </p>

                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    className="input"
                    placeholder={translations.booking.city}
                    value={cityLocation}
                    onChange={(e) => setCityLocation(e.target.value)}
                  />

                  <input
                    type="date"
                    className="input"
                    value={cityNeedDate}
                    onChange={(e) => setCityNeedDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* APPOINTMENT */}

            <section>
              <h3 className="section-title">{translations.booking.schedule}</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label">{translations.booking.date}</label>

                  <input
                    type="date"
                    min={today}
                    className="input"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);

                      setSelectedTime("");
                    }}
                  />
                </div>

                <div>
                  <label className="label">{translations.booking.period}</label>

                  <select
                    className="input"
                    value={selectedPeriod}
                    onChange={(e) => {
                      setSelectedPeriod(e.target.value);

                      setSelectedTime("");
                    }}
                  >
                    <option value="">
                      {translations.booking.choosePeriod}
                    </option>

                    {timePeriods.map((period, index) => (
                      <option key={index} value={period.label}>
                        {translations.booking.periods?.[period.key] ||
                          period.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedPeriod && (
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availableTimes.map((time, index) => {
                    const booked =
                      bookedTimes.includes(time) ||
                      unavailableSlots.some(
                        (slot) =>
                          new Date(slot.date).toISOString().split("T")[0] ===
                            selectedDate && slot.time === time,
                      );

                    return (
                      <button
                        key={index}
                        disabled={booked}
                        onClick={() => setSelectedTime(time)}
                        className={`rounded-xl py-3 border text-sm

${
  booked
    ? "bg-red-500/20 text-red-300"
    : selectedTime === time
      ? "bg-yellow-400 text-black"
      : "bg-white/5 border-white/10"
}

`}
                      >
                        {booked ? translations.booking.reserved : time}
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div className="space-y-6">
            {/* PAYMENT */}

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6">
              <h2 className="text-xl font-bold text-yellow-400 mb-5">
                {translations.booking.payment}
              </h2>

              <div className="rounded-2xl p-5 bg-yellow-500/10">
                <p className="text-gray-400">{translations.booking.deposit}</p>

                <h3 className="text-4xl font-black text-yellow-400">
                  1000 Birr
                </h3>
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ["Telebirr", "0975700510"],

                  ["CBE", "1000676408267"],

                  ["Abyssinia Bank", "77154938"],

                  ["Dashen Bank", "5444102610011"],
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-black/40 rounded-xl p-4"
                  >
                    <div>
                      <p className="text-xs text-gray-400">{item[0]}</p>

                      <p>{item[1]}</p>
                    </div>

                    <button
                      onClick={() => copyNumber(item[1])}
                      className="p-3 rounded-xl bg-yellow-500/10"
                    >
                      {copied === item[1] ? <FaCheck /> : <FaCopy />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SCREENSHOT */}

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
              <h3 className="section-title">
                {translations.booking.screenshot}
              </h3>

              <label className="cursor-pointer block">
                <div className="border-2 border-dashed border-yellow-500/30 rounded-2xl p-8 text-center">
                  <FaUpload className="mx-auto text-3xl text-yellow-400 mb-3" />

                  <p>{translations.booking.upload}</p>

                  <p className="text-xs text-gray-400">JPG PNG WEBP max 10MB</p>
                </div>

                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>

              {photoPreview && (
                <img
                  src={photoPreview}
                  className="mt-5 rounded-2xl w-full h-52 object-cover"
                />
              )}
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold"
            >
              {loading
                ? translations.booking.submitting
                : translations.booking.confirm}
            </button>
          </div>
        </div>
      </div>
      <style>{`

.input{

width:100%;
padding:15px;
border-radius:16px;
background:rgba(0,0,0,.45);
border:1px solid rgba(255,255,255,.1);
color:white;
outline:none;

}


.input:focus{

border-color:#facc15;

}


.section-title{

font-size:18px;
font-weight:700;
margin-bottom:16px;

}



.label{

display:block;
margin-bottom:8px;
font-size:13px;
color:#9ca3af;

}


`}</style>
    </div>
  );
};

export default Booking;
