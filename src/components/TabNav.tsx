import { useState, useEffect } from 'react';
import { CheckCircle, Wrench, Map, BookOpen } from 'lucide-react';

export type TabId = 'checkin' | 'toolbox' | 'roadmap' | 'resources';

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'checkin', label: '打卡', icon: <CheckCircle size={16} /> },
  { id: 'toolbox', label: '工具箱', icon: <Wrench size={16} /> },
  { id: 'roadmap', label: '路线图', icon: <Map size={16} /> },
  { id: 'resources', label: '资料', icon: <BookOpen size={16} /> },
];

interface TabNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

export default function TabNav({ activeTab, onTabChange }: TabNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'sticky',
        top: '88px',
        zIndex: 90,
        background: scrolled ? 'rgba(5,5,7,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '12px 24px',
          display: 'flex',
          gap: '8px',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px 16px',
                borderRadius: '12px',
                border: 'none',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(255,0,204,0.15), rgba(51,51,255,0.15))'
                  : 'transparent',
                color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)',
                fontSize: '14px',
                fontWeight: isActive ? 700 : 600,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
                position: 'relative',
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: '20%',
                    width: '60%',
                    height: '2px',
                    background: 'linear-gradient(90deg, #ff00cc, #3333ff)',
                    borderRadius: '1px',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
