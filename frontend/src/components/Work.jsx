import { useRef } from "react";
import { projects } from "../data/projects";

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const onMove = (e) => {
    const card = cardRef.current;
    if (!card || window.matchMedia("(hover: none)").matches) return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    card.style.transform = `perspective(900px) rotateX(${-(py - 0.5) * 8}deg) rotateY(${(px - 0.5) * 8}deg) translateY(-2px)`;
    if (glowRef.current) {
      glowRef.current.style.left = px * 100 + "%";
      glowRef.current.style.top = py * 100 + "%";
    }
  };
  const onLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform =
        "perspective(900px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative border border-line rounded-sm p-8 md:p-11 bg-elev overflow-hidden transition-[border-color,box-shadow] duration-300 hover:border-lineStrong hover:shadow-2xl"
    >
      <div
        ref={glowRef}
        className="absolute w-96 h-96 rounded-full pointer-events-none blur-xl opacity-0 hover:opacity-20 -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle, var(--gold-dim), transparent 70%)",
        }}
      />
      <div className="relative z-10">
        <div className="mono text-gold text-[11px] tracking-wide">
          {project.id}
        </div>
        <div className="text-2xl md:text-4xl font-semibold mt-3 tracking-tight">
          {project.title}
        </div>
        <p className="text-dim mt-3 max-w-md text-sm">{project.desc}</p>
        <div className="flex gap-2.5 flex-wrap mt-6">
          {project.stack.map((s) => (
            <span
              key={s}
              className="mono text-[10px] border border-lineStrong rounded-full py-1.5 px-3 text-dim"
            >
              {s}
            </span>
          ))}
        </div>
        <a
          href="#"
          data-cursor-label="VIEW"
          className="mono text-xs mt-8 inline-flex items-center gap-2 text-fg group"
        >
          Explore case study
          <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
            ↗
          </span>
        </a>
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <section
      id="work"
      className="max-w-[1240px] mx-auto px-6 md:px-10 py-32 md:py-40"
    >
      <div className="flex items-baseline gap-4 mb-14">
        <span className="mono text-gold text-sm">01</span>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Selected work
        </h2>
        <div className="flex-1 h-px bg-line ml-2" />
      </div>
      <div className="flex flex-col gap-5">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
