import { useState } from 'react';
import { getTodayPhrase, dailyPhrases } from '@/data/dailyPhrases';
import { Copy, Check, RefreshCw } from 'lucide-react';

export default function DailyPhraseBar() {
  const [phrase, setPhrase] = useState(getTodayPhrase);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phrase.en);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Silently fail
    }
  };

  const handleShuffle = () => {
    const random = dailyPhrases[Math.floor(Math.random() * dailyPhrases.length)];
    setPhrase(random);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '56px',
        left: 0,
        width: '100%',
        zIndex: 99,
        background: 'linear-gradient(135deg, #ff00cc10, #3333ff10)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
        }}
      >
        {/* Label */}
        <span
          style={{
            fontSize: '11px',
            fontWeight: 600,
            color: '#ff00cc',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            flexShrink: 0,
          }}
        >
          Daily
        </span>

        {/* Context tag */}
        <span
          style={{
            fontSize: '10px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.4)',
            padding: '2px 8px',
            borderRadius: '4px',
            background: 'rgba(255,255,255,0.05)',
            flexShrink: 0,
          }}
        >
          {phrase.context}
        </span>

        {/* English phrase */}
        <p
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: '#ffffff',
            flex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            margin: 0,
            fontStyle: 'italic',
          }}
        >
          {phrase.en}
        </p>

        {/* Chinese - hidden on mobile */}
        <p
          className="phrase-bar-zh"
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.4)',
            margin: 0,
            flexShrink: 0,
          }}
        >
          {phrase.zh}
        </p>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
          <button
            onClick={handleCopy}
            title="复制"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: copied ? '#00ff9d' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.2s ease',
            }}
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
          </button>
          <button
            onClick={handleShuffle}
            title="换一句"
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255,255,255,0.4)',
              transition: 'all 0.2s ease',
            }}
          >
            <RefreshCw size={13} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .phrase-bar-zh { display: none !important; }
        }
      `}</style>
    </div>
  );
}
