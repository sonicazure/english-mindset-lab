import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Share2, RotateCcw } from 'lucide-react';
import { useTaskStorage } from '@/hooks/useTaskStorage';
import { phases } from '@/data/planData';

gsap.registerPlugin(ScrollTrigger);

export default function CompletionCeremony() {
  const sectionRef = useRef<HTMLElement>(null);
  const { getOverallProgress, resetAll } = useTaskStorage();
  const totalTasks = phases.reduce((acc, p) => acc + p.tasks.length, 0);
  const progress = getOverallProgress(totalTasks);
  const isComplete = progress >= 100;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ceremony-card',
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ceremony-card',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleReset = () => {
    if (window.confirm('确定要重置所有进度吗？此操作不可撤销。')) {
      resetAll();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShare = async () => {
    const text = `我完成了「8周英语思维植入计划」的全部训练！从切断中文翻译依赖到建立英语直接思维，历时8周的渐进式训练终于完成。🧠✨`;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'English Mindset Lab',
          text,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(text + ' ' + window.location.href);
        alert('已复制到剪贴板！');
      }
    } catch {
      // User cancelled or share not supported
    }
  };

  if (!isComplete) {
    return (
      <section
        id="ceremony"
        ref={sectionRef}
        style={{
          position: 'relative',
          zIndex: 20,
          background: '#050507',
          padding: '8vh 0',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.3em',
              color: 'rgba(255,255,255,0.3)',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            Finish Line / 终点线
          </p>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
            完成全部任务后，这里将显示你的毕业证书
          </p>
          <div
            style={{
              width: '100%',
              height: '4px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '2px',
              marginTop: '20px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #ff00cc, #3333ff)',
                borderRadius: '2px',
                transition: 'width 0.6s ease',
              }}
            />
          </div>
          <p
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.3)',
              marginTop: '8px',
            }}
          >
            {progress}% 完成
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="ceremony"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 20,
        background: '#050507',
        padding: '12vh 0',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px' }}>
        <div
          className="ceremony-card"
          style={{
            background: 'linear-gradient(135deg, #111113, #0d0d0f)',
            borderRadius: '24px',
            border: '1px solid rgba(255,215,0,0.15)',
            padding: 'clamp(32px, 6vw, 48px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            opacity: 0,
          }}
        >
          {/* Decorative glow */}
          <div
            style={{
              position: 'absolute',
              top: '-60px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,215,0,0.12), transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #ffd70020, #ff00cc20)',
              border: '2px solid rgba(255,215,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
              color: '#ffd700',
            }}
          >
            <Award size={30} />
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: 900,
              color: '#ffd700',
              marginBottom: '8px',
              lineHeight: 1.2,
            }}
          >
            协议完成
          </h2>
          <p
            style={{
              fontSize: '15px',
              color: 'rgba(255,255,255,0.6)',
              marginBottom: '24px',
              lineHeight: 1.7,
            }}
          >
            你已完成全部 8 周英语思维植入训练。从切断翻译依赖到建立英语直接思维，你已经走完了完整的旅程。
          </p>

          {/* Stats */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '12px',
              marginBottom: '28px',
              padding: '16px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '14px',
            }}
          >
            <div>
              <p
 
                style={{ fontSize: '22px', fontWeight: 700, color: '#ffd700', margin: 0 }}
              >
                8
              </p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>
                周训练
              </p>
            </div>
            <div>
              <p
 
                style={{ fontSize: '22px', fontWeight: 700, color: '#ffd700', margin: 0 }}
              >
                {totalTasks}
              </p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>
                任务完成
              </p>
            </div>
            <div>
              <p
 
                style={{ fontSize: '22px', fontWeight: 700, color: '#ffd700', margin: 0 }}
              >
                100%
              </p>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', margin: '4px 0 0' }}>
                总体进度
              </p>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleShare}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '50px',
                border: '1px solid rgba(255,215,0,0.3)',
                background: 'rgba(255,215,0,0.1)',
                color: '#ffd700',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                touchAction: 'manipulation',
              }}
            >
              <Share2 size={16} />
              分享成就
            </button>
            <button
              onClick={handleReset}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '50px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.05)',
                color: 'rgba(255,255,255,0.6)',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                touchAction: 'manipulation',
              }}
            >
              <RotateCcw size={16} />
              重新开始
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
