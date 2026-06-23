"use client";

import { useState } from "react";

const GROUPS = [
  {
    title: "지원 전 필수 준비",
    items: [
      "빌드잇 홈페이지 탐색 — Solution Business / Studio Business 사례 파악",
      "사전 인터뷰 3가지 답변을 자기소개서에 구체적으로 작성",
      "AI 활용 경험 — 어떤 도구를, 어떻게, 얼마나 생산성이 올랐는지 수치 정리",
      "FE/BE 경계 개발 경험 — 상황-행동-결과(STAR) 구조로 정리",
    ],
  },
  {
    title: "기술 답변 준비",
    items: [
      "상 우선순위 항목 핵심 키워드 리뷰",
      "Zustand vs Context vs Redux 비교 설명 연습",
      "TypeScript + Zod 조합 — z.infer · z.safeParse · zodResolver 패턴 정리",
      "React vs Vue 비교 — Composition API 기준으로 공통점·차이점 정리",
      "REST API 설계 원칙 5가지 말할 수 있도록 준비",
      "개념 정의 → 동작 원리 → 실제 사용 예시 순서로 답변 연습",
    ],
  },
  {
    title: "코딩 테스트 대비",
    items: [
      "배열 / 해시맵 활용 문제 풀기",
      "투 포인터 / 슬라이딩 윈도우 패턴 복습",
      "재귀 / DFS / BFS 기본 구현 연습",
      "문자열 처리 / 구현 문제 2-3개 풀기",
    ],
  },
  {
    title: "면접 당일",
    items: [
      "면접관에게 할 질문 2-3개 선택",
      "코딩 테스트 + 면접 2시간 연속 — 물·간식 챙기기",
      "모르면 '정확히 기억이 나지 않지만, 이렇게 이해하고 있습니다'로 솔직하게",
    ],
  },
];

const STORAGE_KEY = "buildit-checklist-v1";

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
