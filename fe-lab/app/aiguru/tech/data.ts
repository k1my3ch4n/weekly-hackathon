export type ScriptSection = {
  label: string;
  duration: string;
  lines: string[];
  tip?: string;
};

export type QAItem = { q: string; a: string };
export type QAGroup = { category: string; items: QAItem[] };
export type ChecklistGroup = { title: string; items: string[] };
export type Keyword = { term: string; def: string };

export type FelabPriorityTopic = {
  id: string;
  name: string;
  reason: string;
  priority: "high" | "medium";
};

export type FelabPriorityGroup = {
  label: string;
  topics: FelabPriorityTopic[];
};

export const TECH_INTERVIEW_OVERVIEW = {
  description:
    "포트폴리오 발표 중심의 기술 심화 면접입니다. 지원자의 개발 산출물을 소개하고, 면접관이 그 결정들을 기술적으로 파고드는 구조입니다.",
  parts: [
    {
      label: "개발자 스토리 + 포트폴리오 발표",
      minutes: "10–15분",
      accent: true,
    },
    {
      label: "기술 질문 & 상호 피드백",
      minutes: "45–50분",
      accent: false,
    },
  ],
  strategy: [
    "포트폴리오 선정 이유부터 말하기 — '왜 이걸 골랐나'가 첫 인상을 만든다",
    "기술 결정마다 '관찰 → 판단 → 결과' 흐름으로 이야기하기",
    "모르는 기술 질문은 '경험은 없지만 이렇게 접근하겠다'로 연결",
    "피드백 받으면 방어하지 말고 '그 관점에서 어떻게 개선할 수 있을까요?'로 전환",
  ],
};

export const PORTFOLIO_SCRIPT: ScriptSection[] = [
  {
    label: "오프닝 — 개발자 스토리",
    duration: "40–50초",
    lines: [
      "저는 '직접 만들어보며 이해하는' 방식으로 성장해왔습니다. 불편함을 발견하면 바로 만들어보고, 운영하면서 생기는 문제를 기술적으로 해결하며 지속적으로 개선해온 개발자입니다.",
      "처음 Vite 기반으로 시작한 블로그를 Next.js로 직접 전환하면서, SSR · ISR · SSG를 모두 실제 프로덕트에 적용하며 렌더링 전략을 깊이 이해하게 됐습니다.",
      "그 경험이 가장 잘 드러나는 산출물로, 직접 설계하고 현재도 운영 중인 블로그 & 포트폴리오 프로젝트를 소개하겠습니다.",
    ],
    tip: "AIGuru가 1차에서 강조한 '만드는 사람' 키워드 + Vite→Next 전환으로 기술 성장 스토리 연결",
  },
  {
    label: "프로젝트 개요",
    duration: "20초",
    lines: [
      "Turborepo 기반 Monorepo로 블로그와 포트폴리오를 통합 운영하고 있습니다. TypeScript, Next.js, Docker, GCP로 구성되며 617커밋 이상 지속적으로 개선해온 실제 운영 프로덕트입니다.",
    ],
    tip: "기술 스택을 빠르게 언급하되 커밋 수로 지속성을 보여주기",
  },
  {
    label: "결정 1 — On-demand ISR 전환",
    duration: "40초",
    lines: [
      "처음엔 60초마다 자동 재검증하는 ISR을 적용했는데, 블로그 특성상 글이 자주 올라가지 않는데도 서버가 계속 재빌드되는 낭비를 직접 목격했습니다.",
      "게시글 추가 시에만 /api/revalidate를 호출하는 온디맨드 방식으로 전환해 불필요한 캐시 갱신을 제거했습니다.",
    ],
    tip: "'잘못 설정된 걸 스스로 발견하고 고쳤다'는 흐름 — 기술 결정에 관찰이 선행됨을 보여주기",
  },
  {
    label: "결정 2 — GraphQL 서버 → Next.js → 정적 상수",
    duration: "50초",
    lines: [
      "처음엔 Express + Apollo Server + PostgreSQL을 Docker로 패키징해 GCP에 별도 서버로 직접 운영했습니다. 태그 필터링을 위해 PostgreSQL의 TEXT[]를 의도적으로 선택했고, GraphQL로 API를 설계했습니다.",
      "그런데 운영하다 보니 이 서버가 변하지 않는 데이터만 serve하고 있었습니다. 먼저 별도 서버를 Next.js API Route로 통합했고, 최종적으로는 서버 자체를 제거해 정적 상수로 전환했습니다.",
      "'쓸데없이 복잡하게 만들었다'는 인식과 단계적 간소화가 저에게 가장 큰 배움이었습니다.",
    ],
    tip: "3단계 진화 (독립 서버 → 통합 → 제거) — 백엔드 면접관은 이 의사결정 흐름을 더 명확하게 이해하고 평가할 수 있음",
  },
  {
    label: "결정 3 — Server Component 마이그레이션",
    duration: "40초",
    lines: [
      "기존에 prefetchHomeData()로 서버에서 조회한 뒤 QueryClient에 넣고 클라이언트에서 useQuery()로 다시 꺼내는 패턴을 썼는데, 중복 요청이 발생할 수 있는 구조였습니다.",
      "Server Component에서 직접 데이터를 조회해 Props로 내려주는 방식으로 단순화했고, 폴더명도 prefetcher/ → data/로 의도를 명확히 했습니다.",
    ],
    tip: "Next.js 렌더링 이해도를 보여줄 수 있는 포인트 — 코드 구조가 의도를 드러내게 개선했음을 강조",
  },
  {
    label: "보조 언급 — AI Actions",
    duration: "30초",
    lines: [
      "추가로, GitHub Actions 기반 AI 코드 리뷰어를 직접 만들어 Marketplace에 공개했습니다.",
      "Claude와 Gemini를 같은 인터페이스로 추상화해 TypeScript로 구현했으며, AI를 사용하는 것에서 AI 도구를 직접 만드는 경험으로 전환된 계기가 됐습니다.",
    ],
    tip: "1차 면접에서 AI 협업 철학을 이야기 나눴으므로 자연스럽게 연결 가능",
  },
  {
    label: "클로징",
    duration: "15초",
    lines: [
      "이 두 프로젝트가 임팩트 있는 이유는, 모든 결정에 '왜'가 있고 그 결과를 직접 운영하며 검증할 수 있었기 때문입니다.",
    ],
    tip: "발표 후 자연스럽게 피드백 요청으로 전환 가능 — '추가로 궁금하신 부분이 있으실까요?'",
  },
];

export const TECH_QA_GROUPS: QAGroup[] = [
  {
    category: "포트폴리오 심화",
    items: [
      {
        q: "On-demand ISR에서 revalidate 호출은 어디서 어떻게 하나요?",
        a: "글 추가 API가 호출될 때 /api/revalidate 엔드포인트에서 revalidatePath('/blog')를 실행합니다. Next.js App Router의 cache tag 기반 방식도 고려했지만, 경로 기반으로 단순하게 처리하는 게 현재 규모에 적합했습니다.",
      },
      {
        q: "DB를 제거했는데, 게시글이 많아지면 어떻게 할 건가요?",
        a: "현재 규모에서는 정적 상수가 더 단순하고 안전합니다. 게시글이 수백 개 이상으로 늘거나 사용자별 데이터가 필요해지는 시점에 DB 재도입을 고려하겠습니다. 지금 단계에서 DB를 유지하는 건 오버엔지니어링이라고 판단했습니다.",
      },
      {
        q: "Server Component로 전환한 후 TanStack Query는 어디서 사용하나요?",
        a: "서버에서 조회 가능한 초기 데이터는 Server Component에서 처리하고, 클라이언트 인터랙션에 따른 갱신이나 mutation은 React Query로 처리합니다. 서버/클라이언트 상태를 역할에 따라 명확히 나누는 방향으로 가고 있습니다.",
      },
      {
        q: "GraphQL을 Next.js API Route로 통합했는데, 다음에도 GraphQL을 선택할 건가요?",
        a: "처음엔 Express + Apollo Server로 독립 서버를 직접 구축해 GCP에 운영했습니다. 그 과정에서 GraphQL이 여러 클라이언트가 다양한 형태로 데이터를 요청할 때 진가를 발휘한다는 걸 체감했고, 블로그처럼 클라이언트가 하나인 경우엔 오버스펙이었습니다. 소규모 프로젝트에서는 REST나 Next.js Server Actions가 더 적합하다고 판단합니다.",
      },
    ],
  },
  {
    category: "1차 면접 연속 질문",
    items: [
      {
        q: "스토리북을 도입했다고 하셨는데, 어떤 문제를 해결하려고 도입했나요?",
        a: "디자인-개발 사이의 소통 비용을 줄이기 위해 도입을 제안했습니다. 버튼, 모달 같은 공통 컴포넌트를 스토리로 만들어 디자이너가 직접 확인하고 피드백할 수 있게 했고, 백엔드 없이 컴포넌트를 독립적으로 테스트할 수 있어 개발 속도도 빨라졌습니다.",
      },
      {
        q: "AI 코드 리뷰에서 의도와 다른 결과가 나오면 어떻게 처리하나요?",
        a: "AI의 제안을 바로 적용하지 않고 근거를 먼저 확인합니다. 납득이 되면 적용하고, 납득이 안 되면 반론을 제시하며 다시 대화합니다. AI Actions를 직접 만들면서 AI 리뷰 품질의 한계를 체감했고, 코드 품질의 기준은 항상 제가 직접 유지합니다.",
      },
      {
        q: "피그마 레이어/변수 정리 문제는 어떻게 해결하셨나요?",
        a: "개발 시작 전에 디자이너와 명명 규칙을 먼저 맞췄고, 변경 사항은 미리 공유해달라고 요청했습니다. 개발 중간에 갑자기 바뀌는 것보다 초기에 자주 소통하는 것이 전체 속도를 오히려 빠르게 한다는 걸 경험으로 알았습니다.",
      },
      {
        q: "'만드는 사람'으로서 비즈니스 관점에서 기술 결정을 내린 경험이 있나요?",
        a: "DB를 정적 상수로 전환한 결정이 그 예입니다. 기술적으로 PostgreSQL이 더 확장 가능한 선택이었지만, 현재 규모에서 DB 유지 비용과 복잡도가 실제 가치를 만들지 못한다고 판단했습니다. 당장 필요 없는 복잡성을 제거하는 것이 더 좋은 제품 결정이었습니다.",
      },
    ],
  },
  {
    category: "직무 기술 질문",
    items: [
      {
        q: "Next.js에서 SSR, SSG, ISR, CSR 중 언제 무엇을 선택하나요?",
        a: "사용자별 다른 데이터가 필요하면 SSR, SEO가 필요한 정적 콘텐츠는 SSG, 콘텐츠가 주기적으로 업데이트되면 ISR, 인증 이후 인터랙션이 많은 대시보드는 CSR을 선택합니다. 블로그는 콘텐츠 추가 시에만 변하므로 On-demand ISR이 최적이었습니다.",
      },
      {
        q: "TanStack React Query에서 staleTime과 gcTime의 차이는?",
        a: "staleTime은 데이터를 '신선하다'고 판단하는 기간으로, 이 시간 내에는 캐시를 그대로 사용합니다. gcTime은 쿼리를 사용하는 컴포넌트가 언마운트된 후에도 캐시가 메모리에 유지되는 기간입니다. staleTime이 지나면 다음 마운트 시 백그라운드에서 refetch가 발생합니다.",
      },
      {
        q: "zustand와 TanStack Query를 함께 쓸 때 어떻게 역할을 나누나요?",
        a: "서버에서 오는 데이터(비동기, 캐싱 필요)는 React Query로, 클라이언트에서만 존재하는 UI 상태(모달 열림/닫힘, 선택된 탭, 필터 값 등)는 zustand로 관리합니다. 둘의 역할을 명확히 나누면 상태가 어디서 관리되는지 파악하기 쉬워집니다.",
      },
      {
        q: "TypeScript 제네릭을 어떤 상황에서 활용하셨나요?",
        a: "API 응답 타입을 공통화할 때 주로 사용했습니다. ApiResponse<T>로 data, error, status 구조를 고정하고 T만 교체하는 방식으로 일관된 응답 처리 패턴을 만들었습니다. AI Actions에서도 Claude와 Gemini를 동일한 인터페이스로 추상화할 때 활용했습니다.",
      },
      {
        q: "Turborepo Monorepo를 도입한 이유와 실제 장단점은?",
        a: "블로그와 포트폴리오 두 앱이 공통 컴포넌트와 훅을 공유해야 했기 때문에 도입했습니다. packages/로 공유 모듈을 분리해 중복 코드를 줄이고, Turborepo의 태스크 캐싱으로 빌드 속도를 단축했습니다. 다만 초기 설정 비용이 있어 단일 앱에서는 굳이 사용할 필요가 없다고 생각합니다.",
      },
    ],
  },
];

export const FELAB_PRIORITY_GROUPS: FelabPriorityGroup[] = [
  {
    label: "최우선 — 포트폴리오와 직접 연결",
    topics: [
      {
        id: "rendering-patterns",
        name: "CSR / SSR / ISR / SSG",
        reason:
          "On-demand ISR 결정의 기반 — 4가지 렌더링 방식을 비교하고 '왜 ISR을 선택했나'를 설명할 수 있어야 함",
        priority: "high",
      },
      {
        id: "server-components",
        name: "React Server Components",
        reason:
          "Server Component 마이그레이션이 포트폴리오 핵심 결정 — RSC와 Client Component의 경계, hydration 흐름 이해 필요",
        priority: "high",
      },
      {
        id: "nextjs-deep-dive",
        name: "Next.js 심화",
        reason:
          "주력 기술 스택 — App Router 구조, Route Handler, caching 레이어, revalidate 동작 방식",
        priority: "high",
      },
      {
        id: "react-query",
        name: "React Query",
        reason:
          "staleTime vs gcTime 질문이 예상 Q&A에 포함 — zustand와의 역할 구분 설명까지 연결",
        priority: "high",
      },
    ],
  },
  {
    label: "핵심 기본기 — 기술 깊이 확인",
    topics: [
      {
        id: "state-management",
        name: "상태 관리 패턴",
        reason:
          "Zustand vs React Query 역할 구분 기준 — 서버 상태와 클라이언트 UI 상태를 어떻게 나누는지 설명 준비",
        priority: "medium",
      },
      {
        id: "http-cache",
        name: "HTTP 캐시 전략",
        reason:
          "ISR 이해의 기반 — Cache-Control, stale-while-revalidate 흐름을 알아야 캐싱 결정을 깊이 설명 가능",
        priority: "medium",
      },
      {
        id: "graphql-rest",
        name: "GraphQL vs REST",
        reason:
          "GraphQL 서버 → Next.js API Route 전환 경험 연결 — 왜 GraphQL이 이 프로젝트에 불필요했는지 설명",
        priority: "medium",
      },
      {
        id: "generics",
        name: "제네릭과 유틸리티 타입",
        reason:
          "TypeScript 100% 강점 표현 — AI Actions 멀티 프로바이더 추상화 사례와 연결 가능",
        priority: "medium",
      },
      {
        id: "reconciliation",
        name: "재조정 (Reconciliation)",
        reason:
          "React 내부 동작 기본기 — key prop 사용 이유, 불필요한 리렌더링 최적화 판단 근거",
        priority: "medium",
      },
      {
        id: "module-bundling",
        name: "모듈 번들링과 최적화",
        reason:
          "Turborepo Monorepo 구조 이해와 연결 — 빌드 태스크 캐싱, 번들 분리 전략",
        priority: "medium",
      },
    ],
  },
];

export const TECH_CHECKLIST_GROUPS: ChecklistGroup[] = [
  {
    title: "포트폴리오 발표 준비",
    items: [
      "발표 스크립트 전체를 3번 소리 내어 읽기 (목표: 3–5분)",
      "ISR / DB / Server Component 각 결정을 한 문장으로 요약 연습",
      "AI Actions 30초 보조 언급 자연스럽게 연결 연습",
      "'임팩트가 있었던 이유' 클로징 문장 외우기",
      "blog.k1my3ch4n.xyz 사이트 열어두고 면접 당일 참조 준비",
    ],
  },
  {
    title: "기술 질문 대비",
    items: [
      "포트폴리오 심화 4개 소리 내어 답변 연습",
      "1차 면접 연속 질문 4개 — 구체적 사례 포함해 답변 연습",
      "Next.js 렌더링 방식 4가지 비교 설명 연습",
      "staleTime vs gcTime 차이 한 문장으로 정리",
      "zustand vs React Query 구분 기준 즉시 대답 가능하게 연습",
    ],
  },
  {
    title: "면접 당일",
    items: [
      "발표 시간 3–5분 타이머로 최종 리허설",
      "GitHub 레포 링크 열어두기 (ai-code-reviewer, dev-next-blog)",
      "모르는 질문은 '경험은 없지만 이렇게 접근하겠다'로 연결",
      "피드백 받으면 방어하지 말고 '그 관점에서 어떻게 개선할 수 있을까요?'로 전환",
    ],
  },
];

export type TechTranslation = {
  decision: string;
  frontend: string;
  backend: string;
};

export type AppealPoint = {
  label: string;
  title: string;
  body: string;
  quote: string;
};

export type StoryFrame = {
  description: string;
  steps: string[];
  example: { label: string; text: string; note: string };
};

export const BACKEND_TECH_TRANSLATIONS: TechTranslation[] = [
  {
    decision: "On-demand ISR",
    frontend: "revalidatePath를 콘텐츠 변경 시 호출",
    backend:
      "캐시 무효화를 이벤트 기반으로 설계해 서버 재빌드 낭비 제거",
  },
  {
    decision: "GraphQL 서버 → 정적 상수",
    frontend: "DB를 정적 상수로 전환",
    backend:
      "Express + Apollo + PostgreSQL Docker 서버를 직접 구축·운영했으나, 불변 데이터에 독립 서버 유지 비용이 불합리하다 판단해 단계적으로 제거",
  },
  {
    decision: "Server Component",
    frontend: "Props로 데이터 내려줌",
    backend:
      "클라이언트-서버 왕복 요청을 줄이기 위해 데이터 fetching을 서버 쪽으로 올림",
  },
];

export const BACKEND_APPEAL_POINTS: AppealPoint[] = [
  {
    label: "풀스택 경험",
    title: "백엔드 서버를 직접 구축하고 운영한 경험",
    body: "Express + Apollo Server + PostgreSQL 서버를 Docker로 패키징해 GCP에 직접 배포·운영했습니다. pg.Pool 커넥션 풀링, TEXT[] 타입 선택, API Key 인증 미들웨어, GraphQL 스키마 설계까지 직접 구현했습니다. 이후 스스로 필요 없다고 판단해 단계적으로 제거한 경험이 있습니다.",
    quote: "API를 소비하는 것에서 API를 설계·운영·제거하는 경험까지",
  },
  {
    label: "협업 능력",
    title: "백엔드 협업 능력을 직접 드러내기",
    body: "스토리북을 도입한 이유 중 하나가, 백엔드 없이도 컴포넌트를 독립적으로 테스트할 수 있어서 API가 완성되기 전에 프론트 작업을 완료할 수 있었기 때문입니다.",
    quote: "이 프론트가 우리 작업을 막지 않겠다",
  },
  {
    label: "AI 얼라인",
    title: "AI 솔루션 직무 얼라인",
    body: "AI Actions에서 Claude와 Gemini를 같은 인터페이스로 추상화한 경험 — AI를 사용하는 것에서 AI 도구를 직접 만드는 개발자로 전환한 경험으로 직결됩니다.",
    quote: "AI를 사용하는 것에서 AI 도구를 직접 만드는 개발자",
  },
  {
    label: "트레이드오프",
    title: "트레이드오프 사고 증명하기",
    body: "기술적으로 확장 가능한 선택(DB 유지)보다, 현재 문제를 가장 단순하게 해결하는 선택을 했습니다. 오버엔지니어링을 스스로 인식하고 되돌렸습니다.",
    quote: "복잡성 판단력 — 백엔드 개발자가 가장 존중하는 역량",
  },
];

export type ServerDeepQA = {
  q: string;
  direction: string;
};

export type RedFlag = {
  pattern: string;
  interpretation: string;
};

export type CompanyFocusPoint = {
  label: string;
  question: string;
  answer: string;
};

export const SERVER_DEEP_QA: ServerDeepQA[] = [
  {
    q: "TEXT[]를 선택한 이유가 뭔가요?",
    direction:
      "태그 다중값 저장 + ANY() 연산자로 필터링 — JSONB보다 단순한 배열 조작에 적합했습니다.",
  },
  {
    q: "pg.Pool을 쓴 이유가 뭔가요?",
    direction:
      "요청마다 새 커넥션을 생성하면 오버헤드가 발생합니다. Pool로 커넥션을 재사용해 그 비용을 줄였습니다.",
  },
  {
    q: "API Key 인증을 Express 미들웨어로 구현했는데, 문제점은?",
    direction:
      "모든 요청에 동일한 키를 사용하므로 키 노출 시 전체를 무효화해야 합니다. JWT라면 만료 시간을 설정하고 토큰별로 관리할 수 있습니다.",
  },
  {
    q: "N+1 문제를 고려했나요?",
    direction:
      "GraphQL 리졸버에서 posts를 조회한 뒤 각 post마다 추가 쿼리가 발생할 수 있습니다. DataLoader 패턴으로 배치 처리해 쿼리를 묶을 수 있습니다.",
  },
];

export const BACKEND_RED_FLAGS: RedFlag[] = [
  {
    pattern: "기술 이름만 나열, 왜를 못 설명",
    interpretation: "써봤지만 이해하지 못한 것으로 판단",
  },
  {
    pattern: '"백엔드가 이렇게 해주면 됩니다" 식 발언',
    interpretation: "협업 비용이 높은 타입으로 분류",
  },
  {
    pattern: "실패 경험이 없음",
    interpretation: "충분히 도전하지 않았거나 반성이 없다고 판단",
  },
  {
    pattern: "자기 결정에 대한 방어적 태도",
    interpretation: "피드백 수용이 어려운 타입으로 분류",
  },
];

export const GURUSPINN_FOCUS_POINTS: CompanyFocusPoint[] = [
  {
    label: "소수 정예",
    question: "자기 영역 밖을 커버할 수 있나?",
    answer:
      "Docker/GCP 배포를 직접 해봤고, AI 도구도 직접 만들었습니다. 프론트 외 영역에서도 스스로 움직인 경험이 있습니다.",
  },
  {
    label: "AI 솔루션",
    question: "AI를 도구로 쓰는 수준인가, 만드는 수준인가?",
    answer:
      "AI Actions에서 Claude와 Gemini를 추상화해 직접 만든 경험이 있습니다. 사용하는 것에서 만드는 것으로 전환한 시점이 있습니다.",
  },
  {
    label: "프로덕트 사고",
    question: "기술 결정이 비즈니스 판단과 연결되는가?",
    answer:
      "PostgreSQL 제거는 기술적 선택이 아니라 운영 비용 판단이었습니다. 복잡성이 실제 가치를 만들지 못한다고 판단했습니다.",
  },
];

export const BACKEND_STORY_FRAME: StoryFrame = {
  description:
    "기술 용어 없이도 전달되는 서사 구조 — 이 패턴이 반복되면 '어떤 스택이든 같은 방식으로 문제를 푸는 개발자'라는 인상을 남긴다.",
  steps: ["불편함 발견", "원인 분석", "결정", "검증"],
  example: {
    label: "ISR 사례 적용 예시",
    text: "처음엔 60초마다 자동으로 서버가 재빌드되는 걸 당연히 여겼는데, 직접 운영하다 보니 아무것도 바뀌지 않는데도 계속 재빌드되는 걸 목격했습니다. 그래서 '콘텐츠가 추가될 때만 캐시를 갱신'하도록 설계를 바꿨고, 불필요한 서버 부하가 사라졌습니다.",
    note: "SSR/ISR을 모르는 사람도 '문제를 발견하고 개선하는 사람'이라는 걸 이해할 수 있음",
  },
};

export const TECH_KEYWORDS: Keyword[] = [
  {
    term: "On-demand ISR",
    def: "콘텐츠 변경 시점에만 /api/revalidate 호출로 캐시 갱신 — 자동 재검증 대비 서버 부하 최소화",
  },
  {
    term: "Server Component",
    def: "서버에서 직접 데이터 조회 후 Props 전달 — 클라이언트 추가 요청 제거",
  },
  {
    term: "정적 상수 vs 런타임 조회",
    def: "변하지 않는 데이터는 빌드 타임 상수로 관리 — 런타임 DB 의존성 제거",
  },
  {
    term: "staleTime",
    def: "데이터를 신선하다고 판단하는 기간 — 이 시간 내에는 네트워크 요청 없이 캐시 사용",
  },
  {
    term: "gcTime (cacheTime)",
    def: "언마운트 후 캐시가 메모리에 유지되는 기간 — 기본값 5분",
  },
  {
    term: "Turborepo Monorepo",
    def: "여러 앱이 공통 패키지를 공유하는 구조 — 빌드 캐싱으로 속도 최적화",
  },
  {
    term: "오버엔지니어링",
    def: "현재 필요 이상의 복잡성을 도입하는 것 — 단순한 해결책이 더 나은 판단",
  },
  {
    term: "멀티 AI 프로바이더 추상화",
    def: "Claude / Gemini를 동일 인터페이스로 감싸 교체 가능하게 설계",
  },
  {
    term: "prefetch 패턴 → Server Component",
    def: "QueryClient 캐시 우회 → 서버에서 직접 조회 후 Props 전달로 단순화",
  },
  {
    term: "ADR (Architecture Decision Record)",
    def: "기술 결정의 배경과 이유를 문서화 — '왜 이 기술을 선택했나' 기록",
  },
];
