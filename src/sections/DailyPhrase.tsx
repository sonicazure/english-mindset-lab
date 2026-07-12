import { useState, useEffect, useRef } from 'react';
import { getTodayPhrase, dailyPhrases } from '@/data/dailyPhrases';
import { Copy, Check, RefreshCw, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DailyPhrase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [phrase, setPhrase] = useState(getTodayPhrase);
  const [copied, setCopied] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.daily-phrase-card',
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.daily-phrase-card',
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phrase.en);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Fallback: do nothing silently
    }
  };

  const handleShuffle = () => {
    setFlipped(true);
    setTimeout(() => {
      const random = dailyPhrases[Math.floor(Math.random() * dailyPhrases.length)];
      setPhrase(random);
      setFlipped(false);
    }, 250);
  };

  return (
    <section
      id="daily-phrase"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 20,
        background: '#050507',
        padding: '10vh 0',
      }}
    >
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px',
            }}
          >
            <Sparkles size={16} color="#ff00cc" />
            <p
              style={{
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.3em',
                color: '#ff00cc',
                textTransform: 'uppercase',
              }}
            >
              Daily Dose / 每日一句
            </p>
          </div>
        </div>

        {/* Card */}
        <div
          className="daily-phrase-card"
          style={{
            background: 'linear-gradient(135deg, #111113, #0d0d0f)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '32px',
            position: 'relative',
            overflow: 'hidden',
            opacity: 0,
            transition: 'transform 0.25s ease, opacity 0.25s ease',
            transform: flipped ? 'rotateX(90deg)' : 'rotateX(0)',
          }}
        >
          {/* Decorative gradient orb */}
          <div
            style={{
              position: 'absolute',
              top: '-40px',
              right: '-40px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,0,204,0.15), transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Context tag */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: '50px',
              background: 'rgba(255,0,204,0.1)',
              border: '1px solid rgba(255,0,204,0.15)',
              marginBottom: '16px',
            }}
          >
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#ff00cc',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {phrase.context}
            </span>
          </div>

          {/* English phrase */}
          <p
            style={{
              fontSize: 'clamp(18px, 3vw, 26px)',
              fontWeight: 600,
              color: '#ffffff',
              lineHeight: 1.5,
              marginBottom: '12px',
              fontStyle: 'italic',
            }}
          >
            「{phrase.en}」
          </p>

          {/* Chinese translation */}
          <p
            style={{
              fontSize: '15px',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.6,
              marginBottom: '24px',
            }}
          >
            {phrase.zh}
          </p>

          {/* Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              paddingTop: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handleCopy}
                className="phrase-action-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.03)',
                  color: copied ? '#00ff9d' : 'rgba(255,255,255,0.6)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  touchAction: 'manipulation',
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? '已复制' : '复制'}</span>
              </button>
              <button
                onClick={handleShuffle}
                className="phrase-action-btn"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.03)',
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  touchAction: 'manipulation',
                }}
              >
                <RefreshCw size={14} />
                <span>换一句</span>
              </button>
            </div>

            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.25)',
              }}
            >
              {new Date().toLocaleDateString('zh-CN', {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
