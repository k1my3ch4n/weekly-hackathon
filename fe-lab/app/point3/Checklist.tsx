"use client";

import { useState } from "react";

const GROUPS = [
  {
    title: "회사 & 도메인 파악",
    items: [
      "point3 홈페이지 탐색 — 결제 위젯 데모 직접 사용해보기",
      "0.3% 수수료·실시간 정산 차별화 포인트 한 문장으로 정리",
      "seed → PG 라이센스 → pre-A → 직불업 라이센스 타임라인 파악",
      "결제 위젯이 실제로 어떻게 가맹점에 임베드되는지 공식 문서 확인",
    ],
  },
  {
    title: "기술 준비",
    items: [
      "TanStack React Query — mutation 체인, refetchInterval 폴링 패턴 정리",
      "React Hook Form + Zod — zodResolver 연동, z.superRefine 조건부 검증 연습",
      "FSD 아키텍처 레이어 의존성 규칙 — 단방향 참조 원칙 설명 준비",
      "postMessage 통신 — 이벤트 타입 정의, origin 검증 코드 패턴 정리",
      "OAuth 2.0 Authorization Code Flow + PKCE 흐름 다이어그램 그리기",
      "인앱 브라우저 감지 → 리다이렉트 폴백 → sessionStorage 복원 흐름 정리",
      "상 우선순위 토픽 핵심 키워드 리뷰",
    ],
  },
  {
    title: "답변 준비",
    items: [
      "결제·금융 도메인 지원 동기 — 구체적 이유와 point3 선택 이유 분리해서 정리",
      "크로스 환경 호환성 디버깅 경험 — STAR 구조(상황-행동-결과)로 정리",
      "화면 직접 시연·회귀 찾은 경험 — 구체적 회귀 사례와 발견 방법 정리",
      "예상 Q&A 8개 소리 내어 답변 연습",
    ],
  },
  {
    title: "면접 당일",
    items: [
      "역질문 2-3개 선택 — 결제 도메인·FSD·E2E 테스트 중심으로",
      "모르는 질문 시: '정확히 파악하지 못했지만, 제가 아는 범위에서는...'으로 솔직하게",
      "결제 흐름 답변 시 보안 고려사항 자연스럽게 언급",
    ],
  },
];

const STORAGE_KEY = "point3-checklist-v1";

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
