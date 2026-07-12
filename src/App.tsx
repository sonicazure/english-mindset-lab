import { useState, useEffect, useRef, useCallback } from 'react';
import Navigation from '@/components/Navigation';
import DailyPhraseBar from '@/components/DailyPhraseBar';
import TabNav, { type TabId } from '@/components/TabNav';
import BackToTop from '@/components/BackToTop';
import FloatingMissionPanel from '@/components/FloatingMissionPanel';
import ToastContainer from '@/components/Toast';
import HeroSection from '@/sections/HeroSection';
import TabCheckin from '@/sections/TabCheckin';
import TabToolbox from '@/sections/TabToolbox';
import TabRoadmap from '@/sections/TabRoadmap';
import TabResources from '@/sections/TabResources';
import Footer from '@/sections/Footer';
import { useToast } from '@/hooks/useToast';
import { getNewlyUnlocked } from '@/data/milestones';
import { phases } from '@/data/planData';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('checkin');
  const { toasts, addToast, removeToast } = useToast();
  const prevProgressRef = useRef(0);
  const totalTasks = phases.reduce((acc, p) => acc + p.tasks.length, 0);

  // Calculate progress
  const getProgress = useCallback(() => {
    try {
      const saved = localStorage.getItem('english-mindset-tasks');
      const tasks = saved ? JSON.parse(saved) : {};
      const completed = Object.values(tasks).filter(Boolean).length;
      return totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;
    } catch {
      return 0;
    }
  }, [totalTasks]);

  // Initialize localStorage
  useEffect(() => {
    try {
      if (!localStorage.getItem('english-mindset-tasks')) {
        localStorage.setItem('english-mindset-tasks', '{}');
      }
    } catch {
      // localStorage may be unavailable
    }
    prevProgressRef.current = getProgress();
  }, [getProgress]);

  // Scroll to tab content on tab change
  const handleTabChange = (tab: TabId) => {
    setActiveTab(tab);
    const tabContent = document.getElementById('tab-content');
    if (tabContent) {
      tabContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleTaskToggle = useCallback(
    (isCompleted: boolean) => {
      if (isCompleted) {
        addToast('任务完成！继续保持', 'success');
        const progress = getProgress();
        const newMilestone = getNewlyUnlocked(
          prevProgressRef.current,
          progress
        );
        if (newMilestone) {
          setTimeout(() => {
            addToast(`成就解锁：${newMilestone.title}`, 'info', 3500);
          }, 600);
        }
        prevProgressRef.current = progress;
      } else {
        addToast('任务已取消', 'info');
      }
    },
    [addToast, getProgress]
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'checkin':
        return <TabCheckin onTaskToggle={handleTaskToggle} />;
      case 'toolbox':
        return <TabToolbox />;
      case 'roadmap':
        return <TabRoadmap />;
      case 'resources':
        return <TabResources />;
      default:
        return <TabCheckin onTaskToggle={handleTaskToggle} />;
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#050507',
        color: '#ffffff',
        position: 'relative',
      }}
    >
      <Navigation />
      <DailyPhraseBar />
      <BackToTop />
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      <main>
        {/* Hero - always visible */}
        <HeroSection />

        {/* Tab navigation */}
        <TabNav activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Tab content */}
        <div id="tab-content">
          {renderTabContent()}
        </div>
      </main>

      <Footer />
      <FloatingMissionPanel />
    </div>
  );
}

export default App;
