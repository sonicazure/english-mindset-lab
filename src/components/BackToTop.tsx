import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 800);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="回到顶部"
      className="back-to-top"
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        zIndex: 998,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: visible ? 'rgba(255,255,255,0.1)' : 'transparent',
        border: visible ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent',
        backdropFilter: visible ? 'blur(10px)' : 'none',
        WebkitBackdropFilter: visible ? 'blur(10px)' : 'none',
        cursor: visible ? 'pointer' : 'default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        color: '#fff',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <ArrowUp size={18} />
    </button>
  );
}
