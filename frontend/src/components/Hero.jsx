import { useEffect, useRef, useState } from "react";
import CodeRain from "./CodeRain";

const NAME = ["CHRIS", "KING", "PRO"];
const ROLES = ["FULL STACK DEVELOPER", "MUSIC ARTIST", "CHRIS KING PRO"];

export default function Hero() {
  const nameRef = useRef(null);
  const [role, setRole] = useState("");
  const [flip, setFlip] = useState(false);

  // 3D letter tilt toward the cursor
  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isTouch || reduced) return;

    function onMove(e) {
      const chars = nameRef.current?.querySelectorAll(".ch");
      if (!chars) return;
      chars.forEach((ch) => {
        const r = ch.getBoundingClientRect();
        const cx = r.left + r.width / 2,
          cy = r.top + r.height / 2;
        const dx = e.clientX - cx,
          dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 320;
        const strength = Math.max(0, 1 - dist / radius);
        const rotY = (dx / radius) * 34 * strength;
        const rotX = -(dy / radius) * 34 * strength;
        const z = strength * 46;
        ch.style.transform = `translateZ(${z}px) translateY(${strength * -6}px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
        ch.style.textShadow =
          strength > 0.08
            ? `0 ${8 + strength * 10}px ${20 + strength * 20}px rgba(201,162,74,${strength * 0.35})`
            : "none";
      });
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // typewriter role rotator
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setRole(ROLES[0]);
      return;
    }
    let ri = 0,
      ci = 0,
      deleting = false,
      timer;
    function step() {
      const word = ROLES[ri];
      if (!deleting) {
        ci++;
        setRole(word.slice(0, ci));
        if (ci === word.length) {
          timer = setTimeout(() => {
            deleting = true;
            step();
          }, 1400);
          return;
        }
      } else {
        ci--;
        setRole(word.slice(0, ci));
        if (ci === 0) {
          deleting = false;
          ri = (ri + 1) % ROLES.length;
          setFlip(true);
          timer = setTimeout(() => {
            setFlip(false);
            step();
          }, 260);
          return;
        }
      }
      timer = setTimeout(step, deleting ? 40 : 65);
    }
    step();
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden"
    >
      {/* Background: your photo, scrolling code, then a dark blurred gradient so text stays readable */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src="/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <CodeRain columns={10} />
        {/* bottom black, blurred fade */}
        <div
          className="absolute left-0 right-0 bottom-0 h-[45%]"
          style={{
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            maskImage: "linear-gradient(to bottom, transparent, black 55%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 55%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--bg) 35%, transparent) 0%, color-mix(in srgb, var(--bg) 55%, transparent) 45%, color-mix(in srgb, var(--bg) 93%, transparent) 100%)",
          }}
        />
      </div>

      <div className="max-w-[1240px] mx-auto w-full px-6 md:px-10">
        <div className="mono text-[11px] tracking-[0.12em] text-faint mb-6 flex items-center gap-2 perspective-[400px]">
          <span className="w-5 h-px bg-gold inline-block" />
          <span
            className={`inline-block transition-all duration-300 ${flip ? "opacity-0 -rotate-x-90" : "opacity-100"}`}
          >
            {role}
          </span>
          <span className="text-gold animate-pulse">|</span>
        </div>

        <h1
          ref={nameRef}
          className="name3d flex flex-wrap font-bold leading-[0.96] text-[48px] md:text-[90px] lg:text-[130px] tracking-tight select-none"
        >
          {NAME.map((word, wi) => (
            <span key={wi} className="flex mr-[0.28em]">
              {word.split("").map((c, ci) => (
                <span key={ci} className="ch inline-block">
                  {c}
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="mt-7 text-dim max-w-lg text-base md:text-lg">
          I build interactive digital experiences with modern web technologies —
          where the interface itself is part of the proof of skill.
        </p>

        <div className="mt-11 flex gap-4 flex-wrap">
          <a
            href="#work"
            data-cursor-label="GO"
            className="mono text-xs tracking-wide px-6 py-4 rounded-sm bg-fg text-bg border border-fg hover:bg-gold hover:border-gold transition-all inline-flex items-center gap-2 -translate-y-0 hover:-translate-y-0.5"
          >
            EXPLORE WORK →
          </a>
          <a
            href="/cv.pdf"
            download="chris-king-pro-cv.pdf"
            data-cursor-label="CV"
            className="mono text-xs tracking-wide px-6 py-4 rounded-sm border border-lineStrong text-fg bg-elev hover:border-gold transition-all inline-flex items-center gap-2"
          >
            DOWNLOAD CV ↓
          </a>
        </div>
      </div>

      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 mono text-[10px] text-faint tracking-widest flex flex-col items-center gap-2">
        <span>SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-gold to-transparent animate-pulse" />
      </div>
    </section>
  );
}
