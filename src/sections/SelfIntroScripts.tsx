import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Clock, Copy, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const intros = [
  {
    label: '15秒版',
    labelEn: 'ELEVATOR PITCH',
    duration: '15s',
    script: "Hi, I'm [Name]. I'm from [City/Country], and I'm here to study [Major] at [University]. Nice to meet you!",
    zh: '用于电梯偶遇、走廊寒暄等超短场景',
  },
  {
    label: '1分钟版',
    labelEn: 'STANDARD INTRO',
    duration: '1min',
    script: "Hey, I'm [Name]. I just arrived from [Country] last week. I'm a [Major] student at [University]. I chose this program because I'm really interested in [topic]. Back home, I used to [hobby/job]. I'm still getting used to everything here, especially [weather/food/transport]. What's your major?",
    zh: '用于课堂破冰、社团招新、宿舍初识等标准社交场景',
  },
  {
    label: '3分钟版',
    labelEn: 'FULL STORY',
    duration: '3min',
    script: "Hi, my name is [Name]. I grew up in [City, Country], where I [brief background about hometown]. I decided to come here because [reason for choosing this country/school]. I'm majoring in [Major], and what excites me most about it is [specific interest]. In my free time, I enjoy [hobby 1] and [hobby 2]. I'm hoping to [goal for this year]. I'm also looking for recommendations for [restaurants/clubs/activities] around campus. What about you — what's your story?",
    zh: '用于导师第一次见面、深度社交、语伴交流等需要展开对话的场景',
  },
];

const icebreakers = [
  'How do you like the city so far?',
  "What's your major?",
  'Where are you from originally?',
  'Have you found any good places to eat around here?',
  'What made you choose this university?',
];

export default function SelfIntroScripts() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.intro-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.intro-cards-container',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      // Silently fail
    }
  };

  return (
    <section
      id="self-intro"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 20,
        background: '#050507',
        padding: '12vh 0',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
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
            <User size={18} color="#3333ff" />
            <p
              className="font-mono"
              style={{
                fontSize: '12px',
                letterSpacing: '0.3em',
                color: '#3333ff',
                textTransform: 'uppercase',
              }}
            >
              Ice Breaker / 破冰脚本
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
            SELF INTRO
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
            3个版本的自我介绍 + 5个破冰问题。点击脚本可复制。
          </p>
        </div>

        {/* Intro cards */}
        <div className="intro-cards-container" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
          {intros.map((intro, index) => (
            <div
              key={index}
              className="intro-card"
              onClick={() => copyToClipboard(intro.script, index)}
              style={{
                padding: '28px',
                background: '#111113',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(51,51,255,0.25)';
                e.currentTarget.style.background = '#161618';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.background = '#111113';
              }}
              onTouchStart={(e) => {
                e.currentTarget.style.borderColor = 'rgba(51,51,255,0.25)';
                e.currentTarget.style.background = '#161618';
              }}
              onTouchEnd={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.background = '#111113';
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.15em',
                      color: '#3333ff',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    {intro.labelEn}
                  </span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '11px',
                      color: 'rgba(255,255,255,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <Clock size={10} />
                    {intro.duration}
                  </span>
                </div>
                <div
                  style={{
                    color: copiedIndex === index ? '#00ff9d' : 'rgba(255,255,255,0.2)',
                    transition: 'color 0.3s ease',
                  }}
                >
                  {copiedIndex === index ? <Check size={16} /> : <Copy size={14} />}
                </div>
              </div>

              <h4
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '8px',
                }}
              >
                {intro.label}
              </h4>

              <p
                style={{
                  fontSize: '15px',
                  color: 'rgba(255,255,255,0.7)',
                  lineHeight: 1.7,
                  marginBottom: '8px',
                  fontStyle: 'italic',
                }}
              >
                {intro.script}
              </p>

              <p
                style={{
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.4)',
                  margin: 0,
                }}
              >
                {intro.zh}
              </p>
            </div>
          ))}
        </div>

        {/* Icebreaker questions */}
        <div
          style={{
            padding: '28px',
            background: 'rgba(51,51,255,0.05)',
            borderRadius: '16px',
            border: '1px solid rgba(51,51,255,0.1)',
          }}
        >
          <h4
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '16px',
            }}
          >
            5个破冰问题（问别人）
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {icebreakers.map((q, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: '11px',
                    color: '#3333ff',
                    fontWeight: 600,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontSize: '15px',
                    color: 'rgba(255,255,255,0.75)',
                  }}
                >
                  {q}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
