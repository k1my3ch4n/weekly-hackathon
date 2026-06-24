import Link from "next/link";
import type { Metadata } from "next";
import ChecklistClient from "./ChecklistClient";
import {
  FIT_INTERVIEW_OVERVIEW,
  CANDIDATE_QUESTIONS,
  EXPECTED_QA,
  CHECKLIST_GROUPS,
  KEYWORDS,
} from "./data";

export const metadata: Metadata = {
  title: "면접 준비 — AIGuru",
  robots: "noindex, nofollow",
};

const NAV = [
  { href: "#overview", label: "핏 인터뷰 개요" },
  { href: "#candidate-q", label: "내 질문 (40분)" },
  { href: "#expected-qa", label: "예상 Q&A (20분)" },
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

export default function AiguruPage() {
  const totalCandidateQuestions = CANDIDATE_QUESTIONS.reduce(
    (sum, group) => sum + group.questions.length,
    0,
  );

  return (
    <div className="h-screen overflow-y-auto bg-bg-deep text-text-primary">
      {/* Sticky Nav */}
      <nav className="sticky top-0 z-10 bg-bg-surface/90 backdrop-blur border-b border-border-subtle px-6 py-2.5 flex items-center gap-6 flex-wrap">
        <span className="font-mono text-xs font-bold text-accent-cyan shrink-0">
          AIGuru 면접 준비
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
        {/* ── 1. 핏 인터뷰 개요 ────────────────────────────── */}
        <section>
          <SectionHeading id="overview">1. 핏 인터뷰 구조</SectionHeading>

          <div className="rounded-xl border border-accent-cyan/30 bg-bg-surface p-5 mb-5">
            <p className="text-sm text-text-secondary leading-relaxed mb-5">
              {FIT_INTERVIEW_OVERVIEW.description}
            </p>
            <div className="flex gap-3">
              <div className="flex-1 rounded-lg border border-accent-cyan bg-accent-cyan-dim px-4 py-3 text-center">
                <p className="font-mono text-2xl font-bold text-accent-cyan">
                  {FIT_INTERVIEW_OVERVIEW.candidateMinutes}분
                </p>
                <p className="font-mono text-xs text-text-muted mt-1">
                  지원자 질문 시간
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  회사 문화·팀·직무 탐색
                </p>
              </div>
              <div className="flex-1 rounded-lg border border-border-subtle bg-bg-elevated px-4 py-3 text-center">
                <p className="font-mono text-2xl font-bold text-text-secondary">
                  {FIT_INTERVIEW_OVERVIEW.companyMinutes}분
                </p>
                <p className="font-mono text-xs text-text-muted mt-1">
                  AIGuru 질문 시간
                </p>
                <p className="text-xs text-text-muted mt-0.5">
                  지원자 간단 파악
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border-subtle bg-bg-surface px-4 py-3">
            <p className="font-mono text-xs text-accent-amber font-bold mb-1">
              핵심 전략
            </p>
            <ul className="space-y-1.5">
              <li className="text-sm text-text-secondary flex gap-2">
                <span className="text-text-muted shrink-0">·</span>
                준비한 질문을 단순 나열하지 말고, 대화처럼 자연스럽게 이어가기
              </li>
              <li className="text-sm text-text-secondary flex gap-2">
                <span className="text-text-muted shrink-0">·</span>
                답변을 들으며 꼬리 질문으로 심층 탐색 — 준비한 질문에만 집착하지 않기
              </li>
              <li className="text-sm text-text-secondary flex gap-2">
                <span className="text-text-muted shrink-0">·</span>
                팀 문화·기술·성장 카테고리를 골고루 다루기
              </li>
            </ul>
          </div>
        </section>

        {/* ── 2. 지원자 질문 (40분) ────────────────────────── */}
        <section>
          <SectionHeading id="candidate-q">
            2. 지원자 질문 ({totalCandidateQuestions}개 · 40분)
          </SectionHeading>
          <p className="text-xs text-text-muted font-mono mb-4">
            * 전체를 다 하려 하지 말고, 대화 흐름에 맞게 3–5개씩 선택해 자연스럽게 진행
          </p>

          <div className="space-y-4">
            {CANDIDATE_QUESTIONS.map((group) => (
              <details
                key={group.category}
                open
                className="rounded-lg border border-border-subtle bg-bg-surface"
              >
                <summary className="px-4 py-3 cursor-pointer list-none flex items-center justify-between hover:bg-bg-elevated transition-colors rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-text-primary">
                      {group.category}
                    </span>
                    <span className="font-mono text-xs text-text-muted">
                      ({group.questions.length}개)
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {group.timeHint && (
                      <span className="font-mono text-xs text-accent-amber">
                        {group.timeHint}
                      </span>
                    )}
                    <span className="text-text-muted text-xs">▼</span>
                  </div>
                </summary>

                <div className="border-t border-border-subtle divide-y divide-border-subtle">
                  {group.questions.map((question, i) => (
                    <div key={i} className="px-4 py-3">
                      <p className="text-sm text-text-primary mb-1.5 leading-relaxed">
                        <span className="font-mono text-xs text-accent-cyan font-bold mr-2">
                          Q{i + 1}.
                        </span>
                        {question.text}
                      </p>
                      <p className="text-xs text-text-muted pl-6">
                        왜 묻나: {question.why}
                      </p>
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── 3. 예상 Q&A (20분) ───────────────────────────── */}
        <section>
          <SectionHeading id="expected-qa">
            3. AIGuru 예상 질문 & 답변 ({EXPECTED_QA.length}개 · 20분)
          </SectionHeading>
          <p className="text-xs text-text-muted font-mono mb-4">
            * 간결하고 솔직하게 — 긴 답변보다 명확한 답변
          </p>
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

        {/* ── 4. 체크리스트 ────────────────────────────────── */}
        <section>
          <SectionHeading id="checklist">
            4. 준비 체크리스트 (
            {CHECKLIST_GROUPS.reduce((sum, g) => sum + g.items.length, 0)}개)
          </SectionHeading>
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
                  <th className="text-left py-2 px-4 text-xs text-text-muted font-semibold w-52">
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
