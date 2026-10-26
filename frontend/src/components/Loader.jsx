import { useEffect, useState } from 'react';

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const statuses = ['INITIALIZING EXPERIENCE', 'LOADING TYPOGRAPHY', 'PREPARING SCENE', 'ALMOST READY'];

  useEffect(() => {
    let p = 0;
    const tick = setInterval(() => {
      p += Math.random() * 18 + 6;
      if (p >= 100) {
        p = 100;
        clearInterval(tick);
        setTimeout(() => { setDone(true); onDone?.(); }, 300);
      }
      setPct(Math.floor(p));
    }, 140);
    return () => clearInterval(tick);
  }, [onDone]);

  const status = statuses[Math.min(statuses.length - 1, Math.floor(pct / 28))];

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-bg flex flex-col items-center justify-center gap-4 transition-all duration-700 ${
        done ? 'opacity-0 invisible' : 'opacity-100 visible'
      }`}
    >
      <div className="mono text-sm tracking-[0.35em] font-semibold text-fg">CHRIS KING PRO</div>
      <div className="mono text-[10px] tracking-widest text-faint">{status}</div>
      <div className="w-52 h-px bg-line relative">
        <div className="absolute left-0 top-0 bottom-0 bg-gold transition-all duration-150" style={{ width: pct + '%' }} />
      </div>
      <div className="mono text-[10px] text-dim">{pct}%</div>
    </div>
  );
}
