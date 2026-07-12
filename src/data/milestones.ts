export interface Milestone {
  id: string;
  title: string;
  description: string;
  threshold: number; // percentage 0-100
  icon: string;
  color: string;
}

export const milestones: Milestone[] = [
  {
    id: 'first-step',
    title: '迈出第一步',
    description: '完成了第一个任务',
    threshold: 1,
    icon: 'footprints',
    color: '#00ff9d',
  },
  {
    id: 'phase-1-complete',
    title: '断联成功',
    description: '完成了阶段一的所有任务',
    threshold: 25,
    icon: 'zap',
    color: '#ff00cc',
  },
  {
    id: 'quarter-way',
    title: '四分之一',
    description: '完成了 25% 的训练计划',
    threshold: 25,
    icon: 'target',
    color: '#3333ff',
  },
  {
    id: 'half-way',
    title: '半程马拉松',
    description: '完成了 50% 的训练计划',
    threshold: 50,
    icon: 'trophy',
    color: '#00ccff',
  },
  {
    id: 'phase-3-complete',
    title: '输出达人',
    description: '完成了阶段三的所有任务',
    threshold: 75,
    icon: 'mic',
    color: '#ff6b00',
  },
  {
    id: 'almost-there',
    title: '冲刺阶段',
    description: '完成了 90% 的训练计划',
    threshold: 90,
    icon: 'flame',
    color: '#ff00cc',
  },
  {
    id: 'all-complete',
    title: '思维植入完成',
    description: '完成了全部 8 周训练计划',
    threshold: 100,
    icon: 'crown',
    color: '#ffd700',
  },
];

/**
 * Get unlocked milestones based on current progress percentage.
 */
export function getUnlockedMilestones(progress: number): Milestone[] {
  return milestones.filter((m) => progress >= m.threshold);
}

/**
 * Get the latest newly unlocked milestone.
 * Call this after progress changes to detect new unlocks.
 */
export function getNewlyUnlocked(
  prevProgress: number,
  currentProgress: number
): Milestone | null {
  for (let i = milestones.length - 1; i >= 0; i--) {
    const m = milestones[i];
    if (currentProgress >= m.threshold && prevProgress < m.threshold) {
      return m;
    }
  }
  return null;
}
