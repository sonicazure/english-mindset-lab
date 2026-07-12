import { useState, useCallback } from 'react';
import { englishDefinitions } from '@/data/planData';
import { RefreshCw, Eye, EyeOff } from 'lucide-react';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function EnglishDefinitions() {
  const [words, setWords] = useState(() => shuffle(englishDefinitions).slice(0, 5));
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const refresh = useCallback(() => {
    setWords(shuffle(englishDefinitions).slice(0, 5));
    setRevealed({});
  }, []);

  const toggleReveal = (word: string) => {
    setRevealed((prev) => ({ ...prev, [word]: !prev[word] }));
  };

  return (
    <div
      style={{
        padding: '24px',
        background: '#0d0d0f',
        borderRadius: '16px',
        border: '1px solid rgba(255,0,204,0.15)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div>
          <h4
            style={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#fff',
              margin: '0 0 4px',
            }}
          >
            今日英英释义词汇
          </h4>
          <p
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.4)',
              margin: 0,
            }}
          >
            尝试用英语在心里解释每个词的含义，然后点击揭示答案
          </p>
        </div>
        <button
          onClick={refresh}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <RefreshCw size={14} />
          换一批
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {words.map((item) => {
          const isRevealed = revealed[item.word];
          return (
            <div
              key={item.word}
              onClick={() => toggleReveal(item.word)}
              style={{
                padding: '14px 16px',
                background: '#111113',
                borderRadius: '10px',
                border: `1px solid ${isRevealed ? 'rgba(255,0,204,0.2)' : 'rgba(255,255,255,0.06)'}`,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: isRevealed ? '#ff00cc' : '#fff',
                  }}
                >
                  {item.word}
                </span>
                {isRevealed ? (
                  <EyeOff size={14} color="rgba(255,255,255,0.3)" />
                ) : (
                  <Eye size={14} color="rgba(255,255,255,0.3)" />
                )}
              </div>
              <div
                style={{
                  maxHeight: isRevealed ? '100px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease, opacity 0.3s ease',
                  opacity: isRevealed ? 1 : 0,
                }}
              >
                <p
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.55)',
                    margin: '8px 0 0',
                    lineHeight: 1.6,
                  }}
                >
                  {item.definition}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
