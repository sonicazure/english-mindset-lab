import { useEffect, useRef, useCallback, useState } from 'react';
import { phases } from '@/data/planData';
import { useTaskStorage } from '@/hooks/useTaskStorage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Circle, Zap, ChevronDown, ExternalLink } from 'lucide-react';
import InnerMonologue from '@/components/taskTools/InnerMonologue';
import ObjectNaming from '@/components/taskTools/ObjectNaming';
import EnglishDefinitions from '@/components/taskTools/EnglishDefinitions';

gsap.registerPlugin(ScrollTrigger);

function TaskCard({
  task,
  phaseColor,
  isCompleted,
  onToggle,
  toolExpanded,
  onToolToggle,
  toolComponent,
}: {
  task: (typeof phases)[0]['tasks'][0];
  phaseColor: string;
  isCompleted: boolean;
  onToggle: () => void;
  toolExpanded?: boolean;
  onToolToggle?: () => void;
  toolComponent?: React.ReactNode;
}) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--x', `${x}px`);
    e.currentTarget.style.setProperty('--y', `${y}px`);
  };

  // Click card body → expand/collapse tool (if has tool)
  const handleCardClick = () => {
    if (toolComponent && onToolToggle) {
      onToolToggle();
    }
  };

  // Click check circle → toggle completion
  const handleCircleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onToggle();
  };

  // Click task name → toggle completion
  const handleNameClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    onToggle();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div
        className="task-card"
        onMouseMove={handleMouseMove}
        onClick={handleCardClick}
        role="button"
        aria-pressed={isCompleted}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        style={{
          padding: '28px',
          borderRadius: '12px',
          cursor: toolComponent ? 'pointer' : 'default',
          transition: 'all 0.3s ease',
          border: isCompleted
            ? `1px solid ${phaseColor}40`
            : toolExpanded
              ? `1px solid ${phaseColor}60`
              : '1px solid rgba(255,255,255,0.06)',
          background: isCompleted ? `${phaseColor}08` : '#111113',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Check circle - click to toggle completion */}
            <div
              onClick={handleCircleClick}
              role="checkbox"
              aria-checked={isCompleted}
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                border: isCompleted
                  ? `2px solid ${phaseColor}`
                  : '2px solid rgba(255,255,255,0.2)',
                background: isCompleted ? phaseColor : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              {isCompleted && <Check size={14} color="#050707" strokeWidth={3} />}
            </div>
            {/* Task name - click to toggle completion */}
            <span
              onClick={handleNameClick}
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: isCompleted ? 'rgba(255,255,255,0.5)' : '#ffffff',
                textDecoration: isCompleted ? 'line-through' : 'none',
                textDecorationColor: phaseColor,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
            >
              {task.name}
            </span>
          </div>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 600,
              color: phaseColor,
              letterSpacing: '0.05em',
              opacity: 0.8,
            }}
          >
            {task.time}
          </span>
        </div>

        <p
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.6,
            marginBottom: '8px',
          }}
        >
          {task.description}
        </p>

        <p
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.4)',
            fontStyle: 'italic',
            lineHeight: 1.5,
          }}
        >
          {task.action}
        </p>
      </div>

      {/* Tool expansion area */}
      {toolComponent && (
        <div
          style={{
            maxHeight: toolExpanded ? '1200px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.5s ease, opacity 0.3s ease',
            opacity: toolExpanded ? 1 : 0,
          }}
        >
          {toolComponent}
        </div>
      )}
    </div>
  );
}

interface PhaseMatrixProps {
  onTaskToggle?: (isCompleted: boolean) => void;
}

export default function PhaseMatrix({ onTaskToggle }: PhaseMatrixProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { taskStates, toggleTask, getPhaseProgress } = useTaskStorage();

  // Tool expansion state for phase 1 tasks
  const [expandedTools, setExpandedTools] = useState<Record<string, boolean>>({
    'p1-t1': true, // Default expand inner monologue
  });

  const getInitialExpanded = () => {
    for (let i = 0; i < phases.length; i++) {
      const progress = getPhaseProgress(phases[i].tasks.map((t) => t.id));
      if (progress < 100) {
        return { [i]: true };
      }
    }
    return { 0: true };
  };

  const [expanded, setExpanded] = useState<Record<number, boolean>>(getInitialExpanded);

  useEffect(() => {
    const ctx = gsap.context(() => {
      phases.forEach((_, index) => {
        const el = document.getElementById(`phase-card-${index}`);
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = useCallback(
    (taskId: string) => {
      const willBeCompleted = !taskStates[taskId];
      toggleTask(taskId);
      onTaskToggle?.(willBeCompleted);
    },
    [toggleTask, taskStates, onTaskToggle]
  );

  const toggleExpand = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleTool = (taskId: string) => {
    setExpandedTools((prev) => ({ ...prev, [taskId]: !prev[taskId] }));
  };

  // Map task IDs to their tool components
  const getToolComponent = (taskId: string): React.ReactNode | undefined => {
    switch (taskId) {
      case 'p1-t1':
        return <InnerMonologue />;
      case 'p1-t2':
        return <ObjectNaming />;
      case 'p1-t3':
        return <EnglishDefinitions />;
      case 'p1-t4':
        return (
          <div
            style={{
              padding: '24px',
              background: '#0d0d0f',
              borderRadius: '16px',
              border: '1px solid rgba(255,0,204,0.15)',
              textAlign: 'center',
            }}
          >
            <h4
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#fff',
                margin: '0 0 8px',
              }}
            >
              All Ears English 播客
            </h4>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'rgba(255,255,255,0.5)',
                margin: '0 0 16px',
                lineHeight: 1.6,
              }}
            >
              在小宇宙 App 中打开，每天听 15 分钟。目标是抓大意，不逐词翻译。
            </p>
            <a
              href="https://www.xiaoyuzhoufm.com/podcast/5e2946c5418a84a0463972a4"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                borderRadius: '50px',
                border: '1px solid #ff00cc',
                background: 'rgba(255,0,204,0.1)',
                color: '#ff00cc',
                fontSize: '14px',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
            >
              <ExternalLink size={16} />
              打开小宇宙播客
            </a>
          </div>
        );
      default:
        return undefined;
    }
  };

  return (
    <section
      id="phase-matrix"
      ref={sectionRef}
      style={{
        position: 'relative',
        zIndex: 20,
        background: '#050507',
        padding: '6vh 0',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section header */}
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#ffffff',
            }}
          >
            阶段演进矩阵
          </h2>
          <p
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: 'rgba(255,255,255,0.5)',
              marginTop: '8px',
            }}
          >
            点击任务卡片展开交互工具，完成训练后点击勾选
          </p>
        </div>

        {/* Phase cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {phases.map((phase, index) => {
            const progress = getPhaseProgress(phase.tasks.map((t) => t.id));
            const isExpanded = expanded[index] ?? false;

            return (
              <div
                key={phase.id}
                id={`phase-card-${index}`}
                className="phase-card"
                style={{
                  borderRadius: '20px',
                  padding: isExpanded
                    ? 'clamp(20px, 3vw, 36px)'
                    : '20px clamp(20px, 3vw, 36px)',
                  opacity: 0,
                  transition: 'padding 0.3s ease',
                }}
              >
                {/* Collapsible header */}
                <button
                  onClick={() => toggleExpand(index)}
                  aria-expanded={isExpanded}
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    color: 'inherit',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      flex: '1 1 300px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '48px',
                        fontWeight: 700,
                        color: phase.color,
                        lineHeight: 1,
                        opacity: 0.6,
                      }}
                    >
                      {phase.number}
                    </span>
                    <div>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          letterSpacing: '0.2em',
                          color: 'rgba(255,255,255,0.4)',
                          textTransform: 'uppercase',
                          display: 'block',
                          marginBottom: '4px',
                        }}
                      >
                        {phase.weeks}
                      </span>
                      <h3
                        style={{
                          fontSize: '24px',
                          fontWeight: 700,
                          color: '#ffffff',
                          margin: 0,
                        }}
                      >
                        {phase.title}
                      </h3>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-end',
                        gap: '6px',
                      }}
                    >
                      <div
                        style={{
                          width: '100px',
                          height: '4px',
                          background: 'rgba(255,255,255,0.1)',
                          borderRadius: '2px',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${progress}%`,
                            height: '100%',
                            background: `linear-gradient(90deg, ${phase.color}, ${phase.color}80)`,
                            borderRadius: '2px',
                            transition: 'width 0.6s ease',
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: 'rgba(255,255,255,0.4)',
                        }}
                      >
                        {progress}% COMPLETE
                      </span>
                    </div>
                    <ChevronDown
                      size={20}
                      color="rgba(255,255,255,0.3)"
                      style={{
                        transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s ease',
                        flexShrink: 0,
                      }}
                    />
                  </div>
                </button>

                {/* Expandable content */}
                <div
                  style={{
                    maxHeight: isExpanded ? '4000px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.5s ease, opacity 0.3s ease',
                    opacity: isExpanded ? 1 : 0,
                  }}
                >
                  <div style={{ paddingTop: '24px' }}>
                    {/* Goal */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '20px',
                        padding: '14px 18px',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '10px',
                        borderLeft: `3px solid ${phase.color}`,
                      }}
                    >
                      <Zap size={16} color={phase.color} />
                      <p
                        style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: 'rgba(255,255,255,0.7)',
                          margin: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        {phase.goal}
                      </p>
                    </div>

                    {/* Tasks grid */}
                    <div
                      className="tasks-grid"
                      style={{
                        display: 'grid',
                        gap: '16px',
                      }}
                    >
                      {phase.tasks.map((task) => {
                        const toolComp = getToolComponent(task.id);
                        return (
                          <TaskCard
                            key={task.id}
                            task={task}
                            phaseColor={phase.color}
                            isCompleted={!!taskStates[task.id]}
                            onToggle={() => handleToggle(task.id)}
                            toolExpanded={!!expandedTools[task.id]}
                            onToolToggle={() => toggleTool(task.id)}
                            toolComponent={toolComp}
                          />
                        );
                      })}
                    </div>

                    {/* Checkpoint */}
                    <div
                      style={{
                        marginTop: '24px',
                        padding: '18px 20px',
                        background: `${phase.color}08`,
                        borderRadius: '12px',
                        border: `1px solid ${phase.color}15`,
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
                        <Circle size={14} color={phase.color} />
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                            color: phase.color,
                            textTransform: 'uppercase',
                          }}
                        >
                          Checkpoint
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: 'rgba(255,255,255,0.6)',
                          lineHeight: 1.7,
                          margin: 0,
                        }}
                      >
                        {phase.checkpoint}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
