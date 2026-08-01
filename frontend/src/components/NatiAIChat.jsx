import { useEffect, useRef, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  FaPaperPlane,
  FaTimes,
  FaMagic,
  FaMicrophone,
  FaImage,
  FaVolumeUp,
  FaStop,
  FaTrash,
} from "react-icons/fa";

import axios from "axios";

import logo from "../assets/logo.jpg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const starterPrompts = [
  "Who is Natty?",

  "How can I book an appointment?",

  "Recommend a haircut for my face shape",

  "What services does Nhatty The Barber offer?",
];

function renderMarkdownContent(content) {
  const parts = content.split(/\n{2,}/).filter(Boolean);

  return parts.map((part, index) => {
    const lines = part.split("\n").filter(Boolean);

    return (
      <div key={index} className="space-y-1">
        {lines.map((line, lineIndex) => {
          const formatted = line
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>");

          return (
            <p
              key={lineIndex}
              className="whitespace-pre-wrap"
              dangerouslySetInnerHTML={{
                __html: formatted,
              }}
            />
          );
        })}
      </div>
    );
  });
}

export default function NatiAIChat() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",

      content:
        "Hello 👋 I’m Nati AI, your premium grooming concierge for Nhatty The Barber. I can help you with booking, hairstyles, Natty’s story, services, location, and personalized style recommendations.",
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const [sessionId] = useState(() => crypto.randomUUID());

  const [isListening, setIsListening] = useState(false);

  const [isSpeaking, setIsSpeaking] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const [imagePreview, setImagePreview] = useState(null);

  const bottomRef = useRef(null);

  const recognitionRef = useRef(null);

  const imageInputRef = useRef(null);

  /*
=========================
AUTO SCROLL
=========================
*/

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, open]);

  /*
=========================
VOICE INPUT
=========================
*/

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;

      setInput(text);
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  /*
=========================
AI VOICE
=========================
*/

  const speakText = (text) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.rate = 1;

    speech.pitch = 1;

    speech.onstart = () => {
      setIsSpeaking(true);
    };

    speech.onend = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(speech);
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    setIsSpeaking(false);
  };

  /*
=========================
IMAGE UPLOAD
=========================
*/

  const handleImageSelect = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setSelectedImage(file);

    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setSelectedImage(null);

    setImagePreview(null);
  };

  /*
=========================
ANALYZE IMAGE
=========================
*/

  const analyzeHairstyle = async () => {
    if (!selectedImage) return;

    setMessages((prev) => [
      ...prev,

      {
        role: "assistant",

        content:
          "📸 I received your photo. I will analyze your face shape, hairstyle, and recommend a suitable look.",
      },
    ]);
  };

  /*
=========================
SEND MESSAGE
=========================
*/

  const sendMessage = async (text = input.trim()) => {
    if (!text && !selectedImage) return;

    const userMessage = {
      role: "user",

      content: text || "Analyze my hairstyle",
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/ai-chat`,

        {
          message: text,

          sessionId,
        },
      );

      const reply =
        response.data.reply ||
        "I am ready to help you with your grooming journey.";

      setMessages((prev) => [
        ...prev,

        {
          role: "assistant",

          content: reply,
        },
      ]);

      // AI speaking

      speakText(reply);
    } catch (error) {
      console.error(error);

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
  };

  return (
    <>
      {/* =========================
 FLOATING BUTTON
========================= */}

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="

fixed

right-5

bottom-[120px]

sm:bottom-10

md:right-8

md:bottom-8

z-[9999]

flex

items-center

gap-3

rounded-full

bg-gradient-to-r

from-yellow-400

via-amber-500

to-orange-500

px-5

py-3

font-bold

text-black

shadow-[0_15px_50px_rgba(255,170,0,.45)]

transition-all

duration-300

hover:scale-105

active:scale-95

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

"
          />

          <span>Nati AI</span>
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,

              y: 40,

              scale: 0.96,
            }}
            animate={{
              opacity: 1,

              y: 0,

              scale: 1,
            }}
            exit={{
              opacity: 0,

              y: 40,

              scale: 0.96,
            }}
            transition={{
              duration: 0.25,
            }}
            className="

fixed

left-3

right-3

bottom-[90px]

z-[10000]

flex

h-[70dvh]

max-h-[620px]

flex-col

overflow-hidden

rounded-[28px]

border

border-white/10

bg-[#080808]/95

shadow-[0_30px_100px_rgba(0,0,0,.8)]

backdrop-blur-xl



md:left-auto

md:right-8

md:bottom-24

md:h-[650px]

md:w-[440px]

"
          >
            {/* =========================
 HEADER
========================= */}

            <div
              className="

flex

shrink-0

items-center

justify-between

border-b

border-white/10

bg-black/95

px-4

py-3

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

h-11

w-11

rounded-full

object-cover

border

border-white/10

"
                />

                <div>
                  <h3
                    className="

font-bold

text-white

"
                  >
                    Nati AI
                  </h3>

                  <p
                    className="

text-xs

text-zinc-400

"
                  >
                    Premium Barber Concierge
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="

flex

h-10

w-10

items-center

justify-center

rounded-full

text-zinc-300

transition

hover:bg-white/10

hover:text-white

"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* =========================
 CHAT AREA
========================= */}

            <div
              className="

nati-ai-scroll

flex-1

overflow-y-auto

px-4

py-4

"
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`

mb-4

max-w-[90%]

rounded-3xl

px-4

py-3

text-sm

leading-7

${
  msg.role === "assistant"
    ? "bg-white/10 text-zinc-100"
    : "ml-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
}

`}
                >
                  {msg.role === "assistant"
                    ? renderMarkdownContent(msg.content)
                    : msg.content}
                </div>
              ))}

              {loading && (
                <div
                  className="

mb-4

flex

items-center

gap-2

rounded-2xl

bg-white/10

px-4

py-3

text-sm

text-zinc-300

"
                >
                  <span>Nati AI thinking</span>

                  <span className="animate-pulse">•••</span>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* =========================
 IMAGE PREVIEW
========================= */}

            {imagePreview && (
              <div
                className="

mb-3

flex

items-center

justify-between

rounded-2xl

border

border-white/10

bg-white/5

p-3

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
                    src={imagePreview}
                    alt="Hairstyle preview"
                    className="

h-14

w-14

rounded-xl

object-cover

"
                  />

                  <div>
                    <p className="text-sm text-white">Photo uploaded</p>

                    <p className="text-xs text-zinc-400">
                      Ready for hairstyle analysis
                    </p>
                  </div>
                </div>

                <button
                  onClick={removeImage}
                  className="

text-red-400

hover:text-red-300

"
                >
                  <FaTrash />
                </button>
              </div>
            )}

            {/* =========================
 INPUT AREA
========================= */}

            <div
              className="

shrink-0

border-t

border-white/10

bg-black/95

p-3

pb-[env(safe-area-inset-bottom)]

"
            >
              <div
                className="

mb-3

flex

items-center

gap-2

"
              >
                {/* IMAGE BUTTON */}

                <button
                  onClick={() => {
                    if (selectedImage) {
                      analyzeHairstyle();
                    } else {
                      imageInputRef.current.click();
                    }
                  }}
                  className="

flex

h-11

w-11

items-center

justify-center

rounded-full

border

border-white/10

bg-white/5

text-white

transition

hover:bg-white/10

"
                >
                  <FaImage />
                </button>

                {/* MICROPHONE BUTTON */}

                <button
                  onClick={startListening}
                  className={`

flex

h-11

w-11

items-center

justify-center

rounded-full

border

border-white/10


${isListening ? "bg-red-500 text-white" : "bg-white/5 text-white"}

`}
                >
                  <FaMicrophone />
                </button>

                {/* VOICE CONTROL */}

                <button
                  onClick={isSpeaking ? stopSpeaking : () => {}}
                  className="

flex

h-11

w-11

items-center

justify-center

rounded-full

border

border-white/10

bg-white/5

text-white

"
                >
                  {isSpeaking ? <FaStop /> : <FaVolumeUp />}
                </button>

                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageSelect}
                />
              </div>

              <div
                className="

flex

items-center

gap-2

rounded-full

border

border-white/10

bg-white/5

px-3

py-2

"
              >
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

bg-transparent

px-3

py-2

text-sm

text-white

outline-none

placeholder:text-zinc-500

"
                />

                <button
                  onClick={() => sendMessage()}
                  disabled={loading}
                  className="

flex

h-11

w-11

items-center

justify-center

rounded-full

bg-gradient-to-r

from-yellow-400

to-orange-500

text-black

transition

hover:scale-105

disabled:opacity-50

"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
