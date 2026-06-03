"use client";

import { useState } from "react";
import { useLog, useTimers } from "@shared/hooks";
import {
  DemoLayout,
  RightPanel,
  LogPanel,
  ActionButton,
  SectionHeader,
  CodeBlock,
} from "@shared/ui";
import {
  TABS,
  APP_ROUTER_TREE,
  RENDERING_STRATEGIES,
  SERVER_ACTION_STEPS,
} from "../model/constants";
import type { TabId, FileNode, RenderingStrategy } from "../model/constants";

function FileTree({
  nodes,
  depth = 0,
  onSelect,
  selectedName,
}: {
  nodes: FileNode[];
  depth?: number;
  onSelect: (node: FileNode) => void;
  selectedName: string;
}) {
  return (
    <ul className="space-y-1">
      {nodes.map((node) => (
        <li key={node.name}>
          <button
            onClick={() => onSelect(node)}
            className={`w-full text-left flex items-center gap-2 px-2 py-1 rounded transition-all cursor-pointer font-mono text-caption ${
              selectedName === node.name
                ? "bg-bg-elevated"
                : "hover:bg-bg-elevated opacity-70 hover:opacity-100"
            }`}
            style={{ paddingLeft: `${depth * 16 + 8}px` }}
          >
            <span style={{ color: node.color }}>
              {node.type === "folder" ? "📁" : "📄"}
            </span>
            <span style={{ color: node.color }}>{node.name}</span>
          </button>
          {node.children && (
            <FileTree
              nodes={node.children}
              depth={depth + 1}
              onSelect={onSelect}
              selectedName={selectedName}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default function NextjsDeepDiveDemo() {
  const [activeTab, setActiveTab] = useState<TabId>("file-conventions");
  const { logs, addLog, clearLogs } = useLog();
  const { addTimer, clearTimers } = useTimers();

  // File Conventions
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  // Rendering Strategy
  const [selectedStrategy, setSelectedStrategy] = useState<RenderingStrategy>(
    RENDERING_STRATEGIES[0],
  );
  const [strategyStep, setStrategyStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  // Server Action
  const [actionStep, setActionStep] = useState(-1);

  const handleTabChange = (tabId: TabId) => {
    clearTimers();
    clearLogs();
    setActiveTab(tabId);
    setSelectedFile(null);
    setStrategyStep(-1);
    setIsRunning(false);
    setActionStep(-1);
  };

  const handleReset = () => {
    clearTimers();
    clearLogs();
    setSelectedFile(null);
    setStrategyStep(-1);
    setIsRunning(false);
    setActionStep(-1);
  };

  const handleRunStrategy = () => {
    if (isRunning) { return; }
    setIsRunning(true);
    clearLogs();
    setStrategyStep(0);

    selectedStrategy.steps.forEach((step, index) => {
      addTimer(() => {
        setStrategyStep(index);
        addLog(step);
        if (index === selectedStrategy.steps.length - 1) {
          setIsRunning(false);
        }
      }, index * 1000);
    });
  };

  const handleRunServerAction = () => {
    clearLogs();
    setActionStep(0);

    SERVER_ACTION_STEPS.forEach((step, index) => {
      addTimer(() => {
        setActionStep(index);
        addLog(`[${step.actor.toUpperCase()}] ${step.description}`);
      }, index * 900);
    });
  };

  const actorColor = (actor: string) => {
    if (actor === "client") { return "var(--accent-cyan)"; }
    if (actor === "server") { return "var(--accent-violet)"; }
    return "var(--accent-amber)";
  };

  const rightPanel = (
    <RightPanel
      onReset={handleReset}
      actions={
        <>
          {activeTab === "rendering-strategy" && (
            <ActionButton
              variant="cyan"
              onClick={handleRunStrategy}
              disabled={isRunning}
            >
              {isRunning ? "실행 중..." : "흐름 실행"}
            </ActionButton>
          )}
          {activeTab === "server-action" && (
            <ActionButton variant="violet" onClick={handleRunServerAction}>
              Server Action 실행
            </ActionButton>
          )}
        </>
      }
    >
      <LogPanel
        logs={logs}
        emptyMessage={
          activeTab === "file-conventions"
            ? "파일을 클릭하면\n역할이 표시됩니다"
            : "버튼을 클릭하여\n흐름을 확인하세요"
        }
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
        {/* Tab 1: File Conventions */}
        {activeTab === "file-conventions" && (
          <div className="space-y-3">
            <SectionHeader>App Router 파일 트리</SectionHeader>
            <FileTree
              nodes={APP_ROUTER_TREE}
              onSelect={(node) => {
                setSelectedFile(node);
                clearLogs();
                addLog(`${node.name} — ${node.role}`);
              }}
              selectedName={selectedFile?.name ?? ""}
            />
            {selectedFile && (
              <div
                className="mt-3 p-3 rounded border font-mono text-caption leading-[1.8]"
                style={{
                  borderColor: selectedFile.color,
                  color: selectedFile.color,
                  backgroundColor: "var(--bg-elevated)",
                }}
              >
                <div className="font-bold mb-1">{selectedFile.name}</div>
                <div className="text-text-secondary">{selectedFile.role}</div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Rendering Strategy */}
        {activeTab === "rendering-strategy" && (
          <div className="space-y-3">
            <SectionHeader>전략 선택</SectionHeader>
            <div className="flex gap-2 mb-3">
              {RENDERING_STRATEGIES.map((strategy) => (
                <button
                  key={strategy.id}
                  onClick={() => {
                    setSelectedStrategy(strategy);
                    setStrategyStep(-1);
                    clearLogs();
                  }}
                  className={`font-mono text-label px-3 py-2 rounded border transition-all cursor-pointer ${
                    selectedStrategy.id === strategy.id
                      ? "bg-bg-elevated"
                      : "border-border-subtle text-text-muted hover:text-text-secondary"
                  }`}
                  style={
                    selectedStrategy.id === strategy.id
                      ? {
                          borderColor: strategy.color,
                          color: strategy.color,
                        }
                      : {}
                  }
                >
                  {strategy.label}
                </button>
              ))}
            </div>
            <div
              className="font-mono text-caption text-text-muted mb-2"
              style={{ color: selectedStrategy.color }}
            >
              적합한 경우: {selectedStrategy.when}
            </div>
            <CodeBlock>{selectedStrategy.code}</CodeBlock>
            <div className="space-y-2 mt-2">
              {selectedStrategy.steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 p-2 rounded transition-all duration-300 ${
                    index <= strategyStep && strategyStep !== -1
                      ? "opacity-100"
                      : "opacity-30"
                  }`}
                >
                  <span
                    className="font-mono text-caption font-bold mt-0.5 shrink-0"
                    style={{ color: selectedStrategy.color }}
                  >
                    {index + 1}.
                  </span>
                  <span className="font-mono text-caption text-text-secondary">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Server Action */}
        {activeTab === "server-action" && (
          <div className="space-y-2">
            <SectionHeader>Server Action 요청 흐름</SectionHeader>
            <div className="flex gap-3 font-mono text-caption mb-3">
              {(["client", "server", "db"] as const).map((actor) => (
                <span key={actor} className="flex items-center gap-1">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: actorColor(actor) }}
                  />
                  <span className="text-text-muted">{actor}</span>
                </span>
              ))}
            </div>
            {SERVER_ACTION_STEPS.map((step, index) => (
              <div
                key={index}
                className={`p-3 rounded border transition-all duration-300 ${
                  index <= actionStep && actionStep !== -1
                    ? "border-current bg-bg-elevated"
                    : "border-border-subtle opacity-40"
                }`}
                style={{
                  borderColor:
                    index === actionStep ? actorColor(step.actor) : undefined,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="font-mono text-caption font-bold uppercase"
                    style={{ color: actorColor(step.actor) }}
                  >
                    [{step.actor}]
                  </span>
                  <span className="font-mono text-label text-text-primary">
                    {step.label}
                  </span>
                  {index === actionStep && (
                    <span
                      className="w-2 h-2 rounded-full animate-pulse ml-auto"
                      style={{ backgroundColor: actorColor(step.actor) }}
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
