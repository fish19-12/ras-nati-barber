import { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import axios from "axios";

import {
  FaPaperPlane,
  FaTimes,
  FaMicrophone,
  FaImage,
  FaMagic,
} from "react-icons/fa";

import logo from "../assets/logo.jpg";

// =====================================================
// API
// =====================================================

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// =====================================================
// STARTER PROMPTS
// =====================================================

const starterPrompts = [
  "How do I book an appointment?",

  "What services do you offer?",

  "Recommend a hairstyle for me",

  "Tell me about Natty Reborn Cut",
];

// =====================================================
// MARKDOWN SIMPLE RENDER
// =====================================================

function renderMarkdownContent(text) {
  if (!text) return null;

  return text.split("\n").map((line, index) => (
    <span key={index} className="block">
      {line}
    </span>
  ));
}

// =====================================================
// MAIN COMPONENT
// =====================================================

export default function NatiAIChat() {
  // ===============================
  // STATES
  // ===============================

  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",

      content: `Hello 👋

I’m Nati AI, your premium grooming assistant for Nhatty The Barber.

I can help you with:
• Booking
• Hairstyles
• Services
• Grooming advice
• Natty's story`,
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const [preview, setPreview] = useState(null);

  const [listening, setListening] = useState(false);

  const sessionId = useRef(crypto.randomUUID());

  const bottomRef = useRef(null);

  const recognition = useRef(null);

  // ===============================
  // AUTO SCROLL
  // ===============================

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, open]);

  // ===============================
  // BODY LOCK WHEN OPEN
  // ===============================

  useEffect(() => {
    if (open) {
      document.body.classList.add("ai-open");
    } else {
      document.body.classList.remove("ai-open");
    }

    return () => {
      document.body.classList.remove("ai-open");
    };
  }, [open]);

  // ===============================
  // VOICE SETUP
  // ===============================

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }

    recognition.current = new SpeechRecognition();

    recognition.current.lang = "en-US";

    recognition.current.continuous = false;

    recognition.current.interimResults = false;

    recognition.current.onstart = () => {
      setListening(true);
    };

    recognition.current.onend = () => {
      setListening(false);
    };

    recognition.current.onresult = (event) => {
      const text = event.results[0][0].transcript;

      setInput(text);
    };
  }, []);

  function startVoice() {
    if (!recognition.current) {
      alert("Voice input is not supported on this browser.");

      return;
    }

    try {
      recognition.current.start();
    } catch (error) {
      console.log(error);
    }
  }

  // ===============================
  // IMAGE SELECT
  // ===============================

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image")) {
      alert("Please select an image file.");

      return;
    }

    setSelectedImage(file);

    setPreview(URL.createObjectURL(file));
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => resolve(reader.result);

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }

  // =====================================================
  // SEND MESSAGE
  // =====================================================

  async function sendMessage(customText = "") {
    const text = customText || input.trim();

    if (!text && !selectedImage) {
      return;
    }

    setMessages((prev) => [
      ...prev,

      {
        role: "user",

        content: text || "Please analyze this hairstyle image",
      },
    ]);

    setInput("");

    setLoading(true);

    try {
      // IMAGE ANALYSIS

      if (selectedImage) {
        const imageBase64 = await fileToBase64(selectedImage);

        const response = await axios.post(
          `${API_URL}/api/ai-chat/analyze-hairstyle`,

          {
            imageBase64,

            userGoal: text || "Recommend a suitable hairstyle",
          },
        );

        setMessages((prev) => [
          ...prev,

          {
            role: "assistant",

            content: response.data.reply,
          },
        ]);

        setSelectedImage(null);

        setPreview(null);

        return;
      }

      // NORMAL CHAT

      const response = await axios.post(
        `${API_URL}/api/ai-chat`,

        {
          message: text,

          sessionId: sessionId.current,
        },
      );

      setMessages((prev) => [
        ...prev,

        {
          role: "assistant",

          content: response.data.reply,
        },
      ]);
    } catch (error) {
      console.error("Nati AI error:", error);

      setMessages((prev) => [
        ...prev,

        {
          role: "assistant",

          content:
            "Sorry, Nati AI is temporarily unavailable. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  } // =====================================================
  // RETURN UI PART 2
  // =====================================================

  return (
    <>
      {/* =====================================================
    FLOATING BUTTON
===================================================== */}

      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
            }}
            onClick={() => setOpen(true)}
            className="

fixed


z-[9999]


right-4



bottom-[100px]



sm:right-8

sm:bottom-8



flex

items-center

gap-3



rounded-full



bg-gradient-to-r

from-yellow-400

via-orange-400

to-orange-500



px-4

py-3



text-black



font-bold



shadow-[0_15px_50px_rgba(255,170,0,.45)]



transition-all

duration-300



hover:scale-105


"
          >
            <img
              src={logo}
              alt="Nati AI"
              className="

h-9

w-9


rounded-full


object-cover


border

border-black/20

"
            />

            <span className="block text-sm">Nhatty AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* =====================================================
    AI WINDOW
===================================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,

              y: 40,

              scale: 0.95,
            }}
            animate={{
              opacity: 1,

              y: 0,

              scale: 1,
            }}
            exit={{
              opacity: 0,

              y: 40,

              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
            }}
            className="

fixed


z-[9999]


left-3

right-3



bottom-[95px]



sm:left-auto

sm:right-8

sm:bottom-8



w-auto


sm:w-[420px]



h-[70dvh]



min-h-[430px]



max-h-[700px]



rounded-[28px]


overflow-hidden



border

border-white/10



bg-[#070707]/95



backdrop-blur-xl



shadow-[0_30px_100px_rgba(0,0,0,.8)]



flex

flex-col


"
          >
            {/* =====================================================
    HEADER
===================================================== */}

            <div
              className="

shrink-0


flex


items-center


justify-between



px-4

py-3



bg-black/90



border-b

border-white/10



"
            >
              <div
                className="

flex

items-center

gap-3

"
              >
                <img
                  src={logo}
                  alt="Nati AI"
                  className="

w-11

h-11


rounded-full


object-cover


border

border-yellow-400/40


"
                />

                <div>
                  <h2
                    className="

text-white

font-bold

text-base

"
                  >
                    Nhatty AI
                  </h2>

                  <p
                    className="

text-xs

text-zinc-400

"
                  >
                    Premium Barber Assistant
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="

h-10

w-10



flex

items-center

justify-center



rounded-full



bg-white/10



text-white



hover:bg-red-500/30



transition


"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* =====================================================
    CHAT AREA
===================================================== */}

            <div
              className="

flex-1


overflow-y-auto


px-4

py-4



space-y-3


nati-ai-scroll


"
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,

                    y: 10,
                  }}
                  animate={{
                    opacity: 1,

                    y: 0,
                  }}
                  className={`

max-w-[85%]

rounded-2xl

px-4

py-3


text-sm

leading-6



${
  msg.role === "assistant"
    ? `

mr-auto

bg-white/10

text-zinc-100

`
    : `

ml-auto

bg-gradient-to-r

from-yellow-400

to-orange-500

text-black

`
}


`}
                >
                  {msg.role === "assistant"
                    ? renderMarkdownContent(msg.content)
                    : msg.content}
                </motion.div>
              ))}

              {loading && (
                <div
                  className="

w-fit

rounded-2xl

bg-white/10

px-4

py-3

text-sm

text-zinc-300

"
                >
                  Nhatty AI is thinking...
                </div>
              )}

              <div ref={bottomRef} />
            </div>
            {/* =====================================================
    STARTER PROMPTS + IMAGE PREVIEW + INPUT AREA
===================================================== */}

            {messages.length === 1 && (
              <div className="px-4 pb-3 space-y-2">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="
        w-full
        flex
        items-center
        gap-2
        rounded-full
        border
        border-white/10
        bg-white/5
        px-4
        py-2
        text-left
        text-xs
        text-zinc-300
        transition
        hover:border-yellow-400/50
        hover:text-white
        "
                  >
                    <FaMagic className="text-yellow-400" />

                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {preview && (
              <div
                className="
px-4
pb-2
"
              >
                <div
                  className="
relative
w-fit
"
                >
                  <img
                    src={preview}
                    alt="preview"
                    className="
h-20
w-20
rounded-xl
object-cover
border
border-white/20
"
                  />

                  <button
                    onClick={() => {
                      setPreview(null);

                      setSelectedImage(null);
                    }}
                    className="
absolute
-right-2
-top-2
h-6
w-6
rounded-full
bg-red-500
text-white
flex
items-center
justify-center
"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* =====================================================
    INPUT AREA FIXED MOBILE VERSION
===================================================== */}

            <div
              className="
    shrink-0
    border-t
    border-white/10
    bg-black/95
    backdrop-blur-xl
    p-3
    safe-area-bottom
  "
            >
              <div
                className="
      flex
      items-center
      gap-2
      w-full
      rounded-full
      border
      border-white/10
      bg-white/5
      px-3
      py-2
    "
              >
                {/* IMAGE BUTTON */}

                <label
                  className="
        flex
        items-center
        justify-center
        shrink-0
        cursor-pointer
        text-yellow-400
        hover:text-yellow-300
      "
                >
                  <FaImage size={19} />

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </label>

                {/* TEXT INPUT */}

                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  placeholder="Ask Nati AI anything..."
                  className="
        flex-1
        min-w-0
        bg-transparent
        outline-none
        text-sm
        text-white
        placeholder:text-zinc-500
        px-2
      "
                />

                {/* VOICE */}

                <button
                  onClick={startVoice}
                  className={`
        shrink-0
        flex
        items-center
        justify-center

        ${listening ? "text-red-400" : "text-zinc-400"}

        transition
      `}
                >
                  <FaMicrophone size={18} />
                </button>

                {/* SEND BUTTON */}

                <button
                  onClick={() => sendMessage()}
                  disabled={loading}
                  className="
        shrink-0
        flex
        items-center
        justify-center

        h-10
        w-10

        rounded-full

        bg-gradient-to-r
        from-yellow-400
        to-orange-500

        text-black

        shadow-lg

        transition

        hover:scale-105

        disabled:opacity-50

      "
                >
                  <FaPaperPlane size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
