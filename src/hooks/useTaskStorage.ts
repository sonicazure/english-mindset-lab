import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'english-mindset-tasks';
const STREAK_KEY = 'english-mindset-streak';
const LAST_VISIT_KEY = 'english-mindset-last-visit';
const TARGET_DATE_KEY = 'english-mindset-target-date';

export interface TaskState {
  [key: string]: boolean;
}

export interface StreakData {
  current: number;
  longest: number;
  history: string[]; // YYYY-MM-DD strings
}

function safeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Silently fail in private mode
  }
}

function getTodayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function isConsecutiveDay(prev: string, curr: string): boolean {
  const prevDate = new Date(prev + 'T00:00:00');
  const currDate = new Date(curr + 'T00:00:00');
  const diffMs = currDate.getTime() - prevDate.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays === 1;
}

export function useTaskStorage() {
  const [taskStates, setTaskStates] = useState<TaskState>(() =>
    safeGet<TaskState>(STORAGE_KEY, {})
  );

  const [streak, setStreak] = useState<StreakData>(() =>
    safeGet<StreakData>(STREAK_KEY, { current: 0, longest: 0, history: [] })
  );

  const [targetDate, setTargetDateState] = useState<string>(() =>
    safeGet<string>(TARGET_DATE_KEY, '')
  );

  // Sync to localStorage
  useEffect(() => {
    safeSet(STORAGE_KEY, taskStates);
  }, [taskStates]);

  useEffect(() => {
    safeSet(STREAK_KEY, streak);
  }, [streak]);

  useEffect(() => {
    safeSet(TARGET_DATE_KEY, targetDate);
  }, [targetDate]);

  // Check streak on mount
  useEffect(() => {
    const today = getTodayStr();
    const lastVisit = safeGet<string>(LAST_VISIT_KEY, '');

    if (lastVisit && lastVisit !== today) {
      // Day changed
      if (!isConsecutiveDay(lastVisit, today)) {
        // Streak broken
        setStreak((prev) => ({
          ...prev,
          current: 0,
        }));
      }
    }

    safeSet(LAST_VISIT_KEY, today);
  }, []);

  const toggleTask = useCallback((taskId: string) => {
    setTaskStates((prev) => {
      const next = { ...prev, [taskId]: !prev[taskId] };
      return next;
    });

    // Update streak when completing a task
    setTaskStates((prev) => {
      const isNowCompleted = !prev[taskId];
      if (isNowCompleted) {
        const today = getTodayStr();
        setStreak((prevStreak) => {
          if (prevStreak.history.includes(today)) {
            return prevStreak;
          }
          const newHistory = [...prevStreak.history, today];
          const newCurrent = prevStreak.current + 1;
          return {
            current: newCurrent,
            longest: Math.max(newCurrent, prevStreak.longest),
            history: newHistory,
          };
        });
      }
      return prev;
    });
  }, []);

  const setTargetDate = useCallback((date: string) => {
    setTargetDateState(date);
  }, []);

  const resetAll = useCallback(() => {
    setTaskStates({});
    setStreak({ current: 0, longest: 0, history: [] });
    safeSet(STORAGE_KEY, {});
    safeSet(STREAK_KEY, { current: 0, longest: 0, history: [] });
  }, []);

  const getOverallProgress = useCallback(
    (totalTasks: number) => {
      const completed = Object.values(taskStates).filter(Boolean).length;
      return totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;
    },
    [taskStates]
  );

  const getPhaseProgress = useCallback(
    (taskIds: string[]) => {
      const completed = taskIds.filter((id) => taskStates[id]).length;
      return taskIds.length > 0
        ? Math.round((completed / taskIds.length) * 100)
        : 0;
    },
    [taskStates]
  );

  return {
    taskStates,
    toggleTask,
    streak,
    targetDate,
    setTargetDate,
    resetAll,
    getOverallProgress,
    getPhaseProgress,
  };
}
