"use client";

import { useState } from "react";
import { TECH_CHECKLIST_GROUPS } from "./data";

const STORAGE_KEY = "aiguru-tech-checklist-v1";

const FLAT_ITEMS = TECH_CHECKLIST_GROUPS.flatMap((group) =>
  group.items.map((item) => ({ group: group.title, text: item })),
);
const TOTAL = FLAT_ITEMS.length;

export default function Checklist() {
  const [checked, setChecked] = useState<boolean[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = saved ? JSON.parse(saved) : null;
    return Array.isArray(parsed) && parsed.length === TOTAL
      ? (parsed as boolean[])
      : (Array(TOTAL).fill(false) as boolean[]);
  });

  const toggle = (index: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const resetAll = () => {
    const next = Array(TOTAL).fill(false) as boolean[];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setChecked(next);
  };

  const doneCount = checked.filter(Boolean).length;

  const groupStartIndices = TECH_CHECKLIST_GROUPS.reduce<number[]>(
    (acc, _group, i) => {
      acc.push(
        i === 0 ? 0 : acc[i - 1] + TECH_CHECKLIST_GROUPS[i - 1].items.length,
      );
      return acc;
    },
    [],
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-text-muted">
          {`${doneCount} / ${TOTAL} 완료`}
        </span>
        <button
          onClick={resetAll}
          className="font-mono text-xs text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
        >
          초기화
        </button>
      </div>

      {TECH_CHECKLIST_GROUPS.map((group, groupIdx) => {
        const startIdx = groupStartIndices[groupIdx];

        return (
          <div key={group.title}>
            <h3 className="font-mono text-xs font-bold text-text-muted uppercase tracking-wide mb-3">
              {group.title}
            </h3>
            <ul className="space-y-2">
              {group.items.map((item, itemIdx) => {
                const idx = startIdx + itemIdx;
                const isChecked = checked[idx];
                return (
                  <li key={idx}>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggle(idx)}
                        className="mt-0.5 w-4 h-4 cursor-pointer accent-accent-cyan shrink-0"
                      />
                      <span
                        className={`text-sm leading-relaxed transition-colors ${
                          isChecked
                            ? "line-through text-text-muted"
                            : "text-text-secondary group-hover:text-text-primary"
                        }`}
                      >
                        {item}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
