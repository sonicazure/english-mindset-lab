import { useEffect, useRef } from 'react';
import { timeOverview } from '@/data/planData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const phaseColors = ['#ff00cc', '#3333ff', '#00ccff', '#00ff9d'];

export default function TimeOverview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const rows = gsap.utils.toArray<HTMLElement>('.time-row');
      rows.forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: row,
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
      id="time-overview"
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
          <p
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '16px',
              textTransform: 'uppercase',
            }}
          >
            Daily Time Overview / 每日时间总览
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
            SCHEDULE
          </h2>
        </div>

        {/* Desktop table */}
        <div className="time-table-desktop">
          <div
            style={{
              borderRadius: '20px',
              border: '1px solid rgba(255,255,255,0.06)',
              overflow: 'hidden',
              background: '#111113',
            }}
          >
            {/* Table header */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '100px 120px 1fr',
                gap: '16px',
                padding: '20px 28px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              {['阶段', '日均投入', '核心动作'].map((h) => (
                <span
                  key={h}
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.6)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  {h}
                </span>
              ))}
            </div>

            {/* Table rows */}
            {timeOverview.map((row, index) => (
              <div
                key={index}
                className="time-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '100px 120px 1fr',
                  gap: '16px',
                  padding: '24px 28px',
                  borderBottom:
                    index < timeOverview.length - 1
                      ? '1px solid rgba(255,255,255,0.06)'
                      : 'none',
                  alignItems: 'center',
                  opacity: 0,
                  transition: 'background 0.3s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: phaseColors[index],
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: '#ffffff',
                    }}
                  >
                    {row.phase}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={14} color={phaseColors[index]} />
                  <span
                    style={{
                      fontSize: '15px',
                      color: phaseColors[index],
                      fontWeight: 600,
                    }}
                  >
                    {row.time}
                  </span>
                </div>

                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  {row.actions}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile cards */}
        <div className="time-table-mobile">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {timeOverview.map((row, index) => (
              <div
                key={index}
                className="time-row"
                style={{
                  padding: '20px',
                  background: '#111113',
                  borderRadius: '16px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  opacity: 0,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: phaseColors[index],
                      }}
                    />
                    <span
                      style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: '#fff',
                      }}
                    >
                      {row.phase}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={13} color={phaseColors[index]} />
                    <span
                      style={{
                        fontSize: '14px',
                        color: phaseColors[index],
                        fontWeight: 600,
                      }}
                    >
                      {row.time}
                    </span>
                  </div>
                </div>
                <p
                  style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.7)',
                    margin: 0,
                    lineHeight: 1.5,
                  }}
                >
                  {row.actions}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
