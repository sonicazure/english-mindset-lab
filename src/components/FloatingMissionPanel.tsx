import { useState } from 'react';
import { phases } from '@/data/planData';
import { useTaskStorage } from '@/hooks/useTaskStorage';
import { X, Target, Timer, TrendingUp, Flame, Calendar } from 'lucide-react';

export default function FloatingMissionPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { streak, getOverallProgress, targetDate, setTargetDate } =
    useTaskStorage();

  const totalTasks = phases.reduce((acc, p) => acc + p.tasks.length, 0);
  const overallProgress = getOverallProgress(totalTasks);

  const currentPhaseIndex = Math.min(
    Math.floor((overallProgress / 100) * 4),
    3
  );
  const currentPhase = phases[currentPhaseIndex];

  const daysUntilTarget = targetDate
    ? Math.max(
        0,
        Math.ceil(
          (new Date(targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        )
      )
    : null;

  if (!isOpen) {
    return (
      <div className="fab-container">
        {streak.current > 0 && (
          <div className="streak-badge">
            <Flame size={14} />
 <span>{streak.current} 天连胜</span>
          </div>
        )}
        <button
          onClick={() => setIsOpen(true)}
          aria-label="打开协议日报面板"
          className="fab-btn"
        >
          <Target size={22} color="#fff" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="panel-backdrop" onClick={() => setIsOpen(false)} />
      <div className="mission-panel">
        {/* Header */}
        <div className="mission-panel-header">
          <div>
            <p
              className="font-mono"
              style={{
                fontSize: '10px',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.5)',
                textTransform: 'uppercase',
                marginBottom: '2px',
              }}
            >
              Mission Control
            </p>
            <p style={{ fontSize: '15px', fontWeight: 700, color: '#fff' }}>
              协议日报
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="关闭面板"
            className="panel-close-btn"
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '16px 20px' }}>
          {/* Streak */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '16px',
              padding: '10px 14px',
              background: streak.current > 0 ? 'rgba(255,107,0,0.1)' : 'rgba(255,255,255,0.03)',
              borderRadius: '12px',
              border: streak.current > 0 ? '1px solid rgba(255,107,0,0.15)' : '1px solid transparent',
            }}
          >
            <Flame
              size={16}
              color={streak.current > 0 ? '#ff6b00' : 'rgba(255,255,255,0.3)'}
            />
            <div>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: streak.current > 0 ? '#ff6b00' : 'rgba(255,255,255,0.5)',
                }}
              >
                {streak.current > 0 ? `${streak.current} 天连胜` : '尚未开始连胜'}
              </span>
              {streak.longest > 0 && (
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.3)',
                    display: 'block',
                  }}
                >
                  最长纪录: {streak.longest} 天
                </span>
              )}
            </div>
          </div>

          {/* Overall progress */}
          <div style={{ marginBottom: '16px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <TrendingUp size={13} color="#00ff9d" />
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                  总体进度
                </span>
              </div>
              <span
 
                style={{ fontSize: '13px', fontWeight: 600, color: '#00ff9d' }}
              >
                {overallProgress}%
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: '4px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${overallProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #ff00cc, #3333ff, #00ccff)',
                  borderRadius: '2px',
                  transition: 'width 0.6s ease',
                }}
              />
            </div>
          </div>

          {/* Current phase */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '14px',
              padding: '10px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '10px',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: `${currentPhase.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                color: currentPhase.color,
              }}
            >
              {currentPhase.number}
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#fff', margin: 0 }}>
                {currentPhase.title}
              </p>
              <p
 
                style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', margin: 0 }}
              >
                {currentPhase.weeks}
              </p>
            </div>
          </div>

          {/* Today's time */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px',
            }}
          >
            <Timer size={13} color="#00ccff" />
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
              今日预计投入：
            </span>
            <span
 
              style={{ fontSize: '13px', fontWeight: 600, color: '#00ccff' }}
            >
              45min
            </span>
          </div>

          {/* Target date */}
          <div
            style={{
              padding: '12px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '10px',
              border: '1px dashed rgba(255,255,255,0.1)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '8px',
              }}
            >
              <Calendar size={12} color="rgba(255,255,255,0.4)" />
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>
                目标日期
              </span>
            </div>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '13px',
                fontFamily: 'JetBrains Mono, monospace',
                outline: 'none',
                cursor: 'pointer',
                minHeight: '40px',
              }}
            />
            {daysUntilTarget !== null && targetDate && (
              <p
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: daysUntilTarget <= 14 ? '#ff6b00' : '#00ccff',
                  marginTop: '6px',
                  marginBottom: 0,
                }}
              >
                距离出发还有 {daysUntilTarget} 天
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
