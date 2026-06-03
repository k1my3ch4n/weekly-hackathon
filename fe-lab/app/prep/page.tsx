import Link from "next/link";
import type { Metadata } from "next";
import ChecklistClient from "./ChecklistClient";
import {
  HIGH_TOPICS,
  MEDIUM_TOPICS,
  LOW_TOPICS,
  ADDITIONAL_TOPICS,
  EXPECTED_QA,
  INTERVIEWER_QUESTIONS,
  KEYWORDS,
  CS_QA,
  SORT_ALGORITHMS,
  BIG_O,
} from "./data";

export const metadata: Metadata = {
  title: "면접 준비 — 집지커",
  robots: "noindex, nofollow",
};

const NAV = [
  { href: "#priority", label: "우선순위" },
  { href: "#expected-qa", label: "예상 Q&A" },
  { href: "#interviewer-q", label: "역질문" },
  { href: "#checklist", label: "체크리스트" },
  { href: "#keywords", label: "키워드" },
  { href: "#cs-basics", label: "CS 기초" },
];

function SectionHeading({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      id={id}
      className="text-base font-bold text-text-primary border-b border-border-subtle pb-2 mb-5 scroll-mt-14"
    >
      {children}
    </h2>
  );
}

type BadgeLevel = "상" | "중" | "하";

function PriorityBadge({ level }: { level: BadgeLevel }) {
  const style: Record<BadgeLevel, string> = {
    상: "text-accent-magenta border-accent-magenta bg-accent-magenta-dim",
    중: "text-accent-amber border-accent-amber bg-accent-amber-dim",
    하: "text-accent-green border-accent-green bg-accent-green-dim",
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 rounded border font-mono text-xs font-bold shrink-0 ${style[level]}`}
    >
      {level}
    </span>
  );
}

type TopicColor = "cyan" | "violet" | "muted";

function TopicCard({
  name,
  link,
  reason,
  color,
}: {
  name: string;
  link: string;
  reason: string;
  color: TopicColor;
}) {
  const textColor: Record<TopicColor, string> = {
    cyan: "text-accent-cyan",
    violet: "text-accent-violet",
    muted: "text-text-secondary",
  };
  return (
    <Link
      href={link}
      target="_blank"
      className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border-subtle bg-bg-surface hover:border-border-active hover:bg-bg-elevated transition-all group"
    >
      <span
        className={`font-mono text-sm flex-1 min-w-0 truncate ${textColor[color]} group-hover:underline`}
      >
        {name}
      </span>
      <span className="text-xs text-text-muted text-right shrink-0 max-w-xs hidden sm:block">
        {reason}
      </span>
      <span className="text-text-muted text-xs shrink-0">→</span>
    </Link>
  );
}

export default function PrepPage() {
  const highAdditional = ADDITIONAL_TOPICS.filter((t) => t.priority === "상");
  const midAdditional = ADDITIONAL_TOPICS.filter((t) => t.priority === "중");

  return (
    <div className="h-screen overflow-y-auto bg-bg-deep text-text-primary">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-10 bg-bg-surface/90 backdrop-blur border-b border-border-subtle px-6 py-2.5 flex items-center gap-6 flex-wrap">
        <span className="font-mono text-xs font-bold text-accent-magenta shrink-0">
          집지커 면접 준비
        </span>
        <div className="flex items-center gap-4 flex-wrap">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-xs text-text-muted hover:text-text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>
        <Link
          href="/"
          className="ml-auto font-mono text-xs text-text-muted hover:text-text-secondary transition-colors shrink-0"
        >
          ← Fe-Lab
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10 space-y-14">
        {/* ── 1. 우선순위 ─────────────────────────────────── */}
        <section>
          <SectionHeading id="priority">1. 우선순위별 학습 토픽</SectionHeading>

          {/* 🔴 상 — Fe-Lab 항목 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <PriorityBadge level="상" />
              <span className="text-xs text-text-muted">
                반드시 완벽히 설명할 수 있어야 함 · Fe-Lab 학습
              </span>
            </div>
            <div className="space-y-1.5">
              {HIGH_TOPICS.map((topic) => (
                <TopicCard
                  key={topic.link}
                  name={topic.name}
                  link={topic.link}
                  reason={topic.reason}
                  color="cyan"
                />
              ))}
            </div>
          </div>

          {/* 🔴 상 — 추가 학습 */}
          {highAdditional.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <PriorityBadge level="상" />
                <span className="text-xs text-text-muted">
                  추가 학습 필요 (Fe-Lab 외)
                </span>
              </div>
              <div className="space-y-2">
                {highAdditional.map((topic) => (
                  <details
                    key={topic.name}
                    className="rounded-lg border border-border-subtle bg-bg-surface"
                  >
                    <summary className="px-4 py-3 cursor-pointer font-mono text-sm text-text-primary hover:text-accent-cyan transition-colors list-none flex items-center justify-between">
                      {topic.name}
                      <span className="text-text-muted text-xs">▼</span>
                    </summary>
                    <div className="px-4 pb-4 pt-3 border-t border-border-subtle space-y-5">
                      {topic.qa.map((item, i) => (
                        <div key={i}>
                          <p className="font-mono text-xs text-accent-amber mb-1.5">
                            Q. {item.q}
                          </p>
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* 🟡 중 — Fe-Lab 항목 */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <PriorityBadge level="중" />
              <span className="text-xs text-text-muted">
                설명할 수 있으면 차별화 · Fe-Lab 학습
              </span>
            </div>
            <div className="space-y-1.5">
              {MEDIUM_TOPICS.map((topic) => (
                <TopicCard
                  key={topic.link}
                  name={topic.name}
                  link={topic.link}
                  reason={topic.reason}
                  color="violet"
                />
              ))}
            </div>
          </div>

          {/* 🟡 중 — 추가 학습 */}
          {midAdditional.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <PriorityBadge level="중" />
                <span className="text-xs text-text-muted">
                  추가 학습 권장 (Fe-Lab 외)
                </span>
              </div>
              <div className="space-y-2">
                {midAdditional.map((topic) => (
                  <details
                    key={topic.name}
                    className="rounded-lg border border-border-subtle bg-bg-surface"
                  >
                    <summary className="px-4 py-3 cursor-pointer font-mono text-sm text-text-primary hover:text-accent-violet transition-colors list-none flex items-center justify-between">
                      {topic.name}
                      <span className="text-text-muted text-xs">▼</span>
                    </summary>
                    <div className="px-4 pb-4 pt-3 border-t border-border-subtle space-y-5">
                      {topic.qa.map((item, i) => (
                        <div key={i}>
                          <p className="font-mono text-xs text-accent-amber mb-1.5">
                            Q. {item.q}
                          </p>
                          <p className="text-sm text-text-secondary leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* 🟢 하 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <PriorityBadge level="하" />
              <span className="text-xs text-text-muted">
                알면 좋지만 우선순위 낮음 · Fe-Lab 학습
              </span>
            </div>
            <div className="space-y-1.5">
              {LOW_TOPICS.map((topic) => (
                <TopicCard
                  key={topic.link}
                  name={topic.name}
                  link={topic.link}
                  reason={topic.reason}
                  color="muted"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── 2. 예상 Q&A ──────────────────────────────────── */}
        <section>
          <SectionHeading id="expected-qa">
            2. 예상 질문 & 답변 ({EXPECTED_QA.length}개)
          </SectionHeading>
          <div className="space-y-2">
            {EXPECTED_QA.map((item, i) => (
              <details
                key={i}
                className="rounded-lg border border-border-subtle bg-bg-surface"
              >
                <summary className="px-4 py-3 cursor-pointer list-none flex items-start gap-2 hover:bg-bg-elevated transition-colors rounded-lg">
                  <span className="font-mono text-xs text-accent-cyan font-bold shrink-0 mt-0.5">
                    Q{i + 1}.
                  </span>
                  <span className="text-sm text-text-primary">{item.q}</span>
                </summary>
                <div className="px-4 pb-4 pt-3 border-t border-border-subtle">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── 3. 역질문 ─────────────────────────────────────── */}
        <section>
          <SectionHeading id="interviewer-q">3. 면접관에게 할 질문</SectionHeading>
          <div className="space-y-6">
            {INTERVIEWER_QUESTIONS.map((group) => (
              <div key={group.category}>
                <h3 className="font-mono text-xs font-bold text-text-muted uppercase tracking-wide mb-2">
                  {group.category}
                </h3>
                <ol className="space-y-2">
                  {group.questions.map((question, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 px-4 py-3 rounded-lg border border-border-subtle bg-bg-surface"
                    >
                      <span className="font-mono text-xs text-text-muted shrink-0 mt-0.5">
                        {i + 1}.
                      </span>
                      <span className="text-sm text-text-secondary leading-relaxed">
                        {question}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. 체크리스트 ────────────────────────────────── */}
        <section>
          <SectionHeading id="checklist">4. 면접 당일 체크리스트</SectionHeading>
          <div className="px-4 py-5 rounded-lg border border-border-subtle bg-bg-surface">
            <ChecklistClient />
          </div>
        </section>

        {/* ── 5. 핵심 키워드 ───────────────────────────────── */}
        <section>
          <SectionHeading id="keywords">
            5. 핵심 키워드 ({KEYWORDS.length}개)
          </SectionHeading>
          <div className="rounded-lg border border-border-subtle overflow-hidden">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="bg-bg-elevated border-b border-border-subtle">
                  <th className="text-left py-2 px-4 text-xs text-text-muted font-semibold w-48">
                    개념
                  </th>
                  <th className="text-left py-2 px-4 text-xs text-text-muted font-semibold">
                    한 줄 정의
                  </th>
                </tr>
              </thead>
              <tbody>
                {KEYWORDS.map((kw, i) => (
                  <tr
                    key={i}
                    className="border-b border-border-subtle last:border-0 hover:bg-bg-elevated transition-colors"
                  >
                    <td className="py-2.5 px-4 text-accent-cyan font-semibold text-xs">
                      {kw.term}
                    </td>
                    <td className="py-2.5 px-4 text-text-secondary text-xs">
                      {kw.def}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {/* ── 6. CS 기초 ───────────────────────────────────── */}
        <section>
          <SectionHeading id="cs-basics">6. CS 기초</SectionHeading>

          {/* 핵심 개념 Q&A */}
          <h3 className="font-mono text-xs font-bold text-text-muted uppercase tracking-wide mb-3">
            핵심 개념
          </h3>
          <div className="space-y-2 mb-10">
            {CS_QA.map((item, i) => (
              <details
                key={i}
                className="rounded-lg border border-border-subtle bg-bg-surface"
              >
                <summary className="px-4 py-3 cursor-pointer list-none flex items-start gap-2 hover:bg-bg-elevated transition-colors rounded-lg">
                  <span className="font-mono text-xs text-accent-cyan font-bold shrink-0 mt-0.5">
                    Q{i + 1}.
                  </span>
                  <span className="text-sm text-text-primary">{item.q}</span>
                </summary>
                <div className="px-4 pb-4 pt-3 border-t border-border-subtle">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>

          {/* 시간복잡도 */}
          <h3 className="font-mono text-xs font-bold text-text-muted uppercase tracking-wide mb-3">
            시간복잡도 (Big-O)
          </h3>
          <div className="rounded-lg border border-border-subtle overflow-hidden mb-4">
            <table className="w-full font-mono text-xs">
              <thead>
                <tr className="bg-bg-elevated border-b border-border-subtle">
                  <th className="text-left py-2 px-4 text-text-muted font-semibold w-28">표기법</th>
                  <th className="text-left py-2 px-4 text-text-muted font-semibold w-24">이름</th>
                  <th className="text-left py-2 px-4 text-text-muted font-semibold">예시</th>
                </tr>
              </thead>
              <tbody>
                {BIG_O.map((row, i) => (
                  <tr key={i} className="border-b border-border-subtle last:border-0 hover:bg-bg-elevated transition-colors">
                    <td className="py-2 px-4 text-accent-cyan font-bold">{row.notation}</td>
                    <td className="py-2 px-4 text-text-secondary">{row.name}</td>
                    <td className="py-2 px-4 text-text-muted">{row.example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-muted font-mono mb-10">
            * 자료구조별: 배열 접근 O(1) · 탐색 O(n) · 삽입/삭제 O(n) &nbsp;|&nbsp; 해시맵 O(1)* &nbsp;|&nbsp; 스택·큐 push/pop O(1) &nbsp;|&nbsp; BST O(log n)*
          </p>

          {/* 정렬 알고리즘 */}
          <h3 className="font-mono text-xs font-bold text-text-muted uppercase tracking-wide mb-3">
            정렬 알고리즘
          </h3>
          <div className="rounded-lg border border-border-subtle overflow-x-auto">
            <table className="w-full font-mono text-xs min-w-[640px]">
              <thead>
                <tr className="bg-bg-elevated border-b border-border-subtle">
                  <th className="text-left py-2 px-4 text-text-muted font-semibold w-32">알고리즘</th>
                  <th className="text-left py-2 px-3 text-text-muted font-semibold w-24">최선</th>
                  <th className="text-left py-2 px-3 text-text-muted font-semibold w-24">평균</th>
                  <th className="text-left py-2 px-3 text-text-muted font-semibold w-24">최악</th>
                  <th className="text-left py-2 px-3 text-text-muted font-semibold w-20">공간</th>
                  <th className="text-left py-2 px-3 text-text-muted font-semibold w-14">안정</th>
                  <th className="text-left py-2 px-4 text-text-muted font-semibold">특징</th>
                </tr>
              </thead>
              <tbody>
                {SORT_ALGORITHMS.map((row, i) => (
                  <tr key={i} className="border-b border-border-subtle last:border-0 hover:bg-bg-elevated transition-colors">
                    <td className="py-2 px-4 text-accent-violet font-semibold">{row.name}</td>
                    <td className="py-2 px-3 text-accent-green">{row.best}</td>
                    <td className="py-2 px-3 text-accent-amber">{row.avg}</td>
                    <td className="py-2 px-3 text-accent-magenta">{row.worst}</td>
                    <td className="py-2 px-3 text-text-secondary">{row.space}</td>
                    <td className="py-2 px-3 text-text-secondary">{row.stable ? "✓" : "✗"}</td>
                    <td className="py-2 px-4 text-text-muted">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-muted font-mono mt-2">
            * O(n log n)이 정렬의 이론적 하한선 (비교 기반 정렬 기준)
          </p>
        </section>
      </main>
    </div>
  );
}
