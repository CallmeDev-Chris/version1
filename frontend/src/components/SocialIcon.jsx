// Simple, recognizable line/shape icons per platform, not traced copies of any
// official logo artwork — colored to match each brand so they read correctly at a glance.
export default function SocialIcon({ name, className }) {
  const props = { className, viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' };
  switch (name) {
    case 'GitHub':
      return (
        <svg {...props} fill="currentColor">
          <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .26.18.58.69.48A10 10 0 0 0 12 2z" />
        </svg>
      );
    case 'LinkedIn':
      return (
        <svg {...props} fill="currentColor">
          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001zM3 9h4v12H3zM9 9h3.6v1.7h.05c.5-.95 1.72-1.95 3.54-1.95 3.78 0 4.48 2.49 4.48 5.73V21h-4v-5.9c0-1.4-.03-3.2-1.95-3.2-1.96 0-2.26 1.53-2.26 3.1V21H9z" />
        </svg>
      );
    case 'Email':
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="M3.5 6.5 12 13l8.5-6.5" />
        </svg>
      );
    case 'Instagram':
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'Facebook':
      return (
        <svg {...props} fill="currentColor">
          <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.7c0-.93.26-1.56 1.6-1.56h1.7V3.14C15.9 3.02 15 2.94 13.94 2.94c-2.2 0-3.7 1.34-3.7 3.8v2.06H7.5v3.2h2.74v8z" />
        </svg>
      );
    case 'YouTube':
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2.5" y="5.5" width="19" height="13" rx="3" />
          <path d="M10.5 9.3v5.4l4.8-2.7z" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'TikTok':
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M15 3v10.8a3.6 3.6 0 1 1-2.8-3.5" />
          <path d="M15 3c.6 2.4 2.2 4 4.7 4.2" />
        </svg>
      );
    case 'WhatsApp':
      return (
        <svg {...props} fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.05-1.36A10 10 0 1 0 12 2zm5.7 14.2c-.24.68-1.4 1.3-1.93 1.35-.5.06-1.13.08-1.83-.11-.42-.12-.96-.3-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.28.57-.35.76-.35h.55c.18 0 .42-.07.65.5.24.6.82 2.02.9 2.17.07.14.11.32.02.51-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.29-.12.57.16.28.71 1.18 1.53 1.9 1.05.94 1.94 1.24 2.22 1.38.28.14.44.12.6-.07.17-.19.7-.82.89-1.1.19-.28.38-.23.63-.14.26.09 1.65.78 1.94.92.28.14.47.21.54.32.07.12.07.68-.17 1.35z" />
        </svg>
      );
    case 'Linktree':
      return (
        <svg {...props} fill="currentColor">
          <path d="M12 2 6 8h3v3.5L4 17h5v5h6v-5h5l-5-5.5V8h3z" />
        </svg>
      );
    case 'Audiomack':
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 15V9M8 18V6M12 20V4M16 18V6M20 15V9" strokeLinecap="round" />
        </svg>
      );
    case 'SoundCloud':
      return (
        <svg {...props} fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M2 14v3M5 12v5M8 10v7M11 8v9" strokeLinecap="round" />
          <path d="M13 17h6.5a3 3 0 0 0 .5-5.96A4.5 4.5 0 0 0 11.8 9.2" fill="none" />
        </svg>
      );
    default:
      return null;
  }
}
