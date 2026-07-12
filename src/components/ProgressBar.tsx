import { useEffect, useRef, useState } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(pct, 1));
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="页面滚动进度"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '3px',
        background: 'linear-gradient(90deg, #ff00cc, #3333ff, #00ccff)',
        zIndex: 9999,
        transformOrigin: 'left',
        transform: `scaleX(${progress})`,
        boxShadow:
          '0 0 10px rgba(255,0,204,0.5), 0 0 20px rgba(51,51,255,0.3)',
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
}
