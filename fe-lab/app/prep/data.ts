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

export type SortAlgorithm = {
  name: string;
  best: string;
  avg: string;
  worst: string;
  space: string;
  stable: boolean;
  note: string;
};

export type BigOEntry = {
  notation: string;
  name: string;
  example: string;
};

export type DsComplexity = {
  structure: string;
  access: string;
  search: string;
  insert: string;
  delete: string;
};

// ── 우선순위 상 ──────────────────────────────────────────────────────
export const HIGH_TOPICS: TopicLink[] = [
  {
    name: "렌더링 패턴 (CSR / SSR / ISR / SSG)",
    link: "/topics/rendering-patterns",
    reason: "자격요건에 ISR/SSR/SSG 상황별 사용 명시 — 가장 자주 나올 질문",
  },
  {
    name: "React Server Components",
    link: "/topics/server-components",
    reason: "Next.js App Router 기반 개발 핵심 개념",
  },
  {
    name: "Hooks 라이프사이클",
    link: "/topics/hooks-lifecycle",
    reason: "React 실무 기초, 사이드 이펙트 처리 방식",
  },
  {
    name: "React 메모이제이션",
    link: "/topics/react-memo",
    reason: "성능 최적화 — 프론트 면접 단골 주제",
  },
  {
    name: "상태 관리 패턴",
    link: "/topics/state-management",
    reason: "Context vs Zustand vs Redux 트레이드오프 설명 필수",
  },
  {
    name: "Promise / 비동기 처리",
    link: "/topics/promise",
    reason: "React Query 이해의 기반, async/await · 에러 핸들링 포함",
  },
  {
    name: "TypeScript 제네릭 & 유틸리티 타입",
    link: "/topics/generics",
    reason: "Open API Generator 결과물이 제네릭 타입 기반",
  },
  {
    name: "타입 가드 & 판별 유니온",
    link: "/topics/type-guard",
    reason: "런타임 타입 안전성, 외부 API 응답 처리 시 필수",
  },
  {
    name: "HTTP 캐시 전략",
    link: "/topics/http-cache",
    reason: "ISR/SSG가 캐싱 전략이기도 함, Cache-Control · ETag 설명 가능해야 함",
  },
  {
    name: "CORS",
    link: "/topics/cors",
    reason: "외부 API 연동이 많은 서비스에서 반드시 이해해야 할 개념",
  },
  {
    name: "React Query (TanStack Query)",
    link: "/topics/react-query",
    reason: "자격요건 명시 — queryKey · staleTime · Optimistic Update",
  },
  {
    name: "Next.js 심화 (App Router)",
    link: "/topics/nextjs-deep-dive",
    reason: "자격요건 핵심 — Middleware · Server Actions · ISR · generateStaticParams",
  },
];

// ── 우선순위 중 ──────────────────────────────────────────────────────
export const MEDIUM_TOPICS: TopicLink[] = [
  {
    name: "Virtual DOM & Reconciliation",
    link: "/topics/virtual-dom",
    reason: "React 동작 원리, 'key를 써야 하는 이유' 질문 대비",
  },
  {
    name: "이벤트 루프",
    link: "/topics/event-loop",
    reason: "JS 면접 단골, 비동기 동작 이해의 기반",
  },
  {
    name: "클로저",
    link: "/topics/closure",
    reason: "JS 면접 단골, useState 내부 동작 설명 시 등장",
  },
  {
    name: "크리티컬 렌더링 패스",
    link: "/topics/critical-rendering-path",
    reason: "성능 최적화 관련 질문 대비",
  },
  {
    name: "리플로우 / 리페인트",
    link: "/topics/reflow-repaint",
    reason: "애니메이션 / 스크롤 성능 최적화 맥락",
  },
  {
    name: "인증 / 인가 전략 (JWT / OAuth)",
    link: "/topics/auth-strategy",
    reason: "부동산 플랫폼 → 사용자 인증 / 인가 구현 경험",
  },
  {
    name: "WebSocket vs SSE",
    link: "/topics/websocket-sse",
    reason: "실시간 알림, 상태 변경 알림 기능 가능성",
  },
  {
    name: "XSS / CSRF 방지",
    link: "/topics/xss-csrf",
    reason: "금융 / 부동산 플랫폼 특성상 보안 의식 중요",
  },
  {
    name: "모듈 번들링과 최적화",
    link: "/topics/module-bundling",
    reason: "Next.js 빌드 최적화 경험과 연결",
  },
  {
    name: "Suspense / Error Boundary",
    link: "/topics/suspense-error-boundary",
    reason: "React Query와 함께 쓰는 패턴으로 자주 나옴",
  },
];

// ── 우선순위 하 ──────────────────────────────────────────────────────
export const LOW_TOPICS: TopicLink[] = [
  {
    name: "디바운스 / 쓰로틀",
    link: "/topics/debounce-throttle",
    reason: "검색 / 스크롤 최적화, 실무 경험으로 대체 가능",
  },
  {
    name: "프로토타입 체인",
    link: "/topics/prototype-chain",
    reason: "JS 이론, 깊게 파고들지 않으면 안 나올 수도 있음",
  },
  {
    name: "스코프와 실행 컨텍스트",
    link: "/topics/scope-context",
    reason: "클로저와 겹침, 개념 이해 수준으로 충분",
  },
  {
    name: "깊은 복사 / 얕은 복사",
    link: "/topics/deep-shallow-copy",
    reason: "간단히 설명 가능하면 충분",
  },
  {
    name: "웹 워커",
    link: "/topics/web-worker",
    reason: "직접적인 자격요건 아님",
  },
  {
    name: "GraphQL vs REST",
    link: "/topics/graphql-rest",
    reason: "REST / Open API 기반 스택이므로 낮은 우선순위",
  },
  {
    name: "커링과 함수 합성",
    link: "/topics/currying-composition",
    reason: "함수형 질문이 나오면 좋지만 필수 아님",
  },
  {
    name: "Intersection Observer",
    link: "/topics/intersection-observer",
    reason: "라이브러리로 대체 가능",
  },
  {
    name: "Flexbox vs Grid",
    link: "/topics/flexbox-grid",
    reason: "기본 개념, 기술 면접에서 별도로 안 물어볼 가능성 높음",
  },
  {
    name: "반응형 디자인",
    link: "/topics/responsive-design",
    reason: "구현 경험으로 대체 가능",
  },
  {
    name: "웹 접근성 (a11y)",
    link: "/topics/web-accessibility",
    reason: "중요하지만 자격요건에 명시 없음",
  },
  {
    name: "네트워크 디버깅",
    link: "/topics/network-debugging",
    reason: "DevTools 활용 능력, 실무 경험으로 설명",
  },
];

// ── 추가 학습 항목 (Fe-Lab 외) ────────────────────────────────────────
export const ADDITIONAL_TOPICS: AdditionalTopic[] = [
  {
    name: "Open API Generator",
    priority: "상",
    qa: [
      {
        q: "Open API Generator를 어떻게 활용하셨나요?",
        a: "OpenAPI 스펙(swagger.json)에서 TypeScript axios 기반 SDK를 자동 생성했습니다. 백엔드 API 변경 시 generate 한 번으로 타입과 API 호출 코드가 동시에 갱신됩니다. 생성된 ApiClient를 React Query의 queryFn에 주입하는 패턴으로 연결하고, CI에서 스펙 변경 시 자동 재생성하도록 구성했습니다.",
      },
      {
        q: "OpenAPI 스펙의 주요 구조를 설명해주세요.",
        a: "paths(엔드포인트 정의), components/schemas(재사용 타입), security(인증 방식)가 핵심입니다. paths 아래에 HTTP 메서드별로 requestBody와 responses를 정의하고, schemas에서 공통 모델을 $ref로 참조합니다.",
      },
      {
        q: "생성된 SDK를 React Query와 어떻게 연동하나요?",
        a: "생성된 ApiClient 인스턴스를 React Context나 DI로 주입하고, 각 useQuery의 queryFn에서 호출합니다. 예: queryFn: () => propertiesApi.getProperty(id). 이렇게 하면 API 변경 시 타입 에러가 컴파일 타임에 잡힙니다.",
      },
    ],
  },
  {
    name: "React Native + Expo",
    priority: "상",
    qa: [
      {
        q: "웹과 React Native 간에 코드를 어떻게 공유하나요?",
        a: "React Query 훅, Zustand 스토어, 유틸리티 함수는 플랫폼 무관하게 재사용 가능합니다. UI 컴포넌트는 플랫폼별로 분리하되 NX monorepo나 create-t3-turbo 구조로 공유 패키지를 관리합니다.",
      },
      {
        q: "React Native의 New Architecture(JSI)가 기존 Bridge와 다른 점은?",
        a: "기존 Bridge는 JS ↔ Native 간 JSON 직렬화 비용이 컸습니다. JSI는 JS가 네이티브 객체를 직접 참조해 동기 호출이 가능하고 직렬화가 불필요합니다. Fabric(렌더러)·TurboModules(네이티브 모듈)과 함께 성능이 크게 개선됩니다.",
      },
      {
        q: "Expo SDK workflow와 Bare workflow의 차이는?",
        a: "Expo SDK(Managed)는 네이티브 코드 없이 JS로만 개발, EAS Build로 빌드합니다. Bare workflow는 네이티브 코드를 직접 수정할 수 있어 커스텀 네이티브 모듈이 필요할 때 사용합니다. 대부분의 경우 Managed로 시작하고 필요 시 eject합니다.",
      },
    ],
  },
  {
    name: "Vercel 배포 전략",
    priority: "중",
    qa: [
      {
        q: "Vercel의 Edge Functions와 Serverless Functions의 차이는?",
        a: "Serverless Functions는 Node.js 런타임으로 모든 Node API 사용 가능, 콜드 스타트가 있습니다. Edge Functions는 V8 기반으로 전 세계 PoP에서 실행되어 레이턴시가 낮지만 Node.js API를 사용할 수 없습니다. Next.js Middleware가 Edge Runtime에서 실행되는 대표 예입니다.",
      },
      {
        q: "Vercel에서 ISR을 어떻게 구성하나요?",
        a: "export const revalidate = 60으로 캐시 유효 기간을 설정하거나, revalidatePath/revalidateTag로 on-demand ISR을 트리거합니다. Vercel의 Data Cache가 fetch 결과를 저장하고, 재검증 요청 시 백그라운드에서 재생성합니다.",
      },
    ],
  },
  {
    name: "부동산 도메인",
    priority: "중",
    qa: [
      {
        q: "집지커 서비스에서 프론트엔드가 특별히 신경 써야 할 점은?",
        a: "①정보 신뢰성 표시 — 데이터 출처와 조회 시점을 명확히 표시. ②복잡한 법적/금융 정보 시각화 — 근저당·보증보험 개념을 임차인이 이해할 수 있도록. ③보안 — XSS/CSRF 방지, 민감 데이터 로컬 저장 최소화.",
      },
      {
        q: "전세 사기 방지 서비스에서 UX 관점에서 중요한 것은?",
        a: "정보를 '경고'가 아닌 '안내'로 보여주는 것이 중요합니다. 사용자가 불안해하지 않도록 위험 정보와 함께 해결 방법(전세보증보험 가입 방법 등)을 함께 제공해야 합니다. 복잡한 등기부등본 정보를 시각적으로 단순화하는 설계가 핵심입니다.",
      },
    ],
  },
];

// ── 예상 질문 & 답변 ──────────────────────────────────────────────────
export const EXPECTED_QA: QAItem[] = [
  {
    q: "Next.js에서 ISR, SSR, SSG를 어떤 기준으로 선택하나요?",
    a: "ISR은 데이터가 자주 바뀌지 않지만 항상 최신일 필요 없는 경우(매물 목록, 공지사항)에 씁니다. SSR은 요청마다 최신 데이터가 필요한 경우(사용자별 계약 이력, 인증 필요 페이지)에 씁니다. SSG는 변하지 않는 정적 페이지(랜딩, 이용약관)에 씁니다. 집지커라면 주소 검색은 ISR, 개인 계약 이력은 SSR, FAQ는 SSG를 선택할 것 같습니다.",
  },
  {
    q: "React Query를 사용하면서 겪은 어려움이나 주의했던 점이 있나요?",
    a: "queryKey 설계가 가장 중요했습니다. ['properties', userId]처럼 엔티티 > 식별자 계층으로 설계하면 전체 또는 특정 userId만 무효화하는 선택이 가능합니다. staleTime을 0으로 두면 화면 전환마다 재요청이 발생하므로 API 특성에 맞게 적절히 설정하는 것이 중요합니다.",
  },
  {
    q: "Open API Generator를 어떻게 활용하셨나요?",
    a: "OpenAPI 스펙에서 TypeScript axios SDK를 자동 생성했습니다. 백엔드 변경 시 generate 한 번으로 타입과 API 호출 코드가 함께 갱신됩니다. 생성된 ApiClient를 React Query queryFn에 주입하고, CI에서 스펙 변경 시 자동 재생성하도록 스크립트를 구성했습니다.",
  },
  {
    q: "서버 컴포넌트와 클라이언트 컴포넌트를 어떻게 나누어 설계하나요?",
    a: "기본적으로 모든 컴포넌트를 서버 컴포넌트로 시작하고, 이벤트 핸들러·useState/useEffect·브라우저 API가 필요할 때만 'use client'를 추가합니다. 클라이언트 경계를 가능한 leaf 쪽으로 밀어내는 것이 핵심입니다. 예를 들어 페이지 전체가 아닌 '좋아요 버튼' 컴포넌트만 클라이언트로 분리하면 나머지 콘텐츠는 서버에서 렌더링해 번들 크기를 줄일 수 있습니다.",
  },
  {
    q: "TypeScript에서 API 응답 타입을 어떻게 안전하게 처리하나요?",
    a: "Open API Generator를 쓰면 스키마에서 타입이 자동 생성됩니다. 그 외에는 Zod로 unknown 타입의 API 응답을 파싱하고, 실패 시 에러를 던지는 방식을 씁니다. 이렇게 하면 타입 단언(as)을 피하면서 런타임 안전성도 확보됩니다.",
  },
  {
    q: "메모이제이션을 남용했을 때 오히려 성능이 나빠지는 경우가 있나요?",
    a: "있습니다. useMemo/useCallback은 이전 값 저장과 deps 비교 비용이 있습니다. deps가 매 렌더마다 바뀌거나 계산 자체가 매우 단순한 경우에는 메모이제이션 오버헤드가 더 큽니다. React.memo도 props가 객체/함수일 때 참조가 달라지면 매번 재렌더링되므로, 상위에서 useCallback/useMemo로 참조를 안정화해야 효과가 있습니다.",
  },
  {
    q: "웹과 React Native 간에 코드를 공유하는 방법은 무엇인가요?",
    a: "비즈니스 로직과 상태 관리를 플랫폼 독립적으로 분리합니다. React Query 훅, Zustand 스토어, 유틸리티 함수는 플랫폼 무관하게 재사용 가능합니다. UI는 플랫폼별로 분리하되 monorepo 구조로 공유 패키지를 관리합니다.",
  },
  {
    q: "부동산 사기 방지 서비스에서 프론트엔드가 신경 써야 할 점은?",
    a: "①정보 신뢰성 — 데이터 출처와 조회 시점 명시. ②복잡한 법적 정보 시각화 — 근저당·보증보험 개념을 임차인이 이해할 수 있도록. ③보안 — XSS/CSRF 방지, 민감 데이터 로컬 저장 최소화.",
  },
  {
    q: "이벤트 루프가 무엇인지, Promise와 setTimeout의 실행 순서가 왜 다른지 설명해주세요.",
    a: "이벤트 루프는 콜 스택이 비면 태스크 큐에서 작업을 꺼내 실행합니다. 마이크로태스크 큐(Promise.then)는 매크로태스크(setTimeout) 하나 실행 후 큐가 빌 때까지 모두 처리됩니다. 그래서 setTimeout(fn, 0)보다 Promise.then이 항상 먼저 실행됩니다.",
  },
  {
    q: "클로저가 메모리 누수를 일으키는 경우는 어떤 경우인가요?",
    a: "외부 함수의 큰 데이터를 참조하는 내부 함수가 오래 살아있을 때 발생합니다. 이벤트 리스너에서 큰 객체를 클로저로 캡처하고 removeEventListener를 호출하지 않으면 GC가 수집하지 못합니다. React에서는 useEffect 클린업에서 이벤트 리스너·타이머·Observer를 해제하지 않을 때 이런 문제가 생깁니다.",
  },
  {
    q: "백엔드 개발자와 API 설계를 협의할 때 어떻게 진행하시나요?",
    a: "OpenAPI 스펙을 중심으로 협의합니다. 백엔드가 스펙을 먼저 작성하면 프론트는 MSW로 병렬 개발하고 실제 연동 단계에서 합칩니다. 필드 이름·nullable 여부·에러 응답 구조를 미리 합의하고, UI 요구사항에 맞지 않으면 BFF 패턴이나 필드 추가를 제안합니다.",
  },
  {
    q: "기술 부채와 속도 사이에서 어떻게 균형을 잡으시나요?",
    a: "출시 전에는 속도를 우선하되 부채를 이슈로 기록합니다. 임시방편인 이유와 올바른 방법을 코드 주석이나 이슈에 남겨둡니다. 지표가 안정된 후 기술 부채 해소 스프린트를 설정합니다. 보안·데이터 정합성 관련 부채는 즉시 해소합니다.",
  },
  {
    q: "혼자 또는 소규모 팀에서 코드 품질을 어떻게 유지하시나요?",
    a: "ESLint + Prettier + TypeScript strict 모드를 CI에 강제로 걸어둡니다. PR self-review 체크리스트를 만들어 리뷰하고, 주요 비즈니스 로직은 단위 테스트를 작성합니다.",
  },
];

// ── 면접관에게 할 질문 ─────────────────────────────────────────────────
export const INTERVIEWER_QUESTIONS: { category: string; questions: string[] }[] =
  [
    {
      category: "서비스 / 제품",
      questions: [
        "집지커 서비스에서 현재 가장 중요하게 생각하는 지표가 무엇인가요? 그 지표를 어떻게 개선하고 있는지 궁금합니다.",
        "부동산 공공 API나 외부 데이터 소스 활용 시 데이터 정확성이나 최신성 문제는 어떻게 다루고 계신가요?",
        "앱(React Native)과 웹 중 사용자 비율이 어느 쪽이 더 높고, 두 플랫폼 개발 우선순위를 어떻게 결정하시나요?",
      ],
    },
    {
      category: "기술 스택 / 개발 문화",
      questions: [
        "Open API Generator로 SDK를 자동 생성하는 워크플로우가 구체적으로 어떻게 구성되어 있나요? CI에서 자동화되어 있는지 궁금합니다.",
        "Next.js App Router로 전환하셨나요, 아니면 Pages Router를 아직 사용하시나요? 이유가 궁금합니다.",
        "프론트엔드 테스트는 어느 수준까지 작성하고 계신가요? (단위 / 통합 / E2E)",
        "신규 기능 개발 시 디자인-기획-개발 사이클이 어떻게 돌아가나요?",
      ],
    },
    {
      category: "팀 / 성장",
      questions: [
        "프론트엔드 팀 구성이 어떻게 되나요? 함께 일하게 될 분들이 어떤 분들인지 궁금합니다.",
        "입사 후 온보딩 과정이 어떻게 구성되어 있나요? 빠르게 기여하려면 어떤 부분을 먼저 이해하면 좋을까요?",
        "집지커가 1년 후 어떤 모습이 되기를 기대하시나요? 로드맵 상 가장 도전적인 부분이 있다면 무엇인가요?",
      ],
    },
  ];

// ── CS 기초 Q&A ────────────────────────────────────────────────────────
export const CS_QA: QAItem[] = [
  {
    q: "프로세스와 스레드의 차이는 무엇인가요?",
    a: "프로세스는 독립된 메모리 공간(코드·힙·스택·데이터)을 가지는 실행 단위입니다. 스레드는 프로세스 내에서 코드·힙·데이터를 공유하고 스택만 독립적으로 가집니다. 브라우저는 탭마다 별도 프로세스를 사용해 한 탭이 죽어도 다른 탭에 영향이 없으며, JS 엔진은 단일 스레드로 동작하기 때문에 동시성을 위해 이벤트 루프가 필요합니다.",
  },
  {
    q: "스택 메모리와 힙 메모리의 차이는 무엇인가요?",
    a: "스택은 함수 호출 시 자동 할당·해제되며 원시값(number, boolean, string)과 함수 호출 정보가 저장됩니다. LIFO 구조로 접근이 빠릅니다. 힙은 동적으로 할당되는 메모리로 객체·배열·함수가 저장됩니다. JS에서 변수는 스택에, 객체는 힙에 저장되고 스택에는 해당 힙 주소(참조)만 저장됩니다. 참조를 공유하면 같은 힙 영역을 가리키므로 얕은 복사의 함정이 생깁니다.",
  },
  {
    q: "HTTP와 HTTPS의 차이를 설명해주세요.",
    a: "HTTPS는 HTTP에 TLS(Transport Layer Security) 암호화를 추가한 것입니다. TLS 핸드셰이크에서 인증서를 검증하고 대칭키를 교환한 뒤, 이후 통신을 암호화합니다. ①도청 방지(기밀성) ②데이터 변조 방지(무결성) ③서버 신원 인증(CA 인증서)을 보장합니다. HTTP/2는 사실상 HTTPS를 전제로 동작하며, 검색엔진도 HTTPS를 더 신뢰합니다.",
  },
  {
    q: "HTTP/2가 HTTP/1.1보다 빠른 이유는 무엇인가요?",
    a: "HTTP/1.1은 한 커넥션에서 요청-응답이 순차적이라 HOL(Head-of-Line) Blocking이 발생합니다. HTTP/2는 ①멀티플렉싱 — 한 TCP 커넥션에서 여러 스트림 동시 처리, ②헤더 압축(HPACK) — 반복 헤더를 인덱스로 전송, ③서버 푸시 — 클라이언트 요청 없이 리소스 선제 전송, ④스트림 우선순위 설정을 지원합니다. 멀티플렉싱이 가장 핵심적인 성능 개선입니다.",
  },
  {
    q: "동기·비동기와 블로킹·논블로킹의 차이는 무엇인가요?",
    a: "동기/비동기는 '작업 완료를 기다리는가'의 관점, 블로킹/논블로킹은 '함수 호출이 즉시 반환하는가'의 관점입니다. JS는 싱글 스레드 + 논블로킹 I/O입니다. fetch()는 비동기·논블로킹 — 호출 즉시 반환하고(논블로킹) 응답 없이 다른 코드를 실행합니다(비동기). await는 비동기 코드를 동기처럼 보이게 하는 문법 설탕이지만 스레드 자체를 블로킹하지 않습니다.",
  },
];

// ── 정렬 알고리즘 ──────────────────────────────────────────────────────
export const SORT_ALGORITHMS: SortAlgorithm[] = [
  {
    name: "버블 정렬",
    best: "O(n)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: true,
    note: "인접 요소 비교·교환. 단순하지만 비효율적",
  },
  {
    name: "선택 정렬",
    best: "O(n²)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: false,
    note: "최솟값을 찾아 앞으로 이동. swap 횟수 최소",
  },
  {
    name: "삽입 정렬",
    best: "O(n)",
    avg: "O(n²)",
    worst: "O(n²)",
    space: "O(1)",
    stable: true,
    note: "거의 정렬된 배열에서 O(n)에 가까움",
  },
  {
    name: "퀵 정렬",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n²)",
    space: "O(log n)",
    stable: false,
    note: "분할 정복. 평균적으로 가장 빠름. 피벗 선택이 중요",
  },
  {
    name: "병합 정렬",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    stable: true,
    note: "분할 정복. 최악도 n log n 보장. 추가 메모리 필요",
  },
  {
    name: "힙 정렬",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n log n)",
    space: "O(1)",
    stable: false,
    note: "최대 힙 활용. 추가 메모리 없이 n log n 보장",
  },
  {
    name: "JS Array.sort()",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    stable: true,
    note: "V8: TimSort (삽입 정렬 + 병합 정렬 하이브리드)",
  },
];

// ── 시간복잡도 ──────────────────────────────────────────────────────────
export const BIG_O: BigOEntry[] = [
  { notation: "O(1)", name: "상수", example: "배열 인덱스 접근, 해시맵 조회" },
  { notation: "O(log n)", name: "로그", example: "이진 탐색, 균형 BST" },
  { notation: "O(n)", name: "선형", example: "배열 선형 탐색, forEach" },
  { notation: "O(n log n)", name: "선형로그", example: "퀵·병합·힙 정렬, JS Array.sort()" },
  { notation: "O(n²)", name: "이차", example: "이중 반복문, 버블·선택·삽입 정렬" },
  { notation: "O(2^n)", name: "지수", example: "피보나치 재귀 (메모이제이션 없이)" },
  { notation: "O(n!)", name: "팩토리얼", example: "순열 완전 탐색" },
];

export const DS_COMPLEXITY: DsComplexity[] = [
  { structure: "배열 (Array)", access: "O(1)", search: "O(n)", insert: "O(n)", delete: "O(n)" },
  { structure: "해시맵 (HashMap)", access: "—", search: "O(1)*", insert: "O(1)*", delete: "O(1)*" },
  { structure: "스택 / 큐", access: "O(n)", search: "O(n)", insert: "O(1)", delete: "O(1)" },
  { structure: "이진 탐색 트리", access: "O(log n)*", search: "O(log n)*", insert: "O(log n)*", delete: "O(log n)*" },
];

// ── 핵심 키워드 ────────────────────────────────────────────────────────
export const KEYWORDS: Keyword[] = [
  { term: "ISR", def: "빌드 타임 정적 생성 + 일정 시간마다 백그라운드 재생성" },
  { term: "staleTime", def: "React Query에서 데이터를 fresh로 간주하는 시간 (0이면 매번 재요청)" },
  { term: "gcTime", def: "캐시에서 데이터를 유지하는 시간 (구 cacheTime, 기본 5분)" },
  { term: "queryKey", def: "React Query 캐시 식별자 — 계층적 배열로 설계 (엔티티 > 식별자)" },
  { term: "Optimistic Update", def: "서버 응답 전 UI를 미리 업데이트하고 실패 시 롤백" },
  { term: "Open API Generator", def: "OpenAPI 스펙에서 타입세이프 SDK 자동 생성 도구" },
  { term: "Server Component", def: "서버에서만 실행, 번들 미포함, useState · 이벤트 핸들러 불가" },
  { term: "Hydration", def: "서버에서 생성한 HTML에 클라이언트 JS 이벤트를 연결하는 과정" },
  { term: "HydrationBoundary", def: "prefetch한 쿼리 캐시를 클라이언트로 전달하는 React Query 컴포넌트" },
  { term: "Server Actions", def: "'use server' 함수를 클라이언트에서 직접 호출하는 Next.js 패턴" },
  { term: "revalidatePath", def: "특정 경로의 캐시를 무효화하는 Next.js API (on-demand ISR)" },
  { term: "revalidateTag", def: "특정 태그로 묶인 모든 fetch 캐시를 무효화하는 Next.js API" },
  { term: "Edge Runtime", def: "전 세계 PoP에서 실행되는 V8 기반 런타임, Node.js API 불가" },
  { term: "Middleware (Next.js)", def: "요청이 라우트 도달 전 Edge Runtime에서 실행 — 인증 · 리다이렉트 · i18n" },
  { term: "generateStaticParams", def: "동적 세그먼트 경로를 빌드 타임에 정적으로 생성하는 Next.js 함수" },
  { term: "Discriminated Union", def: "공통 리터럴 필드로 타입을 좁히는 TypeScript 패턴" },
  { term: "Tree Shaking", def: "사용하지 않는 코드를 번들에서 제거하는 최적화" },
  { term: "JSI (React Native)", def: "JS와 Native 객체를 직접 참조, 직렬화 없이 동기 호출 가능" },
  { term: "EAS Build", def: "Expo Application Services — 클라우드 기반 React Native 빌드 · 배포" },
];
