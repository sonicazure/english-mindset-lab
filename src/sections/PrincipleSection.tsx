import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { principles } from '@/data/planData';

gsap.registerPlugin(ScrollTrigger);

function splitTextToChars(text: string) {
  const words = text.split(' ');
  return words.map((word, wi) => (
    <span key={wi} className="word" style={{ marginRight: '0.3em' }}>
      {word.split('').map((char, ci) => (
        <span key={ci} className="char">
          {char}
        </span>
      ))}
    </span>
  ));
}

export default function PrincipleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const triggeredRef = useRef<Set<HTMLElement>>(new Set());

  useEffect(() => {
    const ctx = gsap.context(() => {
      const textElements = gsap.utils.toArray<HTMLElement>('.principle-text');

      textElements.forEach((element) => {
        const chars = element.querySelectorAll('.char');

        gsap.set(chars, {
          opacity: 0,
          rotationX: -90,
          transformOrigin: 'center bottom',
        });

        ScrollTrigger.create({
          trigger: element,
          start: 'top bottom',
          end: 'bottom center',
          onEnter: () => {
            if (triggeredRef.current.has(element)) return;
            triggeredRef.current.add(element);
            animateTextIn(element);
          },
          onEnterBack: () => {
            animateTextIn(element);
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const animateTextIn = (element: HTMLElement) => {
    const chars = element.querySelectorAll('.char');
    gsap.set(chars, {
      opacity: 0,
      rotationX: -90,
      transformOrigin: 'center bottom',
    });
    gsap.to(chars, {
      duration: 1.5,
      ease: 'back.out(1.2)',
      opacity: 1,
      rotationX: 0,
      yPercent: 0,
      stagger: 0.04,
      startAt: {
        yPercent: (_pos: number) => _pos * 8,
      },
    });
  };

  return (
    <section
      id="principles"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 20,
        background: '#050507',
        padding: '15vh 0',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <p
            className="font-mono"
            style={{
              fontSize: '12px',
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '16px',
              textTransform: 'uppercase',
            }}
          >
            Core Protocol / 硬规则核心
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#ffffff',
            }}
          >
            THE CORE
          </h2>
        </div>

        {/* 3D Perspective text principles */}
        <div className="principle-container" style={{ perspective: '1000px' }}>
          {principles.map((principle, index) => (
            <div
              key={index}
              style={{
                marginBottom: index < principles.length - 1 ? '120px' : '0',
                position: 'relative',
              }}
            >
              {/* Large 3D text */}
              <div
                className="principle-text font-display"
                style={{
                  fontSize: 'clamp(40px, 14vw, 200px)',
                  fontWeight: 900,
                  lineHeight: 1,
                  color: '#ffffff',
                  marginBottom: '32px',
                  letterSpacing: '-0.02em',
                  textShadow: '0 0 60px rgba(255,0,204,0.2)',
                  transformStyle: 'preserve-3d',
                  overflowWrap: 'break-word',
                  wordBreak: 'break-word',
                }}
              >
                {splitTextToChars(principle.titleEn)}
              </div>

              {/* Chinese title */}
              <h3
                style={{
                  fontSize: 'clamp(20px, 3vw, 32px)',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '20px',
                  lineHeight: 1.4,
                }}
              >
                {principle.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 'clamp(15px, 1.8vw, 18px)',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.8,
                  maxWidth: '700px',
                }}
              >
                {principle.content}
              </p>

              {/* Decorative line */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-60px',
                  left: 0,
                  width: '100%',
                  height: '1px',
                  background:
                    'linear-gradient(90deg, rgba(255,0,204,0.3), rgba(51,51,255,0.3), transparent)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
