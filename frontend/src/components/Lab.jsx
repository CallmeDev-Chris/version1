import { useEffect, useRef, useState } from 'react';

function MagneticButton() {
  const stageRef = useRef(null);
  const btnRef = useRef(null);
  const onMove = (e) => {
    const r = stageRef.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
    btnRef.current.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px)`;
  };
  const onLeave = () => { btnRef.current.style.transform = 'translate(0,0)'; };
  return (
    <div ref={stageRef} onMouseMove={onMove} onMouseLeave={onLeave} className="lab-stage">
      <div ref={btnRef} className="w-16 h-16 rounded-full border border-lineStrong flex items-center justify-center mono text-[9px] text-dim transition-transform duration-100">
        HOVER
      </div>
    </div>
  );
}

function Typography3D() {
  const stageRef = useRef(null);
  const [transform, setTransform] = useState({});
  const onMove = (e) => {
    const r = stageRef.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
    setTransform({ transform: `rotateY(${px * 50}deg) rotateX(${-py * 50}deg) translateZ(10px)` });
  };
  return (
    <div ref={stageRef} onMouseMove={onMove} onMouseLeave={() => setTransform({})} className="lab-stage">
      <div className="mono text-2xl font-bold" style={{ perspective: 400 }}>
        {'CKP'.split('').map((c, i) => (
          <span key={i} style={transform} className={`inline-block transition-transform duration-300 ${i === 1 ? 'text-gold' : ''}`}>{c}</span>
        ))}
      </div>
    </div>
  );
}

function ParticleSystem() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const stage = canvas.parentElement;
    let w = (canvas.width = stage.clientWidth), h = (canvas.height = stage.clientHeight);
    let mx = -999, my = -999;
    const pts = Array.from({ length: 40 }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3 }));
    const onMove = (e) => { const r = stage.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    const onLeave = () => { mx = -999; my = -999; };
    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', onLeave);
    let raf;
    function loop() {
      ctx.clearRect(0, 0, w, h);
      pts.forEach((p) => {
        const dx = p.x - mx, dy = p.y - my, d = Math.sqrt(dx * dx + dy * dy);
        if (d < 60) { p.vx += dx / d * 0.06; p.vy += dy / d * 0.06; }
        p.x += p.vx; p.y += p.vy; p.vx *= 0.98; p.vy *= 0.98;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath(); ctx.fillStyle = '#c9a24a'; ctx.globalAlpha = 0.7;
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2); ctx.fill();
      });
      raf = requestAnimationFrame(loop);
    }
    loop();
    return () => { cancelAnimationFrame(raf); stage.removeEventListener('mousemove', onMove); stage.removeEventListener('mouseleave', onLeave); };
  }, []);
  return <div className="lab-stage"><canvas ref={canvasRef} className="absolute inset-0 w-full h-full" /></div>;
}

function CursorPhysics() {
  const stageRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    let tx = 0, ty = 0, dx = 0, dy = 0, rx = 0, ry = 0, raf;
    const stage = stageRef.current;
    const onMove = (e) => { const r = stage.getBoundingClientRect(); tx = e.clientX - r.left - r.width / 2; ty = e.clientY - r.top - r.height / 2; };
    const onLeave = () => { tx = 0; ty = 0; };
    stage.addEventListener('mousemove', onMove);
    stage.addEventListener('mouseleave', onLeave);
    function loop() {
      dx += (tx - dx) * 0.25; dy += (ty - dy) * 0.25;
      rx += (tx - rx) * 0.1; ry += (ty - ry) * 0.1;
      if (dotRef.current) dotRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    }
    loop();
    return () => { cancelAnimationFrame(raf); stage.removeEventListener('mousemove', onMove); stage.removeEventListener('mouseleave', onLeave); };
  }, []);
  return (
    <div ref={stageRef} className="lab-stage">
      <div ref={ringRef} className="absolute w-6 h-6 rounded-full border border-goldDim top-1/2 left-1/2" />
      <div ref={dotRef} className="absolute w-2 h-2 rounded-full bg-fg top-1/2 left-1/2" />
    </div>
  );
}

const EXPERIMENTS = [
  { n: '01', t: 'Magnetic button', C: MagneticButton },
  { n: '02', t: '3D typography', C: Typography3D },
  { n: '03', t: 'Particle system', C: ParticleSystem },
  { n: '04', t: 'Cursor physics', C: CursorPhysics }
];

export default function Lab() {
  return (
    <section id="lab" className="max-w-[1240px] mx-auto px-6 md:px-10 py-32 md:py-40">
      <div className="flex items-baseline gap-4 mb-14">
        <span className="mono text-gold text-sm">03</span>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">The lab</h2>
        <div className="flex-1 h-px bg-line ml-2" />
      </div>
      <p className="mono text-[10px] text-faint mb-6">
        4 experiments ported here in full; the original prototype's remaining four (glass distortion, scroll physics,
        image displacement, WebGL object) follow the same pattern — see the code comments to add them.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
        {EXPERIMENTS.map(({ n, t, C }) => (
          <div key={n} className="bg-bg p-5 min-h-[230px] flex flex-col justify-between hover:bg-elev transition-colors">
            <div className="mono text-[10px] text-faint">{n}</div>
            <div className="text-sm mt-2">{t}</div>
            <div className="flex-1 mt-3 border border-line rounded-sm relative overflow-hidden flex items-center justify-center min-h-[120px] bg-elev/40 [&_.lab-stage]:relative [&_.lab-stage]:w-full [&_.lab-stage]:h-full [&_.lab-stage]:flex [&_.lab-stage]:items-center [&_.lab-stage]:justify-center">
              <C />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
