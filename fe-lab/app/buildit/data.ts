export type TopicLink = {
  name: string;
  link: string;
  reason: string;
};

export type AdditionalTopic = {
  name: string;
  priority: "상" | "중";
  qa: { q: string; a: string }[];
};

export type QAItem = {
  q: string;
  a: string;
};

export type Keyword = {
  term: string;
  def: string;
};

// ── 우선순위 상 ──────────────────────────────────────────────────────
export const HIGH_TOPICS: TopicLink[] = [
  {
    name: "TypeScript 제네릭 & 유틸리티 타입",
    link: "/topics/generics",
    reason: "기술스택 핵심 — TypeScript 기반 개발 자격요건, 제네릭·유틸리티 타입으로 재사용 가능한 타입 설계",
  },
  {
    name: "타입 가드 & 판별 유니온",
    link: "/topics/type-guard",
    reason: "런타임 타입 안전성 — 외부 API 응답 처리, 판별 유니온으로 조건 분기 타입 좁히기",
  },
  {
    name: "상태 관리 패턴",
    link: "/topics/state-management",
    reason: "Zustand 기술스택 명시 — Context vs Zustand vs Redux 트레이드오프 설명 필수",
  },
  {
    name: "Hooks 라이프사이클",
    link: "/topics/hooks-lifecycle",
    reason: "React FE 핵심, 사이드 이펙트·의존성 배열·클린업 이해 필수",
  },
  {
    name: "React Server Components",
    link: "/topics/server-components",
    reason: "Next.js App Router 기반 개발 핵심 — 서버/클라이언트 경계 설계",
  },
  {
    name: "Next.js 심화 (App Router)",
    link: "/topics/nextjs-deep-dive",
    reason: "React/Next.js 기술스택 핵심 — Middleware · Server Actions · ISR",
  },
  {
    name: "Promise / 비동기 처리",
    link: "/topics/promise",
    reason: "엔터프라이즈 API 연동·에러 핸들링 기반 — async/await · Promise.all",
  },
  {
    name: "React Query (TanStack Query)",
    link: "/topics/react-query",
    reason: "서버 상태 관리 패턴 — queryKey 설계·staleTime·Optimistic Update",
  },
  {
    name: "React 메모이제이션",
    link: "/topics/react-memo",
    reason: "성능 개선 업무 명시 — useMemo·useCallback·React.memo 정확한 사용",
  },
];

// ── 우선순위 중 ──────────────────────────────────────────────────────
export const MEDIUM_TOPICS: TopicLink[] = [
  {
    name: "렌더링 패턴 (CSR / SSR / ISR / SSG)",
    link: "/topics/rendering-patterns",
    reason: "Next.js 맥락에서 상황별 선택 근거 설명 가능해야 함",
  },
  {
    name: "Virtual DOM & Reconciliation",
    link: "/topics/virtual-dom",
    reason: "React 동작 원리, key를 써야 하는 이유 질문 대비",
  },
  {
    name: "모듈 번들링과 최적화",
    link: "/topics/module-bundling",
    reason: "성능 개선 업무 — 번들 크기 최적화, Tree Shaking, Code Splitting",
  },
  {
    name: "HTTP 캐시 전략",
    link: "/topics/http-cache",
    reason: "응답 시간 개선 업무 — Cache-Control · ETag · stale-while-revalidate",
  },
  {
    name: "이벤트 루프",
    link: "/topics/event-loop",
    reason: "JS 비동기 동작 이해 기반 — 마이크로/매크로 태스크 실행 순서",
  },
  {
    name: "CORS",
    link: "/topics/cors",
    reason: "REST API 연동 · 외부 시스템 통합 업무 필수",
  },
  {
    name: "XSS / CSRF 방지",
    link: "/topics/xss-csrf",
    reason: "엔터프라이즈 솔루션 — 보안 의식이 중요한 환경",
  },
  {
    name: "Suspense / Error Boundary",
    link: "/topics/suspense-error-boundary",
    reason: "통합 테스트·이슈 분석 업무 — React Query와 함께 쓰는 에러 처리 패턴",
  },
  {
    name: "크리티컬 렌더링 패스",
    link: "/topics/critical-rendering-path",
    reason: "성능 모니터링 도구 활용·개선 포인트 도출 업무 관련",
  },
];

// ── 우선순위 하 ──────────────────────────────────────────────────────
export const LOW_TOPICS: TopicLink[] = [
  {
    name: "클로저",
    link: "/topics/closure",
    reason: "JS 면접 단골, 개념 이해 수준으로 충분",
  },
  {
    name: "스코프와 실행 컨텍스트",
    link: "/topics/scope-context",
    reason: "클로저와 겹침, 기초 이해 수준",
  },
  {
    name: "인증 / 인가 전략 (JWT / OAuth)",
    link: "/topics/auth-strategy",
    reason: "엔터프라이즈 솔루션에 필요하지만 BE가 주로 처리",
  },
  {
    name: "리플로우 / 리페인트",
    link: "/topics/reflow-repaint",
    reason: "애니메이션·스크롤 성능 최적화 맥락",
  },
  {
    name: "디바운스 / 쓰로틀",
    link: "/topics/debounce-throttle",
    reason: "실무 경험으로 대체 가능",
  },
  {
    name: "WebSocket vs SSE",
    link: "/topics/websocket-sse",
    reason: "실시간 기능 가능성 있지만 직접적인 자격요건 아님",
  },
  {
    name: "깊은 복사 / 얕은 복사",
    link: "/topics/deep-shallow-copy",
    reason: "간단히 설명 가능하면 충분",
  },
];

// ── 추가 학습 항목 (Fe-Lab 외) ────────────────────────────────────────
export const ADDITIONAL_TOPICS: AdditionalTopic[] = [
  {
    name: "AI Code Assistant / Agent 활용",
    priority: "상",
    qa: [
      {
        q: "AI Code Assistant를 개발 생산성 향상에 어떻게 활용하셨나요?",
        a: "Claude Code를 활용해 반복적인 보일러플레이트 코드 생성, TypeScript 타입 정의를 자동화했습니다. AI가 생성한 초안을 검증·수정하는 방식으로 단순 작업 시간을 크게 줄였습니다. 아키텍처 결정 시 트레이드오프를 함께 검토하는 페어 프로그래밍 도구로도 활용합니다.",
      },
      {
        q: "AI Agent와 AI Code Assistant의 차이는 무엇인가요?",
        a: "AI Code Assistant는 코드 자동완성·생성·리뷰처럼 개발자를 보조하는 도구입니다. AI Agent는 목표를 주면 스스로 계획을 세우고 도구(파일 읽기, 코드 실행, API 호출)를 선택해 멀티 스텝 작업을 자율적으로 수행합니다. 빌드잇의 Studio Business처럼 AI Agent가 콘텐츠 생성·채널 관리를 자동화하는 것이 Agent의 핵심 활용 사례입니다.",
      },
    ],
  },
  {
    name: "REST API 설계 원칙",
    priority: "상",
    qa: [
      {
        q: "REST API를 설계할 때 중요하게 생각하는 원칙은 무엇인가요?",
        a: "①리소스 중심 URL — /users/{id}/orders처럼 행위가 아닌 리소스로 설계. ②HTTP 메서드 의미 준수 — GET·POST·PUT·PATCH·DELETE 의미에 맞게. ③일관된 에러 응답 — code·message·details 구조로 표준화. ④상태 코드 정확히 — 201 Created, 204 No Content, 422 Validation Error 등. 에러 응답 구조가 일관적이면 FE에서 공통 에러 핸들러를 만들 수 있습니다.",
      },
      {
        q: "이상적인 FE/BE API 협의 방식은 무엇이라고 생각하나요?",
        a: "FE가 소비하기 좋은 API 구조를 초기에 함께 정의하는 것이 중요합니다. nullable 여부·페이지네이션 방식·에러 응답 구조를 사전에 합의하면 나중 수정 비용이 줄어듭니다. UI 요구사항에 맞지 않는 응답 구조는 BFF 패턴이나 필드 추가로 해결할 수 있습니다.",
      },
    ],
  },
  {
    name: "Vue/Nuxt.js + Pinia",
    priority: "중",
    qa: [
      {
        q: "React와 Vue의 핵심 차이점은 무엇인가요?",
        a: "React는 JSX 기반의 단방향 데이터 흐름, Vue는 템플릿 기반 양방향 바인딩(v-model)이 기본입니다. 상태관리는 React가 Zustand/Redux, Vue가 Pinia를 주로 씁니다. Vue Composition API와 React Hooks는 개념적으로 유사해 전환 비용이 예상보다 낮습니다. 핵심 개념(컴포넌트 설계, 반응성, 상태 흐름)은 공통입니다.",
      },
      {
        q: "Nuxt.js가 Next.js와 다른 점은 무엇인가요?",
        a: "Nuxt.js는 Vue 기반, Next.js는 React 기반의 메타프레임워크입니다. 둘 다 SSR·SSG·파일 시스템 기반 라우팅을 지원합니다. Nuxt의 auto-import는 컴포넌트·컴포저블을 자동으로 임포트해줍니다. Nuxt의 useFetch/useAsyncData가 Next.js의 서버 컴포넌트 fetch와 유사한 역할을 합니다.",
      },
    ],
  },
  {
    name: "Docker & 컨테이너 기초",
    priority: "중",
    qa: [
      {
        q: "Docker를 프론트엔드 개발에서 어떻게 활용하나요?",
        a: "로컬 개발 환경 통일에 docker-compose를 씁니다. FE 앱은 멀티 스테이지 빌드로 build 스테이지(Node 이미지)와 serve 스테이지(nginx 이미지)를 분리해 이미지 크기를 줄입니다. 환경변수는 ARG/ENV로 주입하고 .env는 이미지에 포함하지 않습니다. CI/CD에서 Docker 이미지 빌드 → ECR 푸시 → ECS 배포 파이프라인을 구성합니다.",
      },
    ],
  },
];

// ── 사전 인터뷰 필수 답변 ─────────────────────────────────────────────
export const PRE_INTERVIEW_QA: QAItem[] = [
  {
    q: "AI를 활용하여 개발 생산성을 향상시킨 경험을 서술해주세요.",
    a: "Claude Code를 개발 전 과정에 적극 도입했습니다. 반복적인 API 연동 코드, TypeScript 타입 정의에서 AI 초안을 생성 후 검증·수정하는 방식으로 작업 속도를 크게 높였습니다. 아키텍처 결정 시 트레이드오프를 AI와 함께 검토하는 방식으로 활용하기도 합니다. 단순 자동완성을 넘어 코드 리뷰·리팩토링 제안까지 협업 도구로 사용하고 있습니다.",
  },
  {
    q: "FE/BE 경계를 넘어 개발한 경험이 있다면 서술해주세요.",
    a: "개인 블로그 프로젝트에서 FE/BE를 모두 담당했습니다. PostgreSQL로 DB 스키마를 직접 설계하고 Google Cloud SQL과 연결했으며, WebSocket 서버를 구축해 실시간 기능을 구현했습니다. BE를 직접 운영하면서 API 응답 구조 설계, 인증 처리, DB 스키마 정규화 등을 경험했고, FE 개발자 관점에서 '소비하기 좋은 API'가 어떤 형태인지 직접 체득할 수 있었습니다.",
  },
  {
    q: "해당되시는 우대사항이 있다면 관련 경험을 서술해주세요.",
    a: "TypeScript를 strict 모드로 활용해 런타임 에러를 컴파일 타임에 최대한 잡는 개발 방식을 유지하고 있습니다. REST API 설계 경험은 개인 블로그 백엔드에서 리소스 중심 URL 설계·HTTP 메서드 의미 준수·표준화된 에러 응답 구조를 직접 구성하며 쌓았습니다. SQL 측면에서는 PostgreSQL을 활용해 스키마 설계와 기본적인 쿼리 작성 경험이 있습니다.",
  },
];

// ── 예상 질문 & 답변 ──────────────────────────────────────────────────
export const EXPECTED_QA: QAItem[] = [
  {
    q: "Zustand를 상태관리 라이브러리로 선택한 이유는 무엇인가요?",
    a: "Zustand는 보일러플레이트가 최소화되어 있어 작은 팀에서 빠르게 도입할 수 있습니다. Redux처럼 actions/reducers 구조 없이 set 함수로 직접 상태를 갱신합니다. Context와 달리 구독한 슬라이스가 변경될 때만 리렌더링되어 성능이 좋습니다. 서버 상태는 React Query, 클라이언트 전역 상태는 Zustand로 역할을 분리하는 것이 현재 모범 사례입니다.",
  },
  {
    q: "엔터프라이즈 솔루션 개발에서 FE 관점에서 가장 중요한 것은 무엇인가요?",
    a: "①타입 안전성 — 큰 팀과 긴 유지 기간을 고려하면 런타임 에러 방지가 핵심입니다. ②에러 핸들링 — Error Boundary와 React Query의 에러 상태로 예측 가능한 실패 UX를 만듭니다. ③문서화 — 설계 의도와 API 계약을 명확히 남겨 팀 간 커뮤니케이션 비용을 줄입니다. ④일관성 — 컴포넌트 설계·코드 스타일·에러 응답 구조의 일관성이 유지보수 비용을 결정합니다.",
  },
  {
    q: "React와 Vue를 모두 사용해본 관점에서 비교해주세요.",
    a: "React는 JSX와 명시적인 상태 관리로 예측 가능성이 높고 생태계가 넓습니다. Vue는 템플릿 문법으로 진입 장벽이 낮고 v-model 양방향 바인딩이 폼 처리에 편리합니다. Vue 3 Composition API가 React Hooks와 유사해 전환 비용이 낮습니다. 핵심 개념(컴포넌트 설계, 상태 흐름, 반응성)은 공통이므로 팀 구성과 프로젝트 특성에 따라 선택합니다.",
  },
  {
    q: "성능 모니터링 도구를 활용해 개선 포인트를 찾은 경험이 있나요?",
    a: "Chrome DevTools Performance 패널로 Long Task와 Layout Shift를 발견했습니다. React DevTools Profiler로 불필요한 리렌더링 컴포넌트를 찾고 memo·useMemo로 최적화했습니다. Lighthouse로 CLS·LCP 지표를 측정하고 이미지 최적화, 코드 스플리팅, 폰트 preload를 적용했습니다. 실제 수치 개선 전후를 기록해 팀에 공유했습니다.",
  },
  {
    q: "MSA 환경에서 FE 개발 시 주의할 점은 무엇인가요?",
    a: "여러 서비스의 API를 FE에서 직접 호출하면 CORS 설정과 인증 토큰 관리가 복잡해집니다. BFF(Backend for Frontend) 패턴으로 API Gateway를 두어 FE는 단일 엔드포인트만 바라보게 하는 것이 좋습니다. 각 서비스의 에러 응답 형식이 다를 수 있어 공통 에러 핸들러에서 정규화가 필요합니다. 서비스 간 응답 속도 차이는 로딩 UX 설계에서 고려해야 합니다.",
  },
  {
    q: "자기주도적으로 요구사항 분석부터 배포까지 완결한 경험을 말씀해주세요.",
    a: "요구사항 분석 → 기술 스택 선정 → 아키텍처 설계 → 구현 → 배포까지 전 과정을 담당했습니다. 기획 단계에서 컴포넌트 트리와 상태 흐름을 먼저 설계하고, 불확실한 부분은 PoC를 통해 검증한 뒤 진행했습니다. 배포 후 성능 지표를 모니터링하고 병목을 찾아 개선하는 사이클도 경험했습니다.",
  },
  {
    q: "이슈 재현 및 원인 분석을 어떻게 진행하시나요?",
    a: "이슈 재현 절차 수립이 먼저입니다. 재현되면 브라우저 DevTools Network·Console·Performance 패널로 원인을 좁히고, 재현되지 않으면 로그와 Sentry 이벤트로 접근합니다. 근본 원인을 찾으면 '왜 이 시점에 이 상황이 발생했는지'를 팀에 공유하고, 재발 방지를 위한 테스트 케이스를 추가합니다.",
  },
  {
    q: "기술 스택 선정 또는 아키텍처 결정 시 어떻게 팀에 의견을 전달하나요?",
    a: "트레이드오프 문서를 작성합니다. '왜 이것인지'와 '왜 다른 선택지는 아닌지'를 명확히 기술하고, 팀원이 반론할 수 있는 형식으로 공유합니다. 결정 이후에는 해당 문서를 코드베이스 또는 위키에 남겨 나중에 합류한 팀원도 배경을 이해할 수 있게 합니다.",
  },
];

// ── 면접관에게 할 질문 ─────────────────────────────────────────────────
export const INTERVIEWER_QUESTIONS: { category: string; questions: string[] }[] = [
  {
    category: "서비스 / 사업 방향",
    questions: [
      "Solution Business와 Studio Business 중 현재 더 주력하는 방향이 어느 쪽인가요? 입사 후 합류할 팀은 어떤 도메인을 담당하나요?",
      "AI 중심 소프트웨어 기업으로의 전환이 진행 중이라고 하셨는데, 프론트엔드 개발자로서 이 변화에서 가장 중요하게 기여할 수 있는 부분이 어디라고 보시나요?",
      "기존 엔터프라이즈 고객들의 요구와 새로운 AI 솔루션 방향이 충돌하는 경우, 우선순위를 어떻게 결정하시나요?",
    ],
  },
  {
    category: "기술 스택 / 개발 문화",
    questions: [
      "React/Next.js와 Vue/Nuxt.js 두 가지 스택을 모두 사용하신다고 했는데, 프로젝트별로 어떤 기준으로 스택을 선택하시나요?",
      "코딩 테스트는 어떤 유형으로 진행되나요? 알고리즘 문제인지, 실제 기능 구현 과제인지 궁금합니다.",
      "AI Code Assistant를 팀 내에서 어떻게 활용하고 계신가요? 팀 차원의 가이드라인이 있나요?",
    ],
  },
  {
    category: "팀 / 성장",
    questions: [
      "함께 일하게 될 Product Engineer 팀의 규모와 구성이 어떻게 되나요?",
      "입사 후 온보딩이 어떻게 진행되나요? 빠르게 기여하려면 어떤 부분을 먼저 파악하면 좋을까요?",
      "빌드잇이 1-2년 후 어떤 모습이 되기를 기대하시나요? 로드맵 상 가장 도전적인 부분이 있다면 무엇인가요?",
    ],
  },
];

// ── 핵심 키워드 ────────────────────────────────────────────────────────
export const KEYWORDS: Keyword[] = [
  { term: "Zustand", def: "최소 보일러플레이트 React 상태관리 — set 함수로 직접 갱신, 구독 슬라이스 최적화" },
  { term: "Pinia", def: "Vue 공식 상태관리 — Vuex 대체, Composition API 기반" },
  { term: "Nuxt.js", def: "Vue 기반 메타프레임워크 — Next.js의 Vue 버전, auto-import 지원" },
  { term: "AI Agent", def: "목표를 주면 계획→도구 선택→실행을 자율적으로 수행하는 AI 시스템" },
  { term: "MSA", def: "마이크로서비스 아키텍처 — 서비스를 독립 배포 단위로 분리" },
  { term: "BFF", def: "Backend for Frontend — FE 전용 API Gateway로 여러 서비스 통합" },
  { term: "REST API", def: "리소스 중심 URL + HTTP 메서드 의미론적 사용 + 무상태성" },
  { term: "Docker 멀티 스테이지 빌드", def: "build/serve 스테이지 분리로 최종 이미지 크기 최소화" },
  { term: "RabbitMQ", def: "AMQP 기반 메시지 브로커 — 서비스 간 비동기 이벤트 큐" },
  { term: "Kafka", def: "분산 이벤트 스트리밍 플랫폼 — 고처리량 로그·이벤트 파이프라인" },
  { term: "Tree Shaking", def: "사용하지 않는 코드를 번들에서 제거하는 빌드 최적화" },
  { term: "Server Actions", def: "'use server' 함수를 클라이언트에서 직접 호출하는 Next.js 패턴" },
  { term: "Optimistic Update", def: "서버 응답 전 UI를 미리 업데이트하고 실패 시 롤백" },
  { term: "CLS / LCP", def: "Core Web Vitals — 레이아웃 안정성(CLS) · 최대 콘텐츠 렌더링(LCP)" },
  { term: "TypeScript strict", def: "strictNullChecks·noImplicitAny 등을 포함한 최고 수준 타입 안전성 설정" },
];
