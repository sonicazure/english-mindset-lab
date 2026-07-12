import { useState, useCallback } from 'react';
import { Search, X, Loader2, Globe } from 'lucide-react';
import { lookupObject } from '@/data/objectDictionary';

interface TranslateResult {
  translations: string[];
  source: 'api' | 'local';
}

/**
 * Call MyMemory free translation API (no API key needed).
 * Rate limit: ~1000 words/day per IP.
 */
async function translateViaAPI(text: string): Promise<string[] | null> {
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=zh-CN|en`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data.responseStatus !== 200) return null;
    const translated = data.responseData.translatedText;
    if (!translated || translated.toLowerCase() === text.toLowerCase()) return null;
    return [translated];
  } catch {
    return null;
  }
}

export default function ObjectNaming() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<TranslateResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setLoading(true);
    setSearched(false);

    // Try API first
    const apiResult = await translateViaAPI(trimmed);
    if (apiResult) {
      setResult({ translations: apiResult, source: 'api' });
    } else {
      // Fallback to local dictionary
      const localResult = lookupObject(trimmed);
      if (localResult) {
        setResult({ translations: localResult, source: 'local' });
      } else {
        setResult(null);
      }
    }

    setSearched(true);
    setLoading(false);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div
      style={{
        padding: '24px',
        background: '#0d0d0f',
        borderRadius: '16px',
        border: '1px solid rgba(0,204,255,0.15)',
      }}
    >
      <h4
        style={{
          fontSize: '16px',
          fontWeight: 700,
          color: '#fff',
          margin: '0 0 4px',
        }}
      >
        物品英文速查
      </h4>
      <p
        style={{
          fontSize: '12px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.4)',
          margin: '0 0 16px',
        }}
      >
        输入中文物品名称，联网翻译英文说法
      </p>

      {/* Search box */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '10px',
          }}
        >
          <Search size={16} color="rgba(255,255,255,0.3)" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入中文，如：桌子、手机、雨伞..."
            style={{
              flex: 1,
              padding: '12px 10px',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
            }}
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setResult(null);
                setSearched(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(255,255,255,0.3)',
                padding: '4px',
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          style={{
            padding: '12px 20px',
            borderRadius: '10px',
            border: 'none',
            background: loading
              ? 'rgba(255,255,255,0.1)'
              : 'linear-gradient(135deg, #00ccff, #3333ff)',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 700,
            cursor: loading ? 'wait' : 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {loading ? <Loader2 size={16} className="spin" /> : '翻译'}
        </button>
      </div>

      {/* Result */}
      {searched && (
        <div>
          {result ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {result.translations.map((en, i) => (
                <div
                  key={i}
                  style={{
                    padding: '14px 16px',
                    background: '#111113',
                    borderRadius: '10px',
                    border: '1px solid rgba(0,204,255,0.1)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '18px',
                      fontWeight: 700,
                      color: '#00ccff',
                    }}
                  >
                    {en}
                  </span>
                  {i === 0 && result.source === 'local' && (
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 600,
                        color: '#00ff9d',
                        marginLeft: '8px',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: 'rgba(0,255,157,0.1)',
                      }}
                    >
                      最常用
                    </span>
                  )}
                </div>
              ))}
              {result.source === 'api' && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginTop: '4px',
                  }}
                >
                  <Globe size={12} color="rgba(255,255,255,0.3)" />
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,0.3)',
                    }}
                  >
                    联网翻译结果，仅供参考
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                padding: '20px',
                textAlign: 'center',
                background: '#111113',
                borderRadius: '10px',
                border: '1px dashed rgba(255,255,255,0.1)',
              }}
            >
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.4)',
                  margin: 0,
                }}
              >
                未找到「{query}」的翻译
              </p>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.25)',
                  margin: '8px 0 0',
                }}
              >
                提示：尝试输入更简单的名称，如「桌子」而非「木质餐桌」
              </p>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
}
