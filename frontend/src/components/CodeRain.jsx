import { useEffect, useRef } from 'react';

// Real-looking code fragments, on-brand (mono, low-opacity, gold/white) — not a neon
// "matrix rain" cliché. Each column loops independently for a subtle, ambient effect.
const SNIPPETS = [
  'const portfolio = {', "  developer: 'Chris King Pro',", "  stack: ['React','Node'],", '};',
  'function build() {', '  return <Experience />;', '}', 'export default App;',
  'useEffect(() => {', '  init();', '}, []);', 'const [state, setState] = useState();',
  'async function fetchData() {', '  const res = await fetch(url);', '  return res.json();', '}',
  'class Renderer {', '  constructor(scene) {', '    this.scene = scene;', '  }', '}',
  'git commit -m "ship it"', 'npm run build', 'import { useRef } from "react";',
  '.map((item, i) => (', '  <Card key={i} {...item} />', '))',
  'if (loading) return <Loader />;', 'const gold = "#c9a24a";',
  '<motion.div animate={{ y: 0 }} />', 'export const projects = [ ... ];'
];

function Column({ speed, delay, xPercent }) {
  const lines = useRef(
    Array.from({ length: 26 }, () => SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)])
  ).current;

  return (
    <div
      className="absolute top-0 mono text-[11px] leading-6 whitespace-nowrap select-none"
      style={{
        left: `${xPercent}%`,
        color: 'var(--fg)',
        opacity: 0.07,
        animation: `codeScroll ${speed}s linear infinite`,
        animationDelay: `${delay}s`
      }}
    >
      {lines.map((line, i) => (
        <div key={i} className={i % 7 === 0 ? 'text-gold' : ''} style={i % 7 === 0 ? { opacity: 1.6 } : undefined}>
          {line}
        </div>
      ))}
    </div>
  );
}

export default function CodeRain({ columns = 10 }) {
  const reduced = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ).current;

  if (reduced) return null;

  const cols = Array.from({ length: columns }, (_, i) => ({
    xPercent: (i / columns) * 100 + (Math.random() * 4 - 2),
    speed: 22 + Math.random() * 18,
    delay: -(Math.random() * 30)
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <style>{`
        @keyframes codeScroll {
          from { transform: translateY(-50%); }
          to { transform: translateY(0%); }
        }
      `}</style>
      {cols.map((c, i) => <Column key={i} {...c} />)}
    </div>
  );
}
