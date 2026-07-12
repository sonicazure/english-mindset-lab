import { useEffect, useRef } from 'react';
import FluidField from '@/components/FluidField';
import gsap from 'gsap';

export default function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.to(titleRef.current, {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power3.out',
    })
      .to(
        subtitleRef.current,
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .to(
        taglineRef.current,
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      .to(
        btnRef.current,
        {
          filter: 'blur(0px)',
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.4'
      );

    return () => {
      tl.kill();
    };
  }, []);

  const handleInit = () => {
    const target = document.getElementById('phase-matrix');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh', /* Use dvh to account for mobile URL bar */
        minHeight: '500px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <FluidField />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          padding: '0 20px',
          width: '100%',
          maxWidth: '900px',
        }}
      >
        <p
          ref={taglineRef}
          className="font-mono"
          style={{
            fontSize: 'clamp(9px, 1.2vw, 14px)',
            letterSpacing: '0.3em',
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '16px',
            opacity: 0,
            filter: 'blur(20px)',
            transform: 'translateY(30px)',
            textTransform: 'uppercase',
          }}
        >
          8-Week Neural Implant Protocol
        </p>

        <h1
          ref={titleRef}
          className="font-display"
          style={{
            fontSize: 'clamp(36px, 12vw, 160px)',
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: '#ffffff',
            marginBottom: '16px',
            opacity: 0,
            filter: 'blur(20px)',
            transform: 'translateY(30px)',
            textShadow: '0 0 60px rgba(255,0,204,0.3), 0 0 120px rgba(51,51,255,0.15)',
            wordBreak: 'keep-all',
          }}
        >
          QUANTUM
          <br />
          <span className="gradient-text">ENGLISH</span>
        </h1>

        <p
          ref={subtitleRef}
          style={{
            fontSize: 'clamp(16px, 3vw, 32px)',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '36px',
            opacity: 0,
            filter: 'blur(20px)',
            transform: 'translateY(30px)',
            letterSpacing: '0.1em',
          }}
        >
          8周思维植入协议
        </p>

        <button
          ref={btnRef}
          onClick={handleInit}
          style={{
            fontSize: '14px',
            fontWeight: 600,
            letterSpacing: '0.15em',
            padding: '16px 40px',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '50px',
            background: 'rgba(255,255,255,0.05)',
            color: '#ffffff',
            backdropFilter: 'blur(10px)',
            opacity: 0,
            filter: 'blur(20px)',
            transform: 'translateY(30px)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            minHeight: '48px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#ff00cc';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(255,0,204,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            e.currentTarget.style.boxShadow = 'none';
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.borderColor = '#ff00cc';
            e.currentTarget.style.background = 'rgba(255,0,204,0.1)';
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
          }}
        >
          初始化协议
        </button>
      </div>

      {/* Bottom gradient fade */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '200px',
          background: 'linear-gradient(to top, #050507 0%, transparent 100%)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
