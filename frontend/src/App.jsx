import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useLenis } from './hooks/useLenis';
import CustomCursor from './components/CustomCursor';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Work from './components/Work';
import About from './components/About';
import Lab from './components/Lab';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';

export default function App() {
  const { theme, toggle } = useTheme();
  const [loaded, setLoaded] = useState(false);
  useLenis();

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      <CustomCursor />
      <Nav theme={theme} onToggleTheme={toggle} />
      <Hero />
      <Work />
      <About />
      <Lab />
      <Gallery />
      <Contact />
      <footer className="mono text-center py-9 text-[10px] text-faint tracking-wide">
        © 2026 Chris King Pro Made It  Built with React, Tailwind CSS &amp; Node
      </footer>
      <Chatbot />
    </>
  );
}
