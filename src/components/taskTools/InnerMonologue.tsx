import { useState, useCallback } from 'react';
import { getRandomScenes, type MonologueScene } from '@/data/innerMonologueScenes';
import { RefreshCw, Dices } from 'lucide-react';

const levelColor = {
  easy: '#00ff9d',
  medium: '#00ccff',
  hard: '#ff00cc',
};

const levelLabel = {
  easy: '简单',
  medium: '中等',
  hard: '进阶',
};

export default function InnerMonologue() {
  const [scenes, setScenes] = useState<MonologueScene[]>(() => getRandomScenes(3));

  const refresh = useCallback(() => {
    setScenes(getRandomScenes(3));
  }, []);

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
            今日内心独白场景
          </h4>
          <p
            style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.4)',
              margin: 0,
            }}
          >
            选择一个场景，用英语在脑中描述（不允许出现中文）
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {scenes.map((scene) => (
          <div
            key={scene.id}
            style={{
              padding: '16px',
              background: '#111113',
              borderRadius: '12px',
              border: `1px solid ${levelColor[scene.level]}20`,
              transition: 'all 0.3s ease',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '8px',
              }}
            >
              <Dices size={14} color={levelColor[scene.level]} />
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                {scene.scene}
              </span>
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  color: levelColor[scene.level],
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: `${levelColor[scene.level]}15`,
                }}
              >
                {levelLabel[scene.level]}
              </span>
            </div>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.5)',
                margin: 0,
                lineHeight: 1.6,
              }}
            >
              {scene.prompt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
