import Link from "next/link";
import type { Metadata } from "next";
import ChecklistClient from "./ChecklistClient";
import {
  TECH_INTERVIEW_OVERVIEW,
  PORTFOLIO_SCRIPT,
  TECH_QA_GROUPS,
  TECH_CHECKLIST_GROUPS,
  TECH_KEYWORDS,
} from "./data";

export const metadata: Metadata = {
  title: "기술 면접 준비 — AIGuru",
  robots: "noindex, nofollow",
};

const NAV = [
  { href: "#overview", label: "인터뷰 구조" },
  { href: "#script", label: "발표 스크립트" },
  { href: "#qa", label: "예상 질문" },
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

export default function AiguruTechPage() {
  const totalQA = TECH_QA_GROUPS.reduce(
    (sum, group) => sum + group.items.length,
    0,
  );
  const totalChecklist = TECH_CHECKLIST_GROUPS.reduce(
    (sum, group) => sum + group.items.length,
    0,
  );

  return (
    <div className="h-screen overflow-y-auto bg-bg-deep text-text-primary">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-10 bg-bg-surface/90 backdrop-blur border-b border-border-subtle px-6 py-2.5 flex items-center gap-6 flex-wrap">
        <span className="font-mono text-xs font-bold text-accent-magenta shrink-0">
          AIGuru 기술 면접
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
        <div className="ml-auto flex items-center gap-3 shrink-0">
          <Link
            href="/aiguru"
            className="font-mono text-xs text-text-muted hover:text-text-secondary transition-colors"
          >
            ← 1차 핏 인터뷰
          </Link>
          <Link
            href="/"
            className="font-mono text-xs text-text-muted hover:text-text-secondary transition-colors"
          >
            Fe-Lab
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10 space-y-14">
        {/* ── 1. 인터뷰 구조 ──────────────────────────────── */}
        <section>
          <SectionHeading id="overview">1. 기술 인터뷰 구조</SectionHeading>

          <div className="rounded-xl border border-accent-magenta/30 bg-bg-surface p-5 mb-5">
            <p className="text-sm text-text-secondary leading-relaxed mb-5">
              {TECH_INTERVIEW_OVERVIEW.description}
            </p>
            <div className="flex gap-3">
              {TECH_INTERVIEW_OVERVIEW.parts.map((part) => (
                <div
                  key={part.label}
                  className={`flex-1 rounded-lg px-4 py-3 text-center border ${
                    part.accent
                      ? "border-accent-magenta bg-accent-magenta/10"
                      : "border-border-subtle bg-bg-elevated"
                  }`}
                >
                  <p
                    className={`font-mono text-2xl font-bold ${
                      part.accent ? "text-accent-magenta" : "text-text-secondary"
                    }`}
                  >
                    {part.minutes}
                  </p>
                  <p className="font-mono text-xs text-text-muted mt-1">
                    {part.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border-subtle bg-bg-surface px-4 py-3">
            <p className="font-mono text-xs text-accent-amber font-bold mb-1">
              핵심 전략
            </p>
            <ul className="space-y-1.5">
              {TECH_INTERVIEW_OVERVIEW.strategy.map((item, i) => (
                <li key={i} className="text-sm text-text-secondary flex gap-2">
                  <span className="text-text-muted shrink-0">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 2. 포트폴리오 발표 스크립트 ─────────────────── */}
        <section>
          <SectionHeading id="script">
            2. 포트폴리오 발표 스크립트 (목표: 3–5분)
          </SectionHeading>
          <p className="text-xs text-text-muted font-mono mb-4">
            * 외우지 말고 흐름을 익히기 — 각 결정의 '왜'를 자기 말로 이야기할
            수 있으면 충분
          </p>

          <div className="space-y-3">
            {PORTFOLIO_SCRIPT.map((section, i) => (
              <div
                key={i}
                className="rounded-lg border border-border-subtle bg-bg-surface overflow-hidden"
              >
                <div className="flex items-center justify-between px-4 py-3 bg-bg-elevated border-b border-border-subtle">
                  <span className="font-mono text-sm font-bold text-text-primary">
                    {section.label}
                  </span>
                  <span className="font-mono text-xs text-accent-cyan">
                    {section.duration}
                  </span>
                </div>

                <div className="px-4 py-3 space-y-2">
                  {section.lines.map((line, j) => (
                    <p
                      key={j}
                      className="text-sm text-text-secondary leading-relaxed flex gap-2"
                    >
                      <span className="text-text-muted shrink-0 font-mono text-xs mt-0.5">
                        {j + 1}.
                      </span>
                      {line}
                    </p>
                  ))}
                </div>

                {section.tip && (
                  <div className="px-4 py-2 border-t border-border-subtle bg-bg-deep">
                    <p className="text-xs text-accent-amber">
                      💡 {section.tip}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── 3. 예상 기술 질문 & 답변 ────────────────────── */}
        <section>
          <SectionHeading id="qa">
            3. 예상 기술 질문 & 답변 ({totalQA}개)
          </SectionHeading>
          <p className="text-xs text-text-muted font-mono mb-4">
            * 간결하고 솔직하게 — 긴 답변보다 명확한 답변
          </p>

          <div className="space-y-6">
            {TECH_QA_GROUPS.map((group) => (
              <div key={group.category}>
                <h3 className="font-mono text-xs font-bold text-text-muted uppercase tracking-wide mb-3">
                  {group.category}
                </h3>
                <div className="space-y-2">
                  {group.items.map((item, i) => (
                    <details
                      key={i}
                      className="rounded-lg border border-border-subtle bg-bg-surface"
                    >
                      <summary className="px-4 py-3 cursor-pointer list-none flex items-start gap-2 hover:bg-bg-elevated transition-colors rounded-lg">
                        <span className="font-mono text-xs text-accent-magenta font-bold shrink-0 mt-0.5">
                          Q.
                        </span>
                        <span className="text-sm text-text-primary">
                          {item.q}
                        </span>
                      </summary>
                      <div className="px-4 pb-4 pt-3 border-t border-border-subtle">
                        <p className="text-sm text-text-secondary leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. 체크리스트 ────────────────────────────────── */}
        <section>
          <SectionHeading id="checklist">
            4. 준비 체크리스트 ({totalChecklist}개)
          </SectionHeading>
          <div className="px-4 py-5 rounded-lg border border-border-subtle bg-bg-surface">
            <ChecklistClient />
          </div>
        </section>

        {/* ── 5. 핵심 키워드 ───────────────────────────────── */}
        <section>
          <SectionHeading id="keywords">
            5. 핵심 키워드 ({TECH_KEYWORDS.length}개)
          </SectionHeading>
          <div className="rounded-lg border border-border-subtle overflow-hidden">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="bg-bg-elevated border-b border-border-subtle">
                  <th className="text-left py-2 px-4 text-xs text-text-muted font-semibold w-56">
                    개념
                  </th>
                  <th className="text-left py-2 px-4 text-xs text-text-muted font-semibold">
                    한 줄 정의
                  </th>
                </tr>
              </thead>
              <tbody>
                {TECH_KEYWORDS.map((kw, i) => (
                  <tr
                    key={i}
                    className="border-b border-border-subtle last:border-0 hover:bg-bg-elevated transition-colors"
                  >
                    <td className="py-2.5 px-4 text-accent-magenta font-semibold text-xs">
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
