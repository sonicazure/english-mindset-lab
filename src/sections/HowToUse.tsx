import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  MousePointerClick,
  BarChart3,
  Radio,
  CalendarCheck,
  ArrowDown,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: <MousePointerClick size={24} />,
    title: '点击打卡任务',
    desc: '在「阶段演进矩阵」中，每个任务卡片都可以点击。完成任务后点击它，圆圈会变为勾选状态，进度条会自动更新。数据保存在浏览器本地，刷新页面不会丢失。',
    color: '#ff00cc',
  },
  {
    icon: <BarChart3 size={24} />,
    title: '追踪你的进度',
    desc: '每个阶段卡片顶部都有实时进度条。点击右下角的悬浮按钮可以展开「协议日报」面板，查看总体完成百分比、当前所处阶段和今日预计训练时长。',
    color: '#3333ff',
  },
  {
    icon: <Radio size={24} />,
    title: '从阶段一开始',
    desc: '严格按照 1→2→3→4 的顺序推进。第 1-2 周专注「断联期」，目标是脑中不出现中文。阶段检查点会帮你判断是否准备好进入下一阶段。',
    color: '#00ccff',
  },
  {
    icon: <CalendarCheck size={24} />,
    title: '使用推荐资源',
    desc: '「资源补给库」中的每个卡片都可以点击跳转到对应网站。播客用于日常输入，YouTube 频道用于影子跟读，语伴平台用于实战输出。按阶段使用，不要跳过。',
    color: '#00ff9d',
  },
];

export default function HowToUse() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.howto-item');
      items.forEach((item, i) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 88%',
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
      id="how-to-use"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 20,
        background: '#050507',
        padding: '12vh 0',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
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
            User Manual / 使用说明
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
            HOW TO USE
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
            四个步骤，快速上手你的英语思维植入训练舱
          </p>
        </div>

        {/* Steps */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '20px',
          }}
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="howto-item"
              style={{
                padding: '32px 24px',
                background: '#111113',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)',
                opacity: 0,
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${step.color}40`;
                e.currentTarget.style.boxShadow = `0 0 30px ${step.color}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Step number badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: `${step.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: '12px',
                    fontWeight: 700,
                    color: step.color,
                  }}
                >
                  {index + 1}
                </span>
              </div>

              {/* Icon */}
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${step.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: step.color,
                  marginBottom: '20px',
                }}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h4
                style={{
                  fontSize: '17px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '10px',
                }}
              >
                {step.title}
              </h4>

              {/* Description */}
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.5)',
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div
          style={{
            marginTop: '48px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <p
            style={{
              fontSize: '13px',
              color: 'rgba(255,255,255,0.3)',
            }}
          >
            向下滚动，开始你的训练计划
          </p>
          <div
            style={{
              animation: 'bounce 2s infinite',
            }}
          >
            <ArrowDown size={16} color="rgba(255,255,255,0.3)" />
          </div>
        </div>

        {/* Key reminder */}
        <div
          style={{
            marginTop: '48px',
            padding: '24px 28px',
            background: 'linear-gradient(135deg, rgba(255,0,204,0.08), rgba(51,51,255,0.08))',
            borderRadius: '16px',
            border: '1px solid rgba(255,0,204,0.15)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255,0,204,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ff00cc',
              flexShrink: 0,
              fontSize: '16px',
              fontWeight: 700,
            }}
          >
            !
          </div>
          <div>
            <p
              style={{
                fontSize: '15px',
                fontWeight: 600,
                color: '#ffffff',
                marginBottom: '6px',
              }}
            >
              重要提醒
            </p>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              这个网页的所有交互数据都保存在你的浏览器本地。如果你清除了浏览器数据，打卡记录会被重置。建议定期截图保存进度，或者持续使用同一个浏览器访问本页面。
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(6px);
          }
          60% {
            transform: translateY(3px);
          }
        }
      `}</style>
    </section>
  );
}
