import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes, FaMagic } from "react-icons/fa";
import axios from "axios";
import logo from "../assets/logo.jpg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const starterPrompts = [
  "How do I book an appointment?",
  "What services do you offer?",
  "Recommend a fresh style for me",
];

function renderMarkdownContent(content) {
  const parts = content.split(/\n{2,}/).filter(Boolean);

  return parts.map((part, partIndex) => {
    const lines = part.split(/\n/).filter(Boolean);

    if (
      lines.some(
        (line) => line.trim().startsWith("- ") || line.trim().startsWith("* "),
      )
    ) {
      return (
        <ul key={partIndex} className="mt-2 list-disc space-y-1 pl-5">
          {lines.map((line, lineIndex) => {
            const cleaned = line.replace(/^[-*]\s/, "").trim();
            const formatted = cleaned
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/\*(.*?)\*/g, "<em>$1</em>");

            return (
              <li
                key={`${partIndex}-${lineIndex}`}
                dangerouslySetInnerHTML={{ __html: formatted }}
              />
            );
          })}
        </ul>
      );
    }

    return (
      <p key={partIndex} className="mt-2 whitespace-pre-wrap">
        {lines.map((line, lineIndex) => {
          const formattedLine = line
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>");

          return (
            <span
              key={`${partIndex}-${lineIndex}`}
              dangerouslySetInnerHTML={{ __html: formattedLine }}
            />
          );
        })}
      </p>
    );
  });
}

export default function NatiAIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello, I’m Nati AI — your advanced concierge for Nhatty The Barber. I can guide you through booking, recommend the right service, and answer questions about styles, location, and the experience.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const bottomRef = useRef(null);
  const showSuggestions = messages.length === 1;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async (text = input.trim()) => {
    if (!text) return;

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/api/ai-chat`, {
        message: text,
        sessionId,
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: res.data.reply || "I’m ready to help." },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "The assistant hit a snag. Please try again or contact the shop directly.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-20 right-5 md:right-8 z-[1000] flex items-center gap-3 rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 px-4 py-3 text-black shadow-[0_10px_35px_rgba(255,180,0,0.35)] transition hover:scale-105 sm:bottom-6"
        aria-label="Open Nati AI assistant"
      >
        <img
          src={logo}
          alt="Nati AI logo"
          className="h-7 w-7 rounded-full object-cover"
        />
        <span className="font-semibold">Nati AI</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-36 right-5 md:right-8 z-[1001] w-[92vw] max-w-[420px] overflow-hidden rounded-[24px] border border-white/10 bg-[#090909]/95 shadow-[0_25px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:bottom-24"
          >
            <div className="flex items-center justify-between border-b border-white/10 bg-black/70 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="overflow-hidden rounded-full border border-white/10 bg-black/70">
                  <img
                    src={logo}
                    alt="Nati AI logo"
                    className="h-10 w-10 object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">Nati AI</p>
                  <p className="text-xs text-zinc-400">
                    Advanced styling & booking concierge
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-zinc-300 transition hover:bg-white/10 hover:text-white"
                aria-label="Close assistant"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex h-[420px] flex-col">
              <div className="flex-1 overflow-y-auto px-3 py-3">
                {messages.map((msg, index) => (
                  <div
                    key={`${msg.role}-${index}`}
                    className={`mb-3 max-w-[90%] rounded-2xl px-3 py-2 text-sm leading-6 ${
                      msg.role === "assistant"
                        ? "bg-white/10 text-zinc-100"
                        : "ml-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
                    }`}
                  >
                    {msg.role === "assistant"
                      ? renderMarkdownContent(msg.content)
                      : msg.content}
                  </div>
                ))}

                {loading && (
                  <div className="mb-3 max-w-[70%] rounded-2xl bg-white/10 px-3 py-2 text-sm text-zinc-300">
                    Nati AI is thinking...
                  </div>
                )}

                {showSuggestions && (
                  <div className="mt-3 grid gap-2">
                    {starterPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="rounded-full border border-white/10 bg-black/50 px-3 py-2 text-left text-xs text-zinc-300 transition hover:border-yellow-400/40 hover:text-white"
                      >
                        <span className="mr-2 text-yellow-400">
                          <FaMagic />
                        </span>
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              <div className="border-t border-white/10 bg-black/70 p-3">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask Nati AI anything..."
                    className="flex-1 bg-transparent px-2 py-1 text-sm text-white outline-none placeholder:text-zinc-500"
                  />
                  <button
                    onClick={() => sendMessage()}
                    disabled={loading}
                    className="rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 p-2.5 text-black transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label="Send message"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
