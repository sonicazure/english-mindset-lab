import { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100,
        padding: '0 24px',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isScrolled ? 'rgba(5,5,7,0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px) saturate(1.2)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(1.2)' : 'none',
        borderBottom: isScrolled
          ? '1px solid rgba(255,255,255,0.06)'
          : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}
    >
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          color: '#fff',
        }}
      >
        <Brain size={20} color="#ff00cc" />
        <span
          style={{
            fontSize: '14px',
            fontWeight: 700,
            letterSpacing: '0.15em',
          }}
        >
          ENGLISH MINDSET LAB
        </span>
      </a>
    </nav>
  );
}
