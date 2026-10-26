import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) { dotRef.current.style.left = mx + 'px'; dotRef.current.style.top = my + 'px'; }
    };
    window.addEventListener('mousemove', onMove);

    let raf;
    function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (ringRef.current) { ringRef.current.style.left = rx + 'px'; ringRef.current.style.top = ry + 'px'; }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    function attachLabels() {
      document.querySelectorAll('[data-cursor-label]').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          if (labelRef.current) labelRef.current.textContent = el.getAttribute('data-cursor-label');
          ringRef.current?.classList.add('label');
          if (dotRef.current) dotRef.current.style.opacity = '0';
        });
        el.addEventListener('mouseleave', () => {
          ringRef.current?.classList.remove('label');
          if (dotRef.current) dotRef.current.style.opacity = '1';
        });
      });
    }
    // re-scan periodically since React re-renders add/remove elements dynamically
    attachLabels();
    const rescan = setInterval(attachLabels, 1000);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      clearInterval(rescan);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="uppercase" />
      </div>
    </>
  );
}
