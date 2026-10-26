/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        elev: 'var(--bg-elev)',
        fg: 'var(--fg)',
        dim: 'var(--fg-dim)',
        faint: 'var(--fg-faint)',
        line: 'var(--border)',
        lineStrong: 'var(--border-strong)',
        gold: 'var(--gold)',
        goldDim: 'var(--gold-dim)'
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      }
    }
  },
  plugins: []
};
