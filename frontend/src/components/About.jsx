import { useRef, useState } from "react";
import { enjoyItems } from "../data/enjoy";

function ParticlePanel({ active }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const start = () => {
    const canvas = canvasRef.current;
    if (
      !canvas ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const ctx = canvas.getContext("2d");
    const parent = canvas.parentElement;
    const w = (canvas.width = parent.clientWidth);
    const h = (canvas.height = parent.clientHeight);
    const pts = Array.from({ length: 22 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));
    function loop() {
      ctx.clearRect(0, 0, w, h);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = "rgba(201,162,74,0.4)";
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(loop);
    }
    loop();
  };

  const stop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  };

  if (active && !rafRef.current) setTimeout(start, 0);
  if (!active) stop();

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
    />
  );
}

export default function About() {
  const [openKey, setOpenKey] = useState(null);
  const isTouch =
    typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  return (
    <section
      id="about"
      className="max-w-[1240px] mx-auto px-6 md:px-10 py-32 md:py-40"
    >
      <div className="flex items-baseline gap-4 mb-14">
        <span className="mono text-gold text-sm">02</span>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          About
        </h2>
        <div className="flex-1 h-px bg-line ml-2" />
      </div>

      <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-16">
        <p className="text-xl md:text-2xl leading-relaxed max-w-lg">
          I'm Chris King Pro, a developer focused on building{" "}
          <span className="text-gold">interactive</span> and modern web
          experiences — from full-stack applications to small browser
          experiments most people never see the code behind.
        </p>

        <ul className="flex flex-col mono">
          {enjoyItems.map((item) => {
            const open = openKey === item.key;
            const handlers = isTouch
              ? { onClick: () => setOpenKey(open ? null : item.key) }
              : {
                  onMouseEnter: () => setOpenKey(item.key),
                  onMouseLeave: () => setOpenKey(null),
                };
            return (
              <li key={item.key} className="border-b border-line" {...handlers}>
                <button
                  type="button"
                  onClick={() => setOpenKey(open ? null : item.key)}
                  aria-expanded={open}
                  className={`w-full text-sm py-3.5 flex justify-between items-center transition-all ${
                    open ? "text-fg pl-2" : "text-dim hover:text-fg hover:pl-2"
                  }`}
                >
                  <span>{item.label}</span>
                  <span className={open ? "text-gold" : "text-faint"}>
                    {item.num}
                  </span>
                </button>
                <div
                  className={`relative overflow-hidden transition-all duration-500 ${open ? "max-h-56" : "max-h-0"}`}
                >
                  <ParticlePanel active={open} />
                  <div className="relative z-10 flex flex-wrap gap-2.5 pt-1.5 pb-5 pl-2">
                    {item.chips.map((chip) => (
                      <div
                        key={chip.name}
                        className={`flex items-center gap-2 text-[11px] border border-lineStrong rounded-full bg-elev text-dim ${
                          chip.level
                            ? "flex-col items-start gap-1.5 py-2.5 px-3.5 min-w-[118px]"
                            : "py-1.5 px-3"
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-goldDim text-bg flex items-center justify-center text-[9px] font-bold">
                          {chip.icon}
                        </span>
                        {chip.name}
                        {chip.level && (
                          <span className="w-full h-[3px] bg-line rounded overflow-hidden block">
                            <span
                              className="block h-full bg-gold"
                              style={{ width: `${chip.level}%` }}
                            />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
