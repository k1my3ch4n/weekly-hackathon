"use client";

import { useState } from "react";

const GROUPS = [
  {
    title: "기술 답변 전 습관",
    items: [
      "개념 정의 → 동작 원리 → 실제 사용 예시 순서로 답변",
      "집지커 서비스라면 어떻게 적용할지로 연결",
      "모르면 '정확히 기억이 나지 않지만, 이렇게 이해하고 있습니다'로 솔직하게",
    ],
  },
  {
    title: "면접 전날 확인",
    items: [
      "집지커 서비스 실제로 사용해보기 (앱 다운로드)",
      "집지커 관련 뉴스 / 블로그 검색",
      "상 우선순위 항목 핵심 키워드 리뷰",
      "React Query 쿼리 상태 흐름 · queryKey 설계 복습",
      "Next.js App Router 파일 컨벤션 복습",
      "Open API Generator 워크플로우 복습",
      "예상 질문 5개 소리 내어 연습",
      "면접관에게 할 질문 3개 선택",
    ],
  },
  {
    title: "답변 시 피해야 할 것",
    items: [
      "'모르겠습니다'로만 끝내기 — 아는 범위라도 말하기",
      "이론만 나열하고 실무 경험 연결 안 하기",
      "회사 / 서비스 관련 질문을 하나도 안 하기",
    ],
  },
];

const STORAGE_KEY = "prep-checklist-v1";

const FLAT_ITEMS = GROUPS.flatMap((group) =>
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

  const groupStartIndices = GROUPS.reduce<number[]>((acc, _group, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + GROUPS[i - 1].items.length);
    return acc;
  }, []);

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

      {GROUPS.map((group, groupIdx) => {
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
