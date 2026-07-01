import Link from "next/link";
import type { Metadata } from "next";
import ChecklistClient from "./ChecklistClient";
import {
  TECH_INTERVIEW_OVERVIEW,
  PORTFOLIO_SCRIPT,
  TECH_QA_GROUPS,
  FELAB_PRIORITY_GROUPS,
  TECH_CHECKLIST_GROUPS,
  TECH_KEYWORDS,
  BACKEND_TECH_TRANSLATIONS,
  BACKEND_APPEAL_POINTS,
  BACKEND_STORY_FRAME,
  SERVER_DEEP_QA,
  BACKEND_RED_FLAGS,
  GURUSPINN_FOCUS_POINTS,
} from "./data";

export const metadata: Metadata = {
  title: "기술 면접 준비 — AIGuru",
  robots: "noindex, nofollow",
};

const NAV = [
  { href: "#overview", label: "인터뷰 구조" },
  { href: "#backend", label: "백엔드 면접관" },
  { href: "#script", label: "발표 스크립트" },
  { href: "#qa", label: "예상 질문" },
  { href: "#felab", label: "Fe-Lab 학습" },
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
                      part.accent
                        ? "text-accent-magenta"
                        : "text-text-secondary"
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

        {/* ── 2. 백엔드 면접관 전략 ────────────────────────── */}
        <section>
          <SectionHeading id="backend">2. 백엔드 면접관 전략</SectionHeading>
          <p className="text-xs text-text-muted font-mono mb-5">
            * 프론트 구현 세부사항보다 시스템 전체를 어떻게 이해하는지를 본다
            — &ldquo;이 프론트가 백엔드와 협업할 때 짐이 될까, 도움이 될까?&rdquo;
          </p>

          {/* 기술 번역 테이블 */}
          <div className="mb-6">
            <p className="font-mono text-xs font-bold text-accent-amber mb-2">
              기술 결정을 백엔드 언어로 번역하기
            </p>
            <div className="rounded-lg border border-border-subtle overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-bg-elevated border-b border-border-subtle">
                    <th className="text-left py-2 px-4 text-text-muted font-semibold w-36">
                      포트폴리오 결정
                    </th>
                    <th className="text-left py-2 px-4 text-text-muted font-semibold w-48">
                      프론트 중심 설명
                    </th>
                    <th className="text-left py-2 px-4 text-accent-cyan font-semibold">
                      백엔드 번역
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BACKEND_TECH_TRANSLATIONS.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-border-subtle last:border-0 hover:bg-bg-elevated transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-semibold text-text-primary">
                        {row.decision}
                      </td>
                      <td className="py-3 px-4 text-text-muted line-through decoration-text-muted/40">
                        {row.frontend}
                      </td>
                      <td className="py-3 px-4 text-text-secondary">
                        {row.backend}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 어필 포인트 */}
          <div className="mb-6">
            <p className="font-mono text-xs font-bold text-accent-amber mb-2">
              사고방식 & 직무 얼라인 — 어필 포인트 3가지
            </p>
            <div className="space-y-2">
              {BACKEND_APPEAL_POINTS.map((point, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border-subtle bg-bg-surface px-4 py-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-accent-cyan px-1.5 py-0.5 rounded bg-accent-cyan/10">
                      {point.label}
                    </span>
                    <span className="font-mono text-xs font-bold text-text-primary">
                      {point.title}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed mb-2">
                    {point.body}
                  </p>
                  <p className="font-mono text-xs text-accent-amber">
                    → {point.quote}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 스토리 프레임 */}
          <div>
            <p className="font-mono text-xs font-bold text-accent-amber mb-2">
              기술 용어 없이도 전달되는 서사 구조
            </p>
            <div className="rounded-lg border border-border-subtle bg-bg-surface px-4 py-4">
              <p className="text-xs text-text-muted mb-3">
                {BACKEND_STORY_FRAME.description}
              </p>
              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {BACKEND_STORY_FRAME.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-text-primary px-2.5 py-1 rounded-full border border-accent-magenta/40 bg-accent-magenta/10">
                      {step}
                    </span>
                    {i < BACKEND_STORY_FRAME.steps.length - 1 && (
                      <span className="text-text-muted text-xs">→</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="rounded border border-border-subtle bg-bg-elevated px-3 py-3">
                <p className="font-mono text-xs text-text-muted mb-1">
                  {BACKEND_STORY_FRAME.example.label}
                </p>
                <p className="text-sm text-text-secondary leading-relaxed mb-2">
                  &ldquo;{BACKEND_STORY_FRAME.example.text}&rdquo;
                </p>
                <p className="font-mono text-xs text-accent-cyan">
                  💡 {BACKEND_STORY_FRAME.example.note}
                </p>
              </div>
            </div>
          </div>

          {/* 서버 심화 질문 대비 */}
          <div className="mb-6">
            <p className="font-mono text-xs font-bold text-accent-amber mb-2">
              dev-blog-server 심화 질문 대비
            </p>
            <p className="text-xs text-text-muted mb-3">
              * 서버를 언급하면 백엔드 면접관은 진짜 아는지 테스트할 가능성이
              높다 — 이건 그들의 홈그라운드
            </p>
            <div className="space-y-2">
              {SERVER_DEEP_QA.map((item, i) => (
                <details
                  key={i}
                  className="rounded-lg border border-border-subtle bg-bg-surface"
                >
                  <summary className="px-4 py-3 cursor-pointer list-none flex items-start gap-2 hover:bg-bg-elevated transition-colors rounded-lg">
                    <span className="font-mono text-xs text-accent-magenta font-bold shrink-0 mt-0.5">
                      Q.
                    </span>
                    <span className="text-sm text-text-primary">{item.q}</span>
                  </summary>
                  <div className="px-4 pb-4 pt-3 border-t border-border-subtle">
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {item.direction}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* 구루스핀 특화 */}
          <div className="mb-6">
            <p className="font-mono text-xs font-bold text-accent-amber mb-2">
              구루스핀 특화 — 이 회사가 추가로 보는 것
            </p>
            <div className="space-y-2">
              {GURUSPINN_FOCUS_POINTS.map((point, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border-subtle bg-bg-surface px-4 py-3"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-accent-magenta px-1.5 py-0.5 rounded bg-accent-magenta/10">
                      {point.label}
                    </span>
                    <span className="text-xs text-text-muted">
                      {point.question}
                    </span>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {point.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 레드플래그 */}
          <div>
            <p className="font-mono text-xs font-bold text-accent-amber mb-2">
              레드플래그 — 이 패턴이 나오면 감점
            </p>
            <div className="rounded-lg border border-border-subtle overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-bg-elevated border-b border-border-subtle">
                    <th className="text-left py-2 px-4 text-text-muted font-semibold w-1/2">
                      패턴
                    </th>
                    <th className="text-left py-2 px-4 text-text-muted font-semibold">
                      면접관의 해석
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BACKEND_RED_FLAGS.map((flag, i) => (
                    <tr
                      key={i}
                      className="border-b border-border-subtle last:border-0"
                    >
                      <td className="py-2.5 px-4 text-red-400 font-mono">
                        {flag.pattern}
                      </td>
                      <td className="py-2.5 px-4 text-text-secondary">
                        {flag.interpretation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 3. 포트폴리오 발표 스크립트 ─────────────────── */}
        <section>
          <SectionHeading id="script">
            3. 포트폴리오 발표 스크립트 (목표: 3–5분)
          </SectionHeading>
          <p className="text-xs text-text-muted font-mono mb-4">
            * 외우지 말고 흐름을 익히기 — 각 결정의 &apos;왜&apos;를 자기 말로 이야기할
            수 있으면 충분
          </p>
          <div className="space-y-2">
            {PORTFOLIO_SCRIPT.map((section, i) => (
              <details
                key={i}
                open={i === 0}
                className="rounded-lg border border-border-subtle bg-bg-surface"
              >
                <summary className="px-4 py-3 cursor-pointer list-none flex items-center justify-between hover:bg-bg-elevated transition-colors rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-text-primary">
                      {section.label}
                    </span>
                    <span className="font-mono text-xs text-accent-cyan">
                      {section.duration}
                    </span>
                  </div>
                  <span className="text-text-muted text-xs">▼</span>
                </summary>
                <div className="px-4 pb-4 pt-3 border-t border-border-subtle space-y-2">
                  {section.lines.map((line, j) => (
                    <p
                      key={j}
                      className="text-sm text-text-secondary leading-relaxed flex gap-2"
                    >
                      <span className="font-mono text-xs text-text-muted shrink-0 mt-0.5">
                        {j + 1}.
                      </span>
                      {line}
                    </p>
                  ))}
                  {section.tip && (
                    <p className="font-mono text-xs text-accent-amber mt-1">
                      💡 {section.tip}
                    </p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── 4. 예상 기술 질문 & 답변 ────────────────────── */}
        <section>
          <SectionHeading id="qa">
            4. 예상 기술 질문 & 답변 ({totalQA}개)
          </SectionHeading>
          <p className="text-xs text-text-muted font-mono mb-4">
            * 간결하고 솔직하게 — 긴 답변보다 명확한 답변
          </p>
          <div className="space-y-6">
            {TECH_QA_GROUPS.map((group) => (
              <div key={group.category}>
                <h3 className="font-mono text-xs font-bold text-text-muted uppercase tracking-wide mb-2">
                  {group.category}
                </h3>
                <div className="space-y-2">
                  {group.items.map((item, i) => (
                    <details
                      key={i}
                      className="rounded-lg border border-border-subtle bg-bg-surface"
                    >
                      <summary className="px-4 py-3 cursor-pointer list-none flex items-start gap-2 hover:bg-bg-elevated transition-colors rounded-lg">
                        <span className="font-mono text-xs text-accent-cyan font-bold shrink-0 mt-0.5">
                          Q{i + 1}.
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

        {/* ── 5. Fe-Lab 우선 학습 ──────────────────────────── */}
        <section>
          <SectionHeading id="felab">5. Fe-Lab 우선 학습</SectionHeading>
          <p className="text-xs text-text-muted font-mono mb-4">
            * 포트폴리오 발표와 예상 질문에 직접 연결되는 토픽 위주로 먼저 복습
          </p>
          <div className="space-y-5">
            {FELAB_PRIORITY_GROUPS.map((group) => (
              <div key={group.label}>
                <h3 className="font-mono text-xs font-bold text-text-muted uppercase tracking-wide mb-2">
                  {group.label}
                </h3>
                <div className="rounded-lg border border-border-subtle overflow-hidden">
                  <table className="w-full text-sm">
                    <tbody>
                      {group.topics.map((topic) => (
                        <tr
                          key={topic.id}
                          className="border-b border-border-subtle last:border-0 hover:bg-bg-elevated transition-colors"
                        >
                          <td className="py-2.5 px-4 w-52 shrink-0">
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-mono text-xs font-semibold px-1.5 py-0.5 rounded shrink-0 ${
                                  topic.priority === "high"
                                    ? "bg-accent-magenta/15 text-accent-magenta"
                                    : "bg-bg-elevated text-text-muted"
                                }`}
                              >
                                {topic.priority === "high" ? "필수" : "권장"}
                              </span>
                              <Link
                                href={`/topics/${topic.id}`}
                                className="font-mono text-xs text-accent-cyan hover:underline"
                              >
                                {topic.name}
                              </Link>
                            </div>
                          </td>
                          <td className="py-2.5 px-4 text-xs text-text-secondary">
                            {topic.reason}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. 체크리스트 ────────────────────────────────── */}
        <section>
          <SectionHeading id="checklist">
            6. 준비 체크리스트 ({totalChecklist}개)
          </SectionHeading>
          <div className="px-4 py-5 rounded-lg border border-border-subtle bg-bg-surface">
            <ChecklistClient />
          </div>
        </section>

        {/* ── 7. 핵심 키워드 ───────────────────────────────── */}
        <section>
          <SectionHeading id="keywords">
            7. 핵심 키워드 ({TECH_KEYWORDS.length}개)
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
