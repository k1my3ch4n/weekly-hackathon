import Link from "next/link";
import type { Metadata } from "next";
import ChecklistClient from "./ChecklistClient";
import {
  HIGH_TOPICS,
  MEDIUM_TOPICS,
  LOW_TOPICS,
  ADDITIONAL_TOPICS,
  PRE_INTERVIEW_QA,
  EXPECTED_QA,
  INTERVIEWER_QUESTIONS,
  KEYWORDS,
} from "./data";

export const metadata: Metadata = {
  title: "면접 준비 — 빌드잇",
  robots: "noindex, nofollow",
};

const NAV = [
  { href: "#priority", label: "우선순위" },
  { href: "#pre-interview", label: "사전 인터뷰" },
  { href: "#expected-qa", label: "예상 Q&A" },
  { href: "#interviewer-q", label: "역질문" },
  { href: "#checklist", label: "체크리스트" },
  { href: "#keywords", label: "키워드" },
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

export default function BuilditPage() {
  const highAdditional = ADDITIONAL_TOPICS.filter((t) => t.priority === "상");
  const midAdditional = ADDITIONAL_TOPICS.filter((t) => t.priority === "중");

  return (
    <div className="h-screen overflow-y-auto bg-bg-deep text-text-primary">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-10 bg-bg-surface/90 backdrop-blur border-b border-border-subtle px-6 py-2.5 flex items-center gap-6 flex-wrap">
        <span className="font-mono text-xs font-bold text-accent-cyan shrink-0">
          빌드잇 면접 준비
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

          {/* 상 — Fe-Lab */}
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

          {/* 상 — 추가 학습 */}
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

          {/* 중 — Fe-Lab */}
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

          {/* 중 — 추가 학습 */}
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

          {/* 하 */}
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

        {/* ── 2. 사전 인터뷰 필수 답변 ─────────────────────── */}
        <section>
          <SectionHeading id="pre-interview">
            2. 사전 인터뷰 필수 답변 ({PRE_INTERVIEW_QA.length}개)
          </SectionHeading>
          <p className="text-xs text-text-muted font-mono mb-4">
            * 자기소개서 내 사전 질문에 대한 답변 기재 필수 — 면접 전에 반드시 작성 완료
          </p>
          <div className="space-y-2">
            {PRE_INTERVIEW_QA.map((item, i) => (
              <details
                key={i}
                className="rounded-lg border border-accent-cyan/30 bg-bg-surface"
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

        {/* ── 3. 예상 Q&A ──────────────────────────────────── */}
        <section>
          <SectionHeading id="expected-qa">
            3. 예상 질문 & 답변 ({EXPECTED_QA.length}개)
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

        {/* ── 4. 역질문 ─────────────────────────────────────── */}
        <section>
          <SectionHeading id="interviewer-q">4. 면접관에게 할 질문</SectionHeading>
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

        {/* ── 5. 체크리스트 ────────────────────────────────── */}
        <section>
          <SectionHeading id="checklist">5. 준비 체크리스트</SectionHeading>
          <div className="px-4 py-5 rounded-lg border border-border-subtle bg-bg-surface">
            <ChecklistClient />
          </div>
        </section>

        {/* ── 6. 핵심 키워드 ───────────────────────────────── */}
        <section>
          <SectionHeading id="keywords">
            6. 핵심 키워드 ({KEYWORDS.length}개)
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
      </main>
    </div>
  );
}
