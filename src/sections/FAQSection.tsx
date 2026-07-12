import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, HelpCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: '我的打卡数据保存在哪里？',
    a: '所有数据保存在你浏览器的 localStorage 中，不会上传到任何服务器。这意味着你的隐私完全受保护，但也意味着如果你清除浏览器数据或换设备，进度会丢失。建议定期截图保存重要进度。',
  },
  {
    q: '如何重置所有进度？',
    a: '目前你可以通过清除浏览器本地存储来重置。在 Chrome 中按 F12 打开开发者工具，进入 Application > Local Storage，删除所有以 「english-mindset-」 开头的条目即可。我们会在后续版本中添加一键重置按钮。',
  },
  {
    q: '8周计划必须严格按照顺序执行吗？',
    a: '是的，强烈建议按 1→2→3→4 的顺序推进。每个阶段建立在前一阶段的基础上：先切断翻译依赖，再建立逻辑网，然后倒逼输出，最后实战冲刺。跳过前期阶段会导致后期训练效果大打折扣。',
  },
  {
    q: '我可以用手机访问这个页面吗？',
    a: '可以，页面已针对移动设备做了响应式适配。但由于首屏的 WebGL 流体特效对 GPU 要求较高，在低性能手机上会自动降级为静态渐变背景，确保浏览流畅。',
  },
  {
    q: '每天必须完成所有任务吗？',
    a: '每个阶段列出的任务是「每日任务」，建议尽量全部完成。如果时间有限，优先保证「内心独白」和「输入浸泡」这两项。关键是每天保持接触英语，哪怕只有10分钟，也比间断性的长时间学习有效。',
  },
  {
    q: 'YouTube / Cambly 在中国大陆访问不了怎么办？',
    a: '播客类资源可以搜索对应的中文平台替代品，比如用「每日英语听力」App 替代 All Ears English。语伴平台可以尝试 italki 或国内的口语练习 App。核心原则是找到你能稳定访问的英文输入/输出渠道，具体平台不重要。',
  },
  {
    q: '「脑中不出现中文」太难了，怎么办？',
    a: '这是正常的。起步阶段允许用极简英语代替，比如 「that thing」 「you know」 「how to say」。重点是**跳过中文翻译步骤**，哪怕说出来的英语很简陋。随着输入量增加，你的表达自然会丰富起来。',
  },
  {
    q: '8周结束后我的英语能达到什么水平？',
    a: '8周训练的目标是建立「英语直接思维回路」，让你在面对英语环境时不再经历「中文→翻译→英文」的过程。这不是词汇量或语法的提升，而是思维模式的根本性转变。配合持续的输入输出，你的口语流利度和反应速度会有质的飞跃。',
  },
];

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 4px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: '16px',
        }}
      >
        <span
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#ffffff',
            lineHeight: 1.5,
            flex: 1,
          }}
        >
          {item.q}
        </span>
        <ChevronDown
          size={18}
          color="rgba(255,255,255,0.4)"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.3s ease',
            flexShrink: 0,
          }}
        />
      </button>
      <div
        style={{
          maxHeight: isOpen ? '300px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s ease, opacity 0.3s ease',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p
          style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.8,
            paddingBottom: '20px',
            margin: 0,
          }}
        >
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.faq-container',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-container',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 20,
        background: '#050507',
        padding: '12vh 0',
      }}
    >
      <div
        className="faq-container"
        style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', opacity: 0 }}
      >
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
            <HelpCircle size={18} color="#00ccff" />
            <p
              className="font-mono"
              style={{
                fontSize: '12px',
                letterSpacing: '0.3em',
                color: '#00ccff',
                textTransform: 'uppercase',
              }}
            >
              FAQ / 常见问题
            </p>
          </div>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#ffffff',
            }}
          >
            Q & A
          </h2>
        </div>

        {/* FAQ List */}
        <div
          style={{
            background: '#111113',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '0 20px',
          }}
        >
          {faqs.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
