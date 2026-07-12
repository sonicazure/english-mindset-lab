import PhaseMatrix from '@/sections/PhaseMatrix';
import MilestoneSection from '@/sections/MilestoneSection';
import CompletionCeremony from '@/sections/CompletionCeremony';
import { useTaskStorage } from '@/hooks/useTaskStorage';
import { phases } from '@/data/planData';

interface TabCheckinProps {
  onTaskToggle: (isCompleted: boolean) => void;
}

export default function TabCheckin({ onTaskToggle }: TabCheckinProps) {
  const { getOverallProgress } = useTaskStorage();
  const totalTasks = phases.reduce((acc, p) => acc + p.tasks.length, 0);
  const progress = getOverallProgress(totalTasks);

  return (
    <div>
      <PhaseMatrix onTaskToggle={onTaskToggle} />
      <MilestoneSection progress={progress} />
      <CompletionCeremony />
    </div>
  );
}
