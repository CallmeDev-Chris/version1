import { useRef, useState } from "react";
import { socialLinks } from "../data/social";
import SocialIcon from "./SocialIcon";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";
// Web3Forms access keys are public by design (safe in front-end code).
// Messages are delivered to the inbox the key was created for.
const W3F_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY || "31afff21-d637-42d3-a5df-c62203472568";

export default function Contact() {
  const trackRef = useRef(null);
  const [status, setStatus] = useState({ text: "", kind: "" });

  const pause = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "paused";
  };
  const resume = () => {
    if (trackRef.current) trackRef.current.style.animationPlayState = "running";
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ text: "Sending...", kind: "" });
    try {
      await new Promise((r) => setTimeout(r, 400));
      setStatus({ text: "Connecting...", kind: "" });
      const res = W3F_KEY
        ? await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              access_key: W3F_KEY,
              subject: "New message from your portfolio",
              from_name: data.name,
              ...data,
            }),
          })
        : await fetch(`${API_BASE}/api/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
      const json = await res.json().catch(() => ({}));
      if (res.ok && (json.ok || json.success)) {
        setStatus({ text: "Message sent ✓", kind: "ok" });
        form.reset();
      } else {
        throw new Error(json.error || "Request failed");
      }
    } catch (err) {
      setStatus({
        text: "Could not send — please try again or email directly.",
        kind: "err",
      });
    }
  };

  const doubled = [...socialLinks, ...socialLinks];

  return (
    <section id="contact" className="text-center pb-28">
      <div className="max-w-[1240px] mx-auto px-6 md:px-10">
        <div className="text-3xl md:text-6xl font-bold tracking-tight max-w-3xl mx-auto leading-tight">
          Let's build
          <br />
          something.
        </div>

        <div className="mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div
            ref={trackRef}
            className="flex gap-10 w-max"
            style={{ animation: "marquee 26s linear infinite" }}
          >
            {doubled.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target={s.url.startsWith("http") ? "_blank" : undefined}
                rel={
                  s.url.startsWith("http") ? "noopener noreferrer" : undefined
                }
                onMouseEnter={pause}
                onMouseLeave={resume}
                data-cursor-label={s.name === "Email" ? "MAIL" : "OPEN"}
                className="group flex items-center gap-3 flex-shrink-0 whitespace-nowrap"
              >
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{ background: s.bg }}
                >
                  <SocialIcon
                    name={s.name}
                    className="w-4 h-4"
                    style={{ color: "#fff" }}
                  />
                </span>
                <span className="mono text-xs text-dim group-hover:text-fg flex flex-col items-start gap-0.5 transition-colors">
                  <span>{s.name}</span>
                  <span className="text-[9px] text-faint">
                    {s.stat || s.desc}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
        <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>

        <div className="max-w-lg mx-auto mt-24 text-left">
          <div className="mono text-[11px] text-faint tracking-widest mb-5 flex gap-2 items-center">
            <span className="text-gold">05</span> CHAT NOW
          </div>
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <div className="flex gap-3 flex-wrap">
              <input
                name="name"
                required
                placeholder="NAME"
                className="mono flex-1 min-w-[160px] bg-elev border border-line text-fg text-sm px-4 py-3.5 rounded-sm outline-none focus:border-gold placeholder:text-faint placeholder:text-[11px]"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="EMAIL"
                className="mono flex-1 min-w-[160px] bg-elev border border-line text-fg text-sm px-4 py-3.5 rounded-sm outline-none focus:border-gold placeholder:text-faint placeholder:text-[11px]"
              />
            </div>
            <textarea
              name="message"
              required
              rows={4}
              placeholder="MESSAGE"
              className="mono bg-elev border border-line text-fg text-sm px-4 py-3.5 rounded-sm outline-none focus:border-gold placeholder:text-faint placeholder:text-[11px] resize-y"
            />
            <button
              type="submit"
              data-cursor-label="SEND"
              className="mono self-start mt-1 px-6 py-4 rounded-sm bg-fg text-bg border border-fg hover:bg-gold hover:border-gold transition-all"
            >
              SEND MESSAGE →
            </button>
          </form>
          <div
            className={`mono text-[11px] mt-4 min-h-[16px] ${status.kind === "ok" ? "text-gold" : status.kind === "err" ? "text-red-400" : "text-dim"}`}
          >
            {status.text}
          </div>
          <p className="mono text-[10px] text-faint mt-2">
            Sends straight to Chris’s inbox — no mail app opens.
          </p>
        </div>
      </div>
    </section>
  );
}
