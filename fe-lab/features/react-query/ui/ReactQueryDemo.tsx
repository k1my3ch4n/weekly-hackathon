"use client";

import { useState, useEffect, useRef } from "react";
import { useLog, useTimers } from "@shared/hooks";
import {
  DemoLayout,
  RightPanel,
  LogPanel,
  ActionButton,
  SectionHeader,
} from "@shared/ui";
import {
  TABS,
  QUERY_STATE_STEPS,
  TIME_CONFIGS,
  OPTIMISTIC_STEPS_SUCCESS,
  OPTIMISTIC_STEPS_ROLLBACK,
} from "../model/constants";
import type { TabId, QueryStateStep, OptimisticStep } from "../model/constants";

export default function ReactQueryDemo() {
  const [activeTab, setActiveTab] = useState<TabId>("query-states");
  const { logs, addLog, clearLogs } = useLog();
  const { addTimer, clearTimers } = useTimers();

  // Query States tab
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);

  // StaleTime tab
  const [selectedConfig, setSelectedConfig] = useState(0);
  const [staleElapsed, setStaleElapsed] = useState(0);
  const [gcElapsed, setGcElapsed] = useState(0);
  const [timerPhase, setTimerPhase] = useState<"idle" | "stale" | "gc" | "done">("idle");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Optimistic tab
  const [optimisticStep, setOptimisticStep] = useState<number>(-1);
  const [scenario, setScenario] = useState<"success" | "rollback">("success");

  const handleTabChange = (tabId: TabId) => {
    clearTimers();
    clearLogs();
    clearInterval(intervalRef.current ?? undefined);
    intervalRef.current = null;
    setActiveTab(tabId);
    setCurrentStep(-1);
    setIsRunning(false);
    setStaleElapsed(0);
    setGcElapsed(0);
    setTimerPhase("idle");
    setOptimisticStep(-1);
  };

  const handleReset = () => {
    clearTimers();
    clearLogs();
    clearInterval(intervalRef.current ?? undefined);
    intervalRef.current = null;
    setCurrentStep(-1);
    setIsRunning(false);
    setStaleElapsed(0);
    setGcElapsed(0);
    setTimerPhase("idle");
    setOptimisticStep(-1);
  };

  // Query States: 단계별 자동 진행
  const handleRunQueryStates = () => {
    if (isRunning) { return; }
    setIsRunning(true);
    clearLogs();
    setCurrentStep(0);

    QUERY_STATE_STEPS.forEach((step, index) => {
      addTimer(() => {
        setCurrentStep(index);
        addLog(`[${step.state.toUpperCase()}] ${step.description}`);
        if (index === QUERY_STATE_STEPS.length - 1) {
          setIsRunning(false);
        }
      }, index * 1200);
    });
  };

  // StaleTime 타이머
  const handleRunTimer = () => {
    clearInterval(intervalRef.current ?? undefined);
    clearLogs();
    setStaleElapsed(0);
    setGcElapsed(0);
    setTimerPhase("stale");
    const config = TIME_CONFIGS[selectedConfig];
    addLog(`staleTime: ${config.staleTime}초 타이머 시작`);

    let elapsed = 0;
    intervalRef.current = setInterval(() => {
      elapsed += 1;
      if (elapsed <= config.staleTime) {
        setStaleElapsed(elapsed);
      } else if (elapsed === config.staleTime + 1) {
        setTimerPhase("gc");
        setStaleElapsed(config.staleTime);
        addLog(`⚠ staleTime 경과 → 데이터가 stale 상태로 전환`);
        addLog(`gcTime: ${config.gcTime}초 타이머 시작 (컴포넌트 언마운트 가정)`);
        setGcElapsed(0);
      } else {
        const gcSec = elapsed - config.staleTime - 1;
        setGcElapsed(Math.min(gcSec, config.gcTime));
        if (gcSec >= config.gcTime) {
          setTimerPhase("done");
          addLog(`🗑 gcTime 경과 → 캐시에서 완전 제거`);
          clearInterval(intervalRef.current ?? undefined);
          intervalRef.current = null;
        }
      }
    }, 1000);
  };

  useEffect(() => {
    return () => clearInterval(intervalRef.current ?? undefined);
  }, []);

  // Optimistic Update
  const handleRunOptimistic = () => {
    clearLogs();
    setOptimisticStep(0);
    const steps =
      scenario === "success" ? OPTIMISTIC_STEPS_SUCCESS : OPTIMISTIC_STEPS_ROLLBACK;

    steps.forEach((step, index) => {
      addTimer(() => {
        setOptimisticStep(index);
        addLog(step.description);
      }, index * 1000);
    });
  };

  const getStepColor = (step: QueryStateStep | OptimisticStep) => step.color;

  const config = TIME_CONFIGS[selectedConfig];
  const optimisticSteps =
    scenario === "success" ? OPTIMISTIC_STEPS_SUCCESS : OPTIMISTIC_STEPS_ROLLBACK;

  const rightPanel = (
    <RightPanel
      onReset={handleReset}
      actions={
        <>
          {activeTab === "query-states" && (
            <ActionButton
              variant="cyan"
              onClick={handleRunQueryStates}
              disabled={isRunning}
            >
              {isRunning ? "실행 중..." : "쿼리 상태 흐름 실행"}
            </ActionButton>
          )}
          {activeTab === "stale-gc" && (
            <>
              <div className="flex gap-1 mb-2">
                {TIME_CONFIGS.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      clearInterval(intervalRef.current ?? undefined);
                      intervalRef.current = null;
                      setSelectedConfig(i);
                      setStaleElapsed(0);
                      setGcElapsed(0);
                      setTimerPhase("idle");
                      clearLogs();
                    }}
                    className={`font-mono text-caption px-2 py-1 rounded border transition-all cursor-pointer ${
                      i === selectedConfig
                        ? "border-accent-cyan text-accent-cyan"
                        : "border-border-subtle text-text-muted"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <ActionButton variant="amber" onClick={handleRunTimer}>
                타이머 시작
              </ActionButton>
            </>
          )}
          {activeTab === "optimistic" && (
            <>
              <div className="flex gap-1 mb-2">
                {(["success", "rollback"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setScenario(s);
                      setOptimisticStep(-1);
                      clearLogs();
                    }}
                    className={`font-mono text-caption px-2 py-1 rounded border transition-all cursor-pointer ${
                      scenario === s
                        ? "border-accent-cyan text-accent-cyan"
                        : "border-border-subtle text-text-muted"
                    }`}
                  >
                    {s === "success" ? "성공 시나리오" : "실패 → 롤백"}
                  </button>
                ))}
              </div>
              <ActionButton variant="violet" onClick={handleRunOptimistic}>
                시뮬레이션 실행
              </ActionButton>
            </>
          )}
        </>
      }
    >
      <LogPanel
        logs={logs}
        emptyMessage={"버튼을 클릭하여\n동작을 확인하세요"}
      />
    </RightPanel>
  );

  return (
    <>
      {/* Tab Bar */}
      <div className="flex items-center gap-0 border-b border-border-subtle bg-bg-elevated">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`font-mono text-label px-4 py-3 border-b-2 transition-all duration-200 cursor-pointer ${
              activeTab === tab.id
                ? "border-accent-cyan text-accent-cyan bg-bg-surface"
                : "border-transparent text-text-muted hover:text-text-secondary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <DemoLayout rightPanel={rightPanel}>
        {/* Tab 1: Query States */}
        {activeTab === "query-states" && (
          <div className="space-y-2">
            <SectionHeader>Query State Machine</SectionHeader>
            {QUERY_STATE_STEPS.map((step, index) => (
              <div
                key={step.state}
                className={`p-3 rounded border transition-all duration-300 ${
                  index === currentStep
                    ? "border-current bg-bg-elevated"
                    : "border-border-subtle opacity-40"
                }`}
                style={{ color: index === currentStep ? getStepColor(step) : undefined }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-mono text-label font-bold"
                    style={{ color: getStepColor(step) }}
                  >
                    {step.label}
                  </span>
                  {index === currentStep && (
                    <span className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: getStepColor(step) }}
                    />
                  )}
                </div>
                <p className="font-mono text-caption text-text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: staleTime / gcTime */}
        {activeTab === "stale-gc" && (
          <div className="space-y-4">
            <SectionHeader>타이머 시각화</SectionHeader>
            <div className="font-mono text-caption text-text-muted mb-2">
              {config.description}
            </div>

            {/* staleTime bar */}
            <div>
              <div className="flex justify-between font-mono text-caption mb-1">
                <span style={{ color: "var(--accent-green)" }}>staleTime</span>
                <span className="text-text-muted">
                  {staleElapsed}s / {config.staleTime}s
                </span>
              </div>
              <div className="h-3 rounded bg-bg-elevated overflow-hidden border border-border-subtle">
                <div
                  className="h-full rounded transition-all duration-500"
                  style={{
                    width: `${config.staleTime === 0 ? 100 : (staleElapsed / config.staleTime) * 100}%`,
                    backgroundColor: "var(--accent-green)",
                  }}
                />
              </div>
              <div className="font-mono text-caption text-text-muted mt-1">
                {timerPhase === "idle" && "fresh 유지 중"}
                {timerPhase === "stale" && "fresh — 재요청 없음"}
                {timerPhase === "gc" && "stale — 다음 마운트 시 백그라운드 재요청"}
                {timerPhase === "done" && "stale"}
              </div>
            </div>

            {/* gcTime bar */}
            <div>
              <div className="flex justify-between font-mono text-caption mb-1">
                <span style={{ color: "var(--accent-magenta)" }}>gcTime</span>
                <span className="text-text-muted">
                  {gcElapsed}s / {config.gcTime}s
                </span>
              </div>
              <div className="h-3 rounded bg-bg-elevated overflow-hidden border border-border-subtle">
                <div
                  className="h-full rounded transition-all duration-500"
                  style={{
                    width: `${(gcElapsed / config.gcTime) * 100}%`,
                    backgroundColor: "var(--accent-magenta)",
                  }}
                />
              </div>
              <div className="font-mono text-caption text-text-muted mt-1">
                {timerPhase === "gc" && "비활성 캐시 유지 중"}
                {timerPhase === "done" && "캐시 제거됨 (GC)"}
                {(timerPhase === "idle" || timerPhase === "stale") && "컴포넌트 마운트 상태"}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Optimistic Update */}
        {activeTab === "optimistic" && (
          <div className="space-y-2">
            <SectionHeader>Optimistic Update 흐름</SectionHeader>
            {optimisticSteps.map((step, index) => (
              <div
                key={step.phase}
                className={`p-3 rounded border transition-all duration-300 ${
                  index <= optimisticStep && optimisticStep !== -1
                    ? "border-current bg-bg-elevated"
                    : "border-border-subtle opacity-40"
                }`}
                style={{
                  color:
                    index <= optimisticStep && optimisticStep !== -1
                      ? getStepColor(step)
                      : undefined,
                  borderColor:
                    index === optimisticStep
                      ? getStepColor(step)
                      : undefined,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-mono text-label font-bold"
                    style={{ color: getStepColor(step) }}
                  >
                    {index + 1}. {step.label}
                  </span>
                  {index === optimisticStep && (
                    <span
                      className="w-2 h-2 rounded-full animate-pulse"
                      style={{ backgroundColor: getStepColor(step) }}
                    />
                  )}
                </div>
                <p className="font-mono text-caption text-text-muted">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </DemoLayout>
    </>
  );
}
