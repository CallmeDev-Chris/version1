# Chris King Pro — React + Tailwind + Node

Converted from the single-file HTML prototype into a real two-part project:

```
chris-king-pro/
├── frontend/   Vite + React + Tailwind CSS
└── backend/    Express + Nodemailer (contact form → real email)
```

## What's fully ported

- Loader, glass nav with scroll state + active-link tracking
- Hero: 3D mouse-reactive name, typewriter role rotator, smooth scroll (Lenis)
- Custom cursor with magnetic label states (auto-disabled on touch)
- About: hover-triggered accordion panels (Frontend / UI-UX with skill bars / Web apps / Animation / Creative tech)
- Work: 6 project cards with magnetic 3D tilt
- Lab: 4 of the 8 original experiments fully working (Magnetic button, 3D typography, Particle system, Cursor physics) — the code pattern for the remaining four (glass distortion, scroll physics, image displacement, WebGL cube) is the same; see comments in `Lab.jsx`
- Gallery: hover-zoom grid, empty until you add real images (no placeholder tiles)
- Contact: infinite pause-on-hover social marquee with follower stats, and a real "Chat now" message form
- Chatbot: rule-based assistant with quick replies and a fallback to direct contact
- CV download: a real PDF at `frontend/public/cv.pdf` (generated from the portfolio's own content — swap it for your real CV anytime)
- Dark/light theme, persisted in localStorage, respecting system preference

## Running it

### 1. Backend (sends the real contact-form email)

```bash
cd backend
cp .env.example .env
# edit .env: for Gmail, SMTP_USER is your address and SMTP_PASS is an App Password
# (https://myaccount.google.com/apppasswords — needs 2FA enabled), not your normal password
npm install
npm run dev
```

The contact form now posts directly to Web3Forms (key is set in `Contact.jsx`, override with `VITE_WEB3FORMS_KEY`), so the backend is optional. It is only used if no Web3Forms key is set.
"email not configured yet" rather than pretending to send.

### 2. Frontend

```bash
cd frontend
cp .env.example .env      # points at the backend, defaults to localhost:4000
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Adding your own gallery images

Edit `frontend/src/components/Gallery.jsx` — fill the `GALLERY_IMAGES` array with real
image imports or URLs. Nothing shows until you add entries.

## Adding a hero background image/video

`Hero.jsx` has an empty background layer marked in the code — drop in a video or image
(e.g. via a CSS background or an `<img>`/`<video>` element inside that div) and it'll sit
behind the content with room for a bottom gradient to keep text readable.

## Deploying

- **Frontend**: `npm run build` in `frontend/` → deploy the `dist/` folder to Netlify, Vercel, GitHub Pages, etc.
- **Backend**: deploy `backend/` to any Node host (Render, Railway, Fly.io, a VPS...) and point
  the frontend's `VITE_API_BASE` at its public URL.

## Social links (Contact section)

Now includes GitHub, LinkedIn, Email, Instagram, Facebook, YouTube, TikTok, WhatsApp,
Linktree, Audiomack and SoundCloud — each with a brand-colored icon and a short description.
Edit `frontend/src/data/social.js` to fill in real URLs; entries with `url: '#'` are
placeholders. Real, external URLs open in a new tab.

Note: no website can make a click "auto-follow" someone on another platform — that's
blocked everywhere for security/privacy. Links here open the real profile, one click
away from following normally.

## Hero background (photo + live code scroll)

`frontend/public/hero-bg.jpg` — your photo, now used as the full hero background,
covering the whole section down through the Explore Work button.

Layered on top: `frontend/src/components/CodeRain.jsx`, an ambient scroll of real-looking
code snippets in low-opacity mono text, endlessly looping in independent columns behind
the hero content. Then a blurred, theme-aware dark gradient at the bottom so the hero
text stays readable in both dark and light mode.

Note: the uploaded photo is fairly low-resolution (225×225), so it'll look a little soft
stretched across a full-width hero, especially on large screens. Swap in a higher-res
version at `frontend/public/hero-bg.jpg` (same filename) whenever you have one.
