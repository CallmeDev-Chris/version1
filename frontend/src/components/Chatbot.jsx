import { useRef, useState } from "react";

const RULES = [
  {
    test: /\b(hi|hello|hey|greetings|yo|sup)\b/i,
    reply:
      "Hey there! Good to see you. Ask me anything about Chris King Pro — his work, stack, or how to get in touch.",
  },
  {
    test: /\b(who (are|is)|about (you|chris)|what do you do)\b/i,
    reply:
      "Chris King Pro is a frontend developer and creative technologist. He builds interactive, modern web experiences. Philosophy: build it, break it, understand it, improve it.",
  },
  {
    test: /\b(skill|stack|tech|technolog|react|laravel|php|tailwind)\b/i,
    reply:
      "Chris works mainly with React, JavaScript, Tailwind CSS, PHP, Laravel and MySQL — plus Three.js, GSAP and WebGL for the Lab experiments.",
  },
  {
    test: /\b(project|work|portfolio|music|instax|isoko|library|clinic|school)\b/i,
    reply:
      "His selected work includes Chris King Music, InstaX, Isoko, a Library Management System, a Clinic System, and a School Management System.",
  },
  {
    test: /\b(contact|hire|reach|email|connect|whatsapp|freelance|available)\b/i,
    reply:
      "Best way to reach Chris directly: email kuzojean80@gmail.com, or use the social links in the Contact section.",
  },
  {
    test: /\b(other|additional|more (links|socials|platforms)|elsewhere|linktree|audiomack|soundcloud|tiktok|instagram)\b/i,
    reply:
      "You can also find Chris on Instagram, Facebook, YouTube, TikTok, Linktree, Audiomack and SoundCloud — all linked in the scrolling Contact section below.",
  },
  {
    test: /\b(price|cost|rate|budget|quote)\b/i,
    reply:
      "Pricing depends on project scope — best discussed directly with Chris. Want his contact details?",
  },
  {
    test: /\b(thank|thanks|thx)\b/i,
    reply: "You're welcome! Anything else you'd like to know?",
  },
];

const QUICK = ["About Chris", "His stack", "His projects", "Contact / hire"];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [greeted, setGreeted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const scrollToBottom = () =>
    setTimeout(
      () => scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight),
      50,
    );

  const botSay = (text) => {
    setTyping(true);
    setTimeout(
      () => {
        setTyping(false);
        setMessages((m) => [...m, { from: "bot", text }]);
        scrollToBottom();
      },
      450 + Math.min(1200, text.length * 10),
    );
  };

  const openPanel = () => {
    setOpen(true);
    if (!greeted) {
      setGreeted(true);
      setTimeout(
        () =>
          botSay(
            "Hey! I'm Chris's portfolio assistant. Ask me about his work, stack, or how to reach him.",
          ),
        300,
      );
    }
  };

  const handle = (text) => {
    setMessages((m) => [...m, { from: "user", text }]);
    scrollToBottom();
    const match = RULES.find((r) => r.test.test(text));
    if (match) {
      botSay(match.reply);
    } else {
      botSay(
        "I don't have a solid answer for that one — but Chris will. Want his direct contact?",
      );
      setTimeout(() => {
        setMessages((m) => [
          ...m,
          {
            from: "bot",
            text: "Reach Chris directly:\n• Email — kuzojean80@gmail.com\n• WhatsApp — via the Contact section",
          },
        ]);
        scrollToBottom();
      }, 1300);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const val = input.trim();
    if (!val) return;
    setInput("");
    handle(val);
  };

  return (
    <>
      <button
        onClick={() => (open ? setOpen(false) : openPanel())}
        data-cursor-label="CHAT"
        aria-label="Open chat assistant"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-fg text-bg flex items-center justify-center shadow-2xl hover:scale-105 hover:bg-gold transition-all z-[700]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="w-6 h-6"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>

      <div
        className={`fixed bottom-24 right-6 w-[340px] max-w-[calc(100vw-32px)] h-[460px] max-h-[calc(100vh-140px)] bg-bg border border-lineStrong rounded-sm shadow-2xl flex flex-col overflow-hidden z-[700] transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="px-4.5 py-4 border-b border-line bg-elev flex justify-between items-start">
          <div className="mono text-xs">
            CHRIS KING PRO
            <div className="text-[10px] text-faint mt-0.5">
              Assistant · usually replies instantly
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-dim hover:text-gold"
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4.5 py-4 flex flex-col gap-3"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`max-w-[84%] text-[12.5px] leading-relaxed px-3.5 py-2.5 rounded-xl whitespace-pre-line ${
                m.from === "bot"
                  ? "self-start bg-elev border border-line rounded-bl-sm"
                  : "self-end bg-fg text-bg rounded-br-sm"
              }`}
            >
              {m.text}
            </div>
          ))}
          {typing && (
            <div className="self-start flex gap-1 items-center bg-elev border border-line rounded-xl px-3.5 py-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-faint animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 flex-wrap px-4.5 pb-3">
          {QUICK.map((label) => (
            <button
              key={label}
              onClick={() => handle(label)}
              className="mono text-[10px] border border-lineStrong bg-elev text-dim rounded-full py-1.5 px-3 hover:text-fg hover:border-gold transition-colors"
            >
              {label}
            </button>
          ))}
        </div>

        <form
          onSubmit={onSubmit}
          className="flex gap-2 px-3.5 py-3 border-t border-line"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mono flex-1 bg-elev border border-line text-fg text-xs px-3 py-2.5 rounded-sm outline-none focus:border-gold"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            data-cursor-label="SEND"
            className="w-9 border border-lineStrong bg-fg text-bg rounded-sm hover:bg-gold transition-colors"
          >
            →
          </button>
        </form>
        <div className="mono text-[9.5px] text-faint px-4.5 pb-3.5">
          Not what you need?{" "}
          <a
            href="mailto:kuzojean80@gmail.com"
            className="text-gold hover:underline"
          >
            Email Chris
          </a>
          .
        </div>
      </div>
    </>
  );
}
