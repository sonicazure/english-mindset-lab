import { useEffect, useRef } from 'react';
import { milestones, getUnlockedMilestones } from '@/data/milestones';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Footprints, Zap, Target, Trophy, Mic, Flame, Crown, Lock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  footprints: <Footprints size={20} />,
  zap: <Zap size={20} />,
  target: <Target size={20} />,
  trophy: <Trophy size={20} />,
  mic: <Mic size={20} />,
  flame: <Flame size={20} />,
  crown: <Crown size={20} />,
};

export default function MilestoneSection({ progress }: { progress: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const unlockedIds = getUnlockedMilestones(progress).map((m) => m.id);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.milestone-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.06,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
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
      id="milestones"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 20,
        background: '#050507',
        padding: '10vh 0',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.4)',
              marginBottom: '12px',
              textTransform: 'uppercase',
            }}
          >
            Achievements / 成就徽章
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#ffffff',
            }}
          >
            MILESTONES
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: 'rgba(255,255,255,0.4)',
              marginTop: '8px',
            }}
          >
            已解锁 {unlockedIds.length} / {milestones.length} 个成就
          </p>
        </div>

        {/* Milestone grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '12px',
          }}
        >
          {milestones.map((m) => {
            const isUnlocked = unlockedIds.includes(m.id);
            return (
              <div
                key={m.id}
                className="milestone-card"
                style={{
                  padding: '20px 12px',
                  borderRadius: '14px',
                  border: `1px solid ${isUnlocked ? m.color + '30' : 'rgba(255,255,255,0.05)'}`,
                  background: isUnlocked ? m.color + '08' : 'rgba(255,255,255,0.02)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  opacity: 0,
                  cursor: isUnlocked ? 'default' : 'not-allowed',
                }}
                title={isUnlocked ? m.description : `需要 ${m.threshold}% 进度解锁`}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: isUnlocked ? m.color + '20' : 'rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 10px',
                    color: isUnlocked ? m.color : 'rgba(255,255,255,0.15)',
                    position: 'relative',
                  }}
                >
                  {iconMap[m.icon] || <Target size={20} />}
                  {!isUnlocked && (
                    <Lock
                      size={10}
                      style={{
                        position: 'absolute',
                        bottom: '2px',
                        right: '2px',
                        color: 'rgba(255,255,255,0.2)',
                      }}
                    />
                  )}
                </div>
                <p
                  style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: isUnlocked ? '#fff' : 'rgba(255,255,255,0.25)',
                    marginBottom: '4px',
                  }}
                >
                  {m.title}
                </p>
                <p
                  style={{
                    fontSize: '10px',
                    color: isUnlocked ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.15)',
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {m.threshold >= 100 ? '全部完成' : `${m.threshold}%`}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
