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
// STARTER QUESTIONS
// =====================================================

const starterPrompts = [
  "Who is Natty?",

  "Why is Natty different?",

  "What is Natty Reborn Cut?",

  "How can I book Natty?",
];

// =====================================================
// SIMPLE TEXT DISPLAY
// =====================================================

function renderContent(text) {
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
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",

      content: `Hello 👋

I'm Nati AI, the official assistant for Nhatty The Barber.

I can help you with:
• Natty's story
• Hairstyles
• Natty Reborn Cut
• Booking
• Barber services`,
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

  // =====================================================
  // AUTO SCROLL
  // =====================================================

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, open]);

  // =====================================================
  // VOICE INPUT
  // =====================================================

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
      alert("Voice input is not supported.");

      return;
    }

    try {
      recognition.current.start();
    } catch (error) {
      console.log(error);
    }
  }

  // =====================================================
  // IMAGE SELECT
  // =====================================================

  function handleImageChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image")) {
      alert("Please select an image.");

      return;
    }

    setSelectedImage(file);

    setPreview(URL.createObjectURL(file));
  }

  function fileToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

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

        content: text || "Analyze my hairstyle",
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

            userGoal: text || "Recommend a hairstyle",
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
      console.log("Nati AI error", error);

      setMessages((prev) => [
        ...prev,

        {
          role: "assistant",

          content: "Nati AI is temporarily unavailable.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {/* =====================================================
FLOATING AI BUTTON
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
right-5
bottom-8
flex
items-center
gap-3
rounded-full
bg-gradient-to-r
from-yellow-400
to-orange-500
px-4
py-3
font-bold
text-black
shadow-xl
hover:scale-105
transition
"
          >
            <img
              src={logo}
              alt="Nati AI"
              className="
h-10
w-10
rounded-full
object-cover
"
            />

            <span className="hidden sm:block">Nati AI</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* =====================================================
AI CHAT WINDOW
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
            className="

fixed

z-[9999]

left-3

right-3

bottom-5

sm:left-auto

sm:right-8

sm:w-[420px]

h-[75dvh]

max-h-[700px]

rounded-3xl

overflow-hidden

bg-[#070707]/95

backdrop-blur-xl

border

border-white/10

shadow-2xl

flex

flex-col

"
          >
            {/* HEADER */}

            <div
              className="

flex

items-center

justify-between

px-4

py-3

bg-black

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
                  alt="Nati"
                  className="

w-11

h-11

rounded-full

object-cover

border

border-yellow-400

"
                />

                <div>
                  <h2 className="text-white font-bold">Nati AI</h2>

                  <p className="text-xs text-zinc-400">
                    Official Barber Assistant
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="

h-10

w-10

rounded-full

bg-white/10

text-white

flex

items-center

justify-center

hover:bg-red-500/30

"
              >
                <FaTimes />
              </button>
            </div>

            {/* CHAT MESSAGES */}

            <div
              className="

flex-1

overflow-y-auto

px-4

py-4

space-y-3

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

text-white

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
                    ? renderContent(msg.content)
                    : msg.content}
                </motion.div>
              ))}

              {loading && (
                <div
                  className="

bg-white/10

text-zinc-300

px-4

py-3

rounded-2xl

w-fit

text-sm

"
                >
                  Nati AI is thinking...
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* STARTER BUTTONS */}

            {messages.length === 1 && (
              <div
                className="

px-4

pb-3

space-y-2

"
              >
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => sendMessage(prompt)}
                    className="

w-full

text-left

px-4

py-2

rounded-full

border

border-white/10

bg-white/5

text-zinc-300

text-xs

hover:text-white

hover:border-yellow-400

transition

flex

items-center

gap-2

"
                  >
                    <FaMagic className="text-yellow-400" />

                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* IMAGE PREVIEW */}

            {preview && (
              <div className="px-4 pb-2">
                <div className="relative w-fit">
                  <img
                    src={preview}
                    alt="preview"
                    className="

h-20

w-20

rounded-xl

object-cover

"
                  />

                  <button
                    onClick={() => {
                      setPreview(null);

                      setSelectedImage(null);
                    }}
                    className="

absolute

-top-2

-right-2

h-6

w-6

rounded-full

bg-red-500

text-white

"
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* INPUT */}

            <div
              className="

border-t

border-white/10

bg-black

p-3

"
            >
              <div
                className="

flex

items-center

gap-2

rounded-full

bg-white/5

border

border-white/10

px-3

py-2

"
              >
                <label
                  className="

text-yellow-400

cursor-pointer

"
                >
                  <FaImage />

                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>

                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  placeholder="Ask Nati AI..."
                  className="

flex-1

bg-transparent

outline-none

text-white

text-sm

px-2

"
                />

                <button
                  onClick={startVoice}
                  className={`

${listening ? "text-red-400" : "text-zinc-400"}

`}
                >
                  <FaMicrophone />
                </button>

                <button
                  disabled={loading}
                  onClick={() => sendMessage()}
                  className="

h-10

w-10

rounded-full

bg-gradient-to-r

from-yellow-400

to-orange-500

text-black

flex

items-center

justify-center

"
                >
                  <FaPaperPlane size={15} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
