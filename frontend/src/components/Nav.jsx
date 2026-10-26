import { useEffect, useState } from 'react';

const LINKS = [
  { id: 'work', num: '01', label: 'WORK' },
  { id: 'about', num: '02', label: 'ABOUT' },
  { id: 'lab', num: '03', label: 'LAB' },
  { id: 'gallery', num: '04', label: 'GALLERY' },
  { id: 'contact', num: '05', label: 'CONTACT' }
];

export default function Nav({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
      let current = '';
      LINKS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.4 && r.bottom > window.innerHeight * 0.2) current = id;
      });
      setActive(current);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-10 py-5 transition-all duration-300 border-b ${
        scrolled ? 'bg-bg/70 backdrop-blur-md border-line' : 'border-transparent'
      }`}
    >
      <div className="mono text-sm font-semibold tracking-wide text-fg">CHRIS KING PRO</div>
      <div className="flex items-center gap-8">
        <ul className="hidden md:flex gap-8 list-none">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`mono text-[11px] tracking-wide flex items-center gap-2 pb-1 border-b transition-colors ${
                  active === l.id ? 'text-fg border-gold' : 'text-dim border-transparent hover:text-fg'
                }`}
              >
                <span className="text-faint text-[10px]">{l.num}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={onToggleTheme}
          data-cursor-label="TOGGLE"
          aria-label="Toggle theme"
          className="w-8 h-8 rounded-full border border-lineStrong flex items-center justify-center text-fg hover:border-gold hover:rotate-180 transition-all duration-500"
        >
          {theme === 'dark' ? '◐' : '◑'}
        </button>
      </div>
    </nav>
  );
}
