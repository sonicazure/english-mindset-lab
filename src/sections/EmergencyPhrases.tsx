import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MessageSquareQuote, Copy, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const phrases = [
  { en: 'Could you repeat that?', zh: '你能再说一遍吗？', scene: '没听清' },
  { en: "I'm not sure how to put this, but...", zh: '我不知道该怎么说，但是...', scene: '表达困难' },
  { en: 'What I mean is...', zh: '我的意思是...', scene: '澄清意思' },
  { en: 'Let me think for a second...', zh: '让我想一下...', scene: '需要思考时间' },
  { en: 'Sorry, I didn\'t catch that.', zh: '抱歉，我没听懂。', scene: '没听懂' },
  { en: 'Could you speak a little slower?', zh: '你能说慢一点吗？', scene: '语速太快' },
  { en: 'How do you say [word] in English?', zh: '[某个词]用英语怎么说？', scene: '不知道某个词' },
  { en: 'I\'m still learning English.', zh: '我还在学英语。', scene: '坦诚说明' },
  { en: 'Could you write that down?', zh: '你能写下来吗？', scene: '需要书面确认' },
  { en: 'Let me rephrase that.', zh: '我换一种说法。', scene: '重新表达' },
  { en: 'Actually, I meant to say...', zh: '实际上，我想说的是...', scene: '纠正自己' },
  { en: 'Can we pause for a moment?', zh: '我们能暂停一下吗？', scene: '需要暂停' },
  { en: 'I\'m not familiar with that word.', zh: '我不熟悉那个词。', scene: '遇到生词' },
  { en: 'Would you mind explaining that?', zh: '你介意解释一下吗？', scene: '需要解释' },
  { en: 'That\'s a good question.', zh: '这是个好问题。', scene: '争取思考时间' },
  { en: 'If I understand correctly...', zh: '如果我没理解错的话...', scene: '确认理解' },
  { en: 'Can I get back to you on that?', zh: '我能稍后回复你吗？', scene: '需要准备' },
  { en: 'To be honest with you...', zh: '坦白跟你说...', scene: '表达真实想法' },
  { en: 'I see what you mean.', zh: '我明白你的意思。', scene: '表示理解' },
  { en: 'By the way...', zh: '顺便说一下...', scene: '转移话题' },
];

export default function EmergencyPhrases() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.phrase-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.04,
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

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      // Fallback: silently fail
    }
  };

  return (
    <section
      id="emergency-phrases"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 20,
        background: '#050507',
        padding: '12vh 0',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '48px', textAlign: 'center' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '16px',
            }}
          >
            <MessageSquareQuote size={18} color="#ff00cc" />
            <p
              className="font-mono"
              style={{
                fontSize: '12px',
                letterSpacing: '0.3em',
                color: '#ff00cc',
                textTransform: 'uppercase',
              }}
            >
              Emergency Toolkit / 应急表达库
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
            BUFFER PHRASES
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.5)',
              marginTop: '12px',
              maxWidth: '600px',
              margin: '12px auto 0',
            }}
          >
            20个万能缓冲句，在真实对话中争取思考时间。点击句子可复制到剪贴板。
          </p>
        </div>

        {/* Phrases grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '12px',
          }}
        >
          {phrases.map((phrase, index) => (
            <div
              key={index}
              className="phrase-card"
              onClick={() => copyToClipboard(phrase.en, index)}
              style={{
                padding: '16px 20px',
                background: '#111113',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '12px',
                transition: 'all 0.3s ease',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,0,204,0.2)';
                e.currentTarget.style.background = '#161618';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.background = '#111113';
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,0,204,0.2)';
                e.currentTarget.style.background = '#161618';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.background = '#111113';
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#ffffff',
                    marginBottom: '4px',
                    lineHeight: 1.5,
                  }}
                >
                  {phrase.en}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.45)',
                    }}
                  >
                    {phrase.zh}
                  </span>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: phrase.scene === '没听清' ? '#ff00cc' :
                            phrase.scene === '需要思考时间' ? '#00ccff' :
                            phrase.scene === '表达困难' ? '#3333ff' : '#00ff9d',
                      opacity: 0.8,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {phrase.scene}
                  </span>
                </div>
              </div>
              <div
                style={{
                  flexShrink: 0,
                  marginTop: '2px',
                  color: copiedIndex === index ? '#00ff9d' : 'rgba(255,255,255,0.2)',
                  transition: 'color 0.3s ease',
                }}
              >
                {copiedIndex === index ? (
                  <Check size={16} />
                ) : (
                  <Copy size={14} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Hint */}
        <p
          style={{
            textAlign: 'center',
            fontSize: '13px',
            color: 'rgba(255,255,255,0.3)',
            marginTop: '24px',
          }}
        >
          建议每天挑3-5句背诵，直到能脱口而出
        </p>
      </div>
    </section>
  );
}
