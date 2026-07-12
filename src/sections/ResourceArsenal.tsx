import { useEffect, useRef } from 'react';
import { resources } from '@/data/planData';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BookOpen, Users, Tv, Podcast, ExternalLink, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  podcast: <Podcast size={24} />,
  youtube: <Tv size={24} />,
  tv: <Tv size={24} />,
  book: <BookOpen size={24} />,
  users: <Users size={24} />,
};

export default function ResourceArsenal() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.resource-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
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
      id="resources"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 20,
        background: '#050507',
        padding: '15vh 0',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section header */}
        <div style={{ marginBottom: '60px', textAlign: 'center' }}>
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
            Resource Arsenal / 资源补给库
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
            ARSENAL
          </h2>
        </div>

        {/* Resource grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '20px',
          }}
        >
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-card"
              style={{
                display: 'block',
                padding: '32px 28px',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)',
                textDecoration: 'none',
                color: 'inherit',
                opacity: 0,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '20px',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ff00cc',
                  }}
                >
                  {iconMap[resource.icon] || <BookOpen size={24} />}
                </div>
                <ExternalLink
                  size={16}
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                />
              </div>

              <h4
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '6px',
                }}
              >
                {resource.name}
              </h4>

              <span
                className="font-mono"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: '#00f0ff',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                {resource.type}
              </span>

              <p
                style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {resource.usage}
              </p>

              {resource.needsVpn && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '10px',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    background: 'rgba(255,107,0,0.08)',
                    border: '1px solid rgba(255,107,0,0.15)',
                  }}
                >
                  <Globe size={10} color="#ff6b00" />
                  <span
                    style={{
                      fontSize: '10px',
                      color: '#ff6b00',
                      fontWeight: 500,
                    }}
                  >
                    需翻墙访问
                  </span>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
