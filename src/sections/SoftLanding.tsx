import { useEffect, useRef } from 'react';
import { softLanding } from '@/data/planData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plane, FileText, MessageCircle, Brain } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const icons = [
  <FileText size={28} key="1" />,
  <MessageCircle size={28} key="2" />,
  <Brain size={28} key="3" />,
];

export default function SoftLanding() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.landing-item');
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="soft-landing"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 20,
        background: '#050507',
        padding: '15vh 0',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section header */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '16px',
            }}
          >
            <Plane size={20} color="#00ff9d" />
            <p
              className="font-mono"
              style={{
                fontSize: '12px',
                letterSpacing: '0.3em',
                color: '#00ff9d',
                textTransform: 'uppercase',
              }}
            >
              Soft Landing / 出国前软着陆
            </p>
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#ffffff',
            }}
          >
            PRE-DEPARTURE
            <br />
            <span style={{ color: '#00ff9d' }}>PROTOCOL</span>
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.5)',
              marginTop: '16px',
              maxWidth: '600px',
              margin: '16px auto 0',
            }}
          >
            第8周结束后到出发前，做这三件事
          </p>
        </div>

        {/* Landing items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {softLanding.map((item, index) => (
            <div
              key={index}
              className="landing-item"
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '24px',
                padding: '32px',
                background: '#111113',
                borderRadius: '16px',
                border: '1px solid rgba(0,255,157,0.1)',
                opacity: 0,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,255,157,0.3)';
                e.currentTarget.style.boxShadow =
                  '0 0 30px rgba(0,255,157,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(0,255,157,0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '14px',
                  background: 'rgba(0,255,157,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#00ff9d',
                  flexShrink: 0,
                }}
              >
                {icons[index]}
              </div>
              <div>
                <span
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.15em',
                    color: '#00ff9d',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Step 0{index + 1}
                </span>
                <p
                  style={{
                    fontSize: '16px',
                    color: 'rgba(255,255,255,0.8)',
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
