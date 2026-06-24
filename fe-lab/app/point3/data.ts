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
    name: "TanStack React Query",
    link: "/topics/react-query",
    reason: "명시된 기술스택 — queryKey 설계·staleTime·Optimistic Update·결제 상태 polling",
  },
  {
    name: "React Hook Form + Zod",
    link: "/topics/react-hook-form",
    reason: "명시된 기술스택 — 계좌 등록·PIN 입력 등 결제 폼 유효성 검증, zodResolver 패턴",
  },
  {
    name: "OAuth 2.0 / 본인 인증 (MobileOK)",
    link: "/topics/auth-strategy",
    reason: "핵심 업무 — 결제 인증 흐름 설계, Authorization Code Flow, PKCE, MobileOK 연동",
  },
  {
    name: "결제 세션 토큰 기반 인증 흐름",
    link: "/topics/auth-strategy",
    reason: "핵심 업무 — 결제 세션 토큰 클라이언트 구현, 토큰 갱신·만료 처리",
  },
  {
    name: "FSD (Feature-Sliced Design) 아키텍처",
    link: "/topics/fsd",
    reason: "명시된 아키텍처 — 레이어 분리 원칙, 결제 위젯 기능 단위 설계",
  },
  {
    name: "iframe / postMessage 통신",
    link: "/topics/iframe-postmessage",
    reason: "핵심 업무 — 위젯 임베드 인터페이스, 가맹점과 결제 위젯 간 메시지 통신",
  },
  {
    name: "크로스 환경 호환성 (인앱 브라우저 / WebView)",
    link: "/topics/cross-browser",
    reason: "핵심 업무 — 모바일 네이티브 앱 WebView, 카카오/네이버 인앱 브라우저 디버깅",
  },
  {
    name: "TypeScript 제네릭 & 유틸리티 타입",
    link: "/topics/generics",
    reason: "우대사항 핵심 — TypeScript + React 실무, 결제 응답 타입 안전성 설계",
  },
];

// ── 우선순위 중 ──────────────────────────────────────────────────────
export const MEDIUM_TOPICS: TopicLink[] = [
  {
    name: "모던 브라우저 동작 원리 (이벤트 모델 / 렌더링 / 동일 출처 정책)",
    link: "/topics/browser-internals",
    reason: "우대사항 명시 — 이벤트 버블링·캡처링, CSSOM, SOP/CORS 결제 위젯 적용",
  },
  {
    name: "CORS / 동일 출처 정책",
    link: "/topics/cors",
    reason: "위젯 SDK 환경 필수 — 가맹점 도메인 ↔ 결제 위젯 도메인 간 통신 설계",
  },
  {
    name: "결제 상태 실시간 갱신 (Polling / WebSocket / SSE)",
    link: "/topics/websocket-sse",
    reason: "핵심 업무 — 결제 상태 실시간 갱신·분기 처리, 롱폴링 vs WebSocket 트레이드오프",
  },
  {
    name: "Playwright / Cypress E2E 테스트",
    link: "/topics/e2e-testing",
    reason: "명시된 기술스택 — 결제 흐름 E2E 시나리오 설계, 환경별 테스트 전략",
  },
  {
    name: "이상거래탐지(FDS) 결과 UI 통합",
    link: "/topics/fds-ui",
    reason: "핵심 업무 — 이상거래탐지 라이브러리 결과를 사용자 안내 UI로 연결",
  },
  {
    name: "XSS / CSRF 방지",
    link: "/topics/xss-csrf",
    reason: "보안 도메인 필수 — 결제 위젯 환경에서 스크립트 인젝션·CSRF 토큰 처리",
  },
  {
    name: "React 메모이제이션",
    link: "/topics/react-memo",
    reason: "결제 위젯 성능 — useMemo·useCallback·React.memo로 불필요한 리렌더 방지",
  },
  {
    name: "Hooks 라이프사이클",
    link: "/topics/hooks-lifecycle",
    reason: "React FE 핵심 — 결제 흐름 중 cleanup·의존성 배열 실수 방지",
  },
];

// ── 우선순위 하 ──────────────────────────────────────────────────────
export const LOW_TOPICS: TopicLink[] = [
  {
    name: "Virtual DOM & Reconciliation",
    link: "/topics/virtual-dom",
    reason: "React 동작 원리 — key 설계, 리스트 렌더링 최적화",
  },
  {
    name: "이벤트 루프",
    link: "/topics/event-loop",
    reason: "JS 비동기 이해 — 결제 타임아웃·setTimeout 동작 예측",
  },
  {
    name: "클로저",
    link: "/topics/closure",
    reason: "JS 면접 단골, 개념 이해 수준으로 충분",
  },
  {
    name: "디바운스 / 쓰로틀",
    link: "/topics/debounce-throttle",
    reason: "결제 버튼 중복 제출 방지 맥락으로 활용",
  },
  {
    name: "깊은 복사 / 얕은 복사",
    link: "/topics/deep-shallow-copy",
    reason: "결제 상태 불변성 유지 — 간단히 설명 가능하면 충분",
  },
];

// ── 추가 학습 항목 (Fe-Lab 외) ────────────────────────────────────────
export const ADDITIONAL_TOPICS: AdditionalTopic[] = [
  {
    name: "결제 도메인 기초 (PG / 계좌 인증 / 1원 인증)",
    priority: "상",
    qa: [
      {
        q: "1원 유유 인증(계좌 소유자 확인)이 어떤 방식으로 동작하는지 설명해주세요.",
        a: "1원 인증은 계좌 실소유자 확인을 위해 해당 계좌로 1원을 송금하고 입금자명에 포함된 인증 코드를 사용자가 입력하는 방식입니다. FE에서는 ①계좌 정보 입력 폼(은행 코드 + 계좌번호) → ②인증 요청 API 호출(서버가 1원 송금 트리거) → ③인증 코드 입력 화면으로 전환(타이머 표시) → ④코드 검증 API 호출 → ⑤성공/실패/타임아웃 분기 처리(보통 3분)의 스텝 관리가 핵심입니다. 각 단계를 React Query의 useMutation으로 관리하고, 타이머는 useEffect 내 setInterval로 구현하되 컴포넌트 언마운트 시 clearInterval로 정리합니다. 재시도 횟수 제한(보통 5회)도 FE에서 카운트하고 서버 응답으로 최종 검증합니다.",
      },
      {
        q: "결제 위젯 SDK를 설계할 때 고려해야 할 점은 무엇인가요?",
        a: "①격리성 — 가맹점 CSS/JS가 위젯에 영향을 주지 않도록 iframe으로 격리합니다. Shadow DOM은 일부 구형 브라우저 지원이 불안정해 iframe이 더 안전합니다. ②통신 계약 — postMessage API로 가맹점과 위젯 간 이벤트 타입을 TypeScript로 엄격히 정의하고, 양측이 같은 타입 패키지를 참조해 계약을 공유합니다. ③환경 감지 — 인앱 브라우저/WebView 환경에서 팝업 차단 여부를 사전 감지해 리다이렉트 방식으로 자동 전환합니다. ④에러 전파 — 위젯 내부 에러(인증 실패, 네트워크 오류 등)를 표준화된 에러 코드로 가맹점에 전달해 가맹점이 자체 UI로 처리할 수 있게 합니다. ⑤버전 호환성 — SDK 버전이 올라가도 가맹점 코드 수정 없이 동작하도록 이벤트 타입 하위 호환성을 유지합니다.",
      },
      {
        q: "결제 상태 흐름을 상태 머신으로 설계하면 어떤 이점이 있나요?",
        a: "결제 흐름은 IDLE → ACCOUNT_FORM → VERIFYING → CODE_INPUT → CONFIRMING → SUCCESS/FAIL/TIMEOUT처럼 명확한 상태 전환을 가집니다. 상태 머신으로 설계하면 ①허용되지 않은 전환을 타입 시스템으로 차단할 수 있습니다(예: IDLE에서 바로 SUCCESS로 가는 것을 불가능하게). ②각 상태에 필요한 데이터와 UI가 명확히 분리됩니다. ③'이 버튼을 두 번 눌렀을 때'처럼 경쟁 조건(race condition)을 방지하기 쉬워집니다. 간단한 구현은 useState + discriminated union 타입으로, 복잡하면 XState 라이브러리를 사용합니다.",
      },
    ],
  },
  {
    name: "결제 FE 에러 핸들링 전략",
    priority: "상",
    qa: [
      {
        q: "결제 흐름에서 에러 핸들링이 일반 웹 서비스와 다른 이유는 무엇인가요?",
        a: "결제는 에러 발생 시 금전 손실 또는 이중 결제 가능성이 있기 때문입니다. 일반 서비스는 '다시 시도'가 안전하지만, 결제는 멱등성(idempotency)을 보장하지 않으면 재시도 시 중복 결제가 발생할 수 있습니다. 따라서 FE 에러 핸들링 원칙은 ①네트워크 에러와 비즈니스 에러를 분리합니다. 네트워크 에러(타임아웃, 503)는 서버가 멱등키를 지원하면 자동 재시도, 아니면 사용자에게 '결제 상태를 확인 중입니다' 안내 후 폴링으로 결과 조회. ②비즈니스 에러(잔액 부족, 한도 초과)는 재시도가 무의미하므로 명확한 원인과 해결 방법을 안내합니다. ③'결제 중' 상태에서 화면을 이탈하면 결제 완료 여부를 알 수 없으므로, beforeunload 이벤트로 이탈 경고를 표시합니다.",
      },
      {
        q: "React Query의 에러 핸들링과 Error Boundary를 결제 흐름에서 어떻게 조합하시나요?",
        a: "역할을 분리합니다. React Query의 onError 콜백은 예상 가능한 비즈니스 에러(잔액 부족 등)를 처리하고, 폼 하단에 인라인 에러 메시지를 표시합니다. Error Boundary는 예상치 못한 JS 런타임 에러(컴포넌트 크래시)를 잡아 결제 실패 안내 UI를 보여줍니다. 결제 mutation은 throwOnError: false로 설정해 에러가 자동으로 Error Boundary로 올라가지 않도록 합니다. 전역 에러는 QueryClient의 defaultOptions.mutations.onError에서 공통 처리(토스트 알림, 에러 로깅)하고, 결제 특화 에러만 각 mutation의 onError에서 처리합니다.",
      },
      {
        q: "결제 완료 후 화면 새로고침이나 이탈로 결과를 못 받는 경우 어떻게 복구하시나요?",
        a: "결제 요청 시 서버에서 발급한 결제 세션 ID를 sessionStorage에 저장합니다. 페이지 마운트 시 sessionStorage에 미완료 세션이 있으면, 해당 세션의 결제 상태를 조회하는 API를 호출해 결과를 복원합니다. 결과가 SUCCESS면 완료 화면으로, FAIL이면 실패 안내로, PENDING이면 폴링을 재시작합니다. 이 복구 로직은 useEffect 최상단에 배치해 정상 흐름 진입 전에 먼저 확인합니다. 세션이 만료된 경우(서버 404 응답)에는 sessionStorage를 정리하고 초기 화면으로 안내합니다.",
      },
    ],
  },
  {
    name: "민감 정보 처리 / 보안 설계",
    priority: "상",
    qa: [
      {
        q: "결제 FE에서 민감 정보(PIN, 카드번호)를 다룰 때 보안 고려사항은 무엇인가요?",
        a: "①입력 즉시 마스킹 — 화면에 평문이 노출되지 않도록 input type='password' 또는 커스텀 마스킹 처리. ②메모리 최소 보유 — PIN 입력값을 React 상태에 문자열로 장기 보관하지 않고 길이 정보만 추적하며, API 전송 후 즉시 상태 초기화. ③HTTPS 강제 — 네트워크 전송은 TLS로만 허용, HTTP로 접근 시 리다이렉트. ④CSP 헤더 — XSS로 인한 스크립트 탈취 방지를 위해 Content-Security-Policy 설정, 인라인 스크립트 차단. ⑤화면 캡처 방지 — 민감 입력 화면에서 iOS의 스크린샷 감지 API(visibilitychange 이벤트로 화면 블러 처리)를 활용. 실제 암호화(RSA, AES)는 서버 또는 HSM에서 처리하고 FE는 평문 노출 최소화에 집중합니다.",
      },
      {
        q: "디바이스 신호 신뢰도 차이란 무엇이며 FE에서 어떻게 처리하나요?",
        a: "같은 사용자 행동이라도 환경별로 수집 가능한 신호의 정밀도가 다릅니다. iOS Safari는 디바이스 모션/자이로 접근이 사용자 허가 필요, Android 크롬은 풍부한 센서 데이터 접근 가능, 카카오 인앱 브라우저는 일부 API가 차단됩니다. FE에서는 환경을 사전 감지해 신호 수집 라이브러리의 설정을 분기하고, 신호 수집 실패 시 서버에 '신호 없음' 플래그를 함께 전달합니다. 서버가 신뢰도가 낮다고 판단하면 SMS OTP 같은 추가 인증 단계를 FE에 요청합니다. FE는 이 판단을 직접 하지 않고 서버 응답 코드에 따라 UX 분기만 담당합니다.",
      },
    ],
  },
  {
    name: "MobileOK / PASS 본인인증 연동",
    priority: "중",
    qa: [
      {
        q: "MobileOK 본인인증 흐름을 FE 관점에서 설명해주세요.",
        a: "MobileOK는 통신사 기반 본인인증으로, FE 흐름은 ①인증 요청 — 서버에서 요청 토큰을 받아 MobileOK 인증 페이지로 이동(팝업 또는 리다이렉트). ②인증 완료 콜백 — 인증 성공 후 미리 등록한 callback URL로 결과 전달. 팝업 방식은 opener.postMessage로 부모 창에 결과 전달 후 팝업 닫기. 리다이렉트 방식은 callback URL로 이동 후 쿼리 파라미터에서 결과 추출. ③결과 검증 — 서버에서 인증 토큰을 검증하고 FE에 성공/실패 응답. 인앱 브라우저에서 팝업이 막히는 경우: window.open 직후 null 여부로 차단 감지 → 리다이렉트 방식으로 자동 폴백 → 복귀 후 sessionStorage에서 이전 폼 상태 복원.",
      },
      {
        q: "인증 팝업이 닫혔는지 감지하는 방법과 사용자가 팝업을 직접 닫은 경우 어떻게 처리하나요?",
        a: "setInterval로 팝업 창의 closed 속성을 폴링합니다. popup.closed === true이면 인터벌을 종료하고 '인증이 취소되었습니다' 안내를 표시합니다. 단순 닫기와 인증 완료 후 닫기를 구분하기 위해, 인증 성공 시 postMessage를 수신했는지 플래그를 둡니다. postMessage 수신 없이 closed가 true가 되면 사용자 취소로 판단합니다. 또한 팝업이 열려있는 동안 배경 페이지의 UI를 비활성화(overlay 표시)해 사용자가 팝업 없이 계속 진행하는 혼란을 방지합니다.",
      },
    ],
  },
  {
    name: "Playwright E2E 결제 흐름 테스트",
    priority: "중",
    qa: [
      {
        q: "실제 결제 API를 호출하는 E2E 테스트를 Playwright로 어떻게 설계하시나요?",
        a: "결제 E2E 테스트는 실제 PG 연동 대신 테스트 환경 전략이 핵심입니다. ①API 목킹 — Playwright의 route.fulfill()로 결제 API 응답을 목킹합니다. 성공/실패/타임아웃 시나리오를 각각 다른 테스트 케이스로 구성합니다. ②테스트 계좌 — 금융결제원 테스트 환경(sandbox)이 있다면 실제 1원 인증 흐름을 샌드박스로 테스트합니다. ③환경별 테스트 — Playwright의 projects 설정으로 데스크탑 Chrome, Mobile Safari, Mobile Chrome을 동시에 실행합니다. ④스텝별 스크린샷 — 결제 흐름 각 단계에서 스크린샷을 촬영해 CI에서 시각적 회귀를 감지합니다. 인앱 브라우저 시뮬레이션은 UA 오버라이드로 처리합니다.",
      },
      {
        q: "Playwright 테스트에서 타이밍 이슈(플레이키 테스트)를 어떻게 해결하시나요?",
        a: "결제 흐름은 비동기 처리가 많아 타이밍 이슈가 자주 발생합니다. 해결 원칙은 ①sleep 사용 금지 — page.waitForSelector(), page.waitForResponse(), page.waitForURL()처럼 특정 조건을 기다리는 명시적 대기를 사용합니다. ②로딩 상태 활용 — 버튼의 disabled 상태나 스피너 등장/사라짐을 기다린 후 다음 단계를 진행합니다. ③expect.poll() — 일정 간격으로 조건을 체크하는 폴링 어서션으로 결제 상태 갱신을 기다립니다. ④네트워크 유휴 대기 — page.waitForLoadState('networkidle')로 API 호출이 모두 끝났을 때 어서션을 실행합니다.",
      },
    ],
  },
  {
    name: "브라우저 이벤트 모델 / 동일 출처 정책 심화",
    priority: "중",
    qa: [
      {
        q: "결제 위젯 개발에서 이벤트 버블링·캡처링이 실제로 문제가 되는 사례는 무엇인가요?",
        a: "결제 위젯 내 모달(PIN 입력, 인증 화면)에서 배경 클릭으로 모달이 닫히는 로직을 구현할 때 버블링이 문제가 됩니다. 내부 요소 클릭 이벤트가 버블링으로 배경 클릭 핸들러까지 전달되어 의도치 않게 모달이 닫히는 현상이 발생합니다. 해결책은 내부 요소의 onClick에 e.stopPropagation()을 추가합니다. 또한 iframe 내부 이벤트는 부모 창으로 버블링되지 않으므로, iframe 내부 클릭을 부모가 감지하려면 postMessage를 사용해야 합니다. 이벤트 위임 패턴은 결제 목록처럼 동적으로 추가되는 항목에 이벤트를 효율적으로 등록할 때 활용합니다.",
      },
      {
        q: "결제 위젯이 가맹점 도메인에 iframe으로 임베드될 때 동일 출처 정책이 어떻게 적용되나요?",
        a: "iframe의 src가 가맹점 도메인(merchant.com)과 다른 위젯 도메인(widget.point3.kr)을 사용하면 다른 출처로 간주되어 부모-자식 간 직접 DOM 접근이 차단됩니다. 따라서 iframe.contentWindow.document에 접근하거나 부모에서 자식 DOM을 조작하는 것이 불가능합니다. 통신은 오직 postMessage로만 가능하며, 수신 시 event.origin 검증이 필수입니다. CORS는 fetch/XMLHttpRequest 요청에 적용되는 반면, postMessage는 CORS와 무관하게 동작하지만 origin 검증을 직접 구현해야 합니다. document.domain 설정으로 서브도메인 간 공유는 가능하지만 보안 취약점 우려로 권장하지 않습니다.",
      },
    ],
  },
];

// ── 사전 인터뷰 필수 답변 ─────────────────────────────────────────────
export const PRE_INTERVIEW_QA: QAItem[] = [
  {
    q: "결제·금융 도메인에 관심을 갖게 된 계기와 point3에 지원한 이유를 말씀해주세요.",
    a: "결제는 사용자가 가장 긴장하는 순간에 작동해야 하는 인터페이스입니다. 오류나 지연이 직접적인 금전 손실로 이어지기 때문에, '신뢰할 수 있는 UI'를 만드는 기준이 다른 도메인보다 훨씬 높습니다. 그 엄격함이 오히려 매력적으로 느껴졌습니다. 기술적으로는 인앱 브라우저 호환성, 보안 설계, 실시간 상태 관리처럼 FE가 실질적으로 도전할 수 있는 문제가 가장 밀집된 도메인이기도 합니다. point3를 선택한 이유는, 기존 PG사가 당연시하는 높은 수수료와 느린 정산 주기를 기술로 깨고 있다는 점입니다. 이미 seed 투자·PG 라이센스·pre-A 투자·직불업 라이센스를 확보한 실체 있는 스타트업이고, 결제 위젯·SDK·인앱 브라우저 대응이라는 구체적인 FE 과제가 명확히 보였습니다. 이 시점에 합류해 위젯 FE의 기반을 함께 만들고 싶습니다.",
  },
  {
    q: "다양한 브라우저/환경에서 호환성 이슈를 직접 디버깅하고 해결한 경험을 말씀해주세요.",
    a: "가장 인상 깊은 경험은 카카오톡 인앱 브라우저에서 OAuth 팝업이 열리지 않는 이슈였습니다. 데스크탑 Chrome에서는 정상 동작했지만, 인앱 브라우저 환경에서는 window.open()이 null을 반환하며 팝업이 차단됐습니다. 원인을 파악하기 위해 navigator.userAgent로 환경을 구분하고, window.open 직후 반환값이 null인지 체크하는 방식으로 차단 여부를 감지했습니다. 해결책으로 인앱 브라우저가 감지되면 팝업 대신 현재 탭에서 리다이렉트 방식으로 자동 분기했습니다. 리다이렉트 전 폼 입력값과 진행 상태를 sessionStorage에 저장하고, OAuth 콜백 페이지에서 복원하는 흐름을 추가했습니다. 이후 iOS 15 미만 Safari에서 addEventListener의 passive 옵션 미지원으로 스크롤 이벤트가 깨지는 이슈도 동일한 UA 감지 기반 폴백으로 해결했습니다.",
  },
  {
    q: "자신이 만든 화면을 실제 사용자 흐름에서 직접 시연하고 회귀를 찾은 경험이 있나요?",
    a: "배포 전 QA를 자동화 테스트와 별도로, 반드시 실제 디바이스에서 직접 수행합니다. iOS Safari, Android Chrome, 카카오톡 인앱 브라우저 세 환경을 기본으로 체크합니다. 단순히 화면이 뜨는지가 아니라 '처음 쓰는 사람이 이 화면을 보면 무엇을 누를까'를 기준으로 탐색합니다. 이 과정에서 발견한 대표적인 회귀는 폼 제출 버튼이 API 응답 대기 중에도 재클릭이 가능해 이중 요청이 발생한 경우였습니다. 코드 리뷰에서는 발견되지 않았지만 실제 느린 네트워크(DevTools로 3G 쓰로틀링 설정)에서 직접 사용해보다 발견했습니다. 이후로는 mutation의 isPending 상태로 버튼을 disabled 처리하는 것을 PR 체크리스트 항목으로 추가했습니다.",
  },
  {
    q: "TypeScript와 React를 실무에서 어떻게 활용해왔는지 구체적으로 말씀해주세요.",
    a: "TypeScript는 strict 모드로 사용하며, strictNullChecks로 null/undefined를 컴파일 타임에 잡는 것을 기본 원칙으로 합니다. API 응답 타입은 Zod로 런타임 검증과 TypeScript 타입을 동시에 정의해, 서버가 예상 외의 응답을 내려도 FE에서 안전하게 처리합니다. React에서는 컴포넌트를 역할별로 분리하는 것을 중시합니다. 비즈니스 로직은 커스텀 훅으로 분리하고, 컴포넌트는 렌더링에만 집중하는 방식입니다. 상태 설계 시 '이 상태가 정말 React 상태여야 하는가'를 먼저 검토해, 서버 상태는 React Query, 폼 상태는 React Hook Form, 전역 UI 상태만 Zustand로 관리해 상태의 출처를 명확히 분리합니다.",
  },
  {
    q: "자신이 경험했던 일의 정수를 느껴본 경험이 있다면 말씀해주세요. (우대사항)",
    a: "개인 프로젝트에서 실시간 채팅 기능을 처음 구현할 때입니다. WebSocket을 직접 다뤄본 적이 없어 시행착오가 많았는데, 연결이 끊겼을 때 자동 재연결, 메시지 순서 보장, 연결 상태에 따른 UI 처리를 하나씩 해결하면서 비동기 통신의 실체를 처음으로 체감했습니다. 완성하고 나서 '이게 어떻게 동작하는지'를 정확히 설명할 수 있다는 감각이 생겼고, 그 이후로 새로운 기술을 배울 때 '직접 만들어서 깨져보는 것'이 가장 빠른 방법임을 알았습니다. 지금도 라이브러리를 처음 쓸 때는 최소 구현을 직접 짜보고 나서 라이브러리를 도입합니다. 그래야 라이브러리가 어떤 문제를 풀어주는지, 트레이드오프가 무엇인지 실감할 수 있기 때문입니다.",
  },
  {
    q: "Git 기반 코드 리뷰와 PR 협업에서 어떤 방식으로 일하셨나요?",
    a: "PR을 작성할 때 리뷰어의 맥락을 먼저 생각합니다. 변경 이유(why), 구현 방식(how), 테스트 방법을 PR 설명에 기재하고, 스크린샷이나 동작 영상을 첨부해 리뷰어가 직접 실행하지 않아도 변경 내용을 파악할 수 있게 합니다. PR 크기는 한 번에 리뷰 가능한 수준으로 제한합니다. 큰 기능은 공통 타입/훅 → 하위 컴포넌트 → 통합 순서로 쪼개서 올립니다. 리뷰를 받을 때는 방어적으로 반응하지 않고, 리뷰어가 그 코멘트를 달게 된 맥락을 먼저 이해하려고 합니다. 리뷰어로서는 코드 스타일 지적보다 '이 부분이 어떤 케이스에서 문제가 될 수 있다'는 구체적인 시나리오를 제시하는 방식을 선호합니다.",
  },
  {
    q: "스타트업 문화에서 일하는 것에 대해 어떻게 생각하시나요? 빠른 변화에 어떻게 적응하시나요?",
    a: "스타트업의 빠른 변화는 '불확실성'이 아니라 '피드백 루프가 짧다'는 의미로 받아들입니다. 기능을 만들고 실사용자 반응을 빠르게 확인할 수 있다는 것이 큰 장점입니다. 빠른 변화에 적응하기 위해 두 가지를 중시합니다. 첫째, 코드를 지우기 쉽게 작성합니다. 추상화를 최소화하고 명확한 경계를 만들어 요구사항이 바뀔 때 영향 범위를 좁힙니다. 둘째, 불확실한 요구사항은 먼저 질문합니다. '왜 이 기능이 필요한가'를 이해하면 요구사항이 바뀌어도 방향을 잃지 않습니다. point3처럼 결제 라이센스를 단계적으로 확장하는 회사에서는 각 라이센스 단계마다 FE 기능이 달라질 것이라 예상하고, 변경 범위가 큰 부분은 인터페이스 뒤로 숨겨두는 방식으로 대응할 것입니다.",
  },
];

// ── 예상 질문 & 답변 ──────────────────────────────────────────────────
export const EXPECTED_QA: QAItem[] = [
  {
    q: "TanStack React Query를 결제 흐름에서 어떻게 설계하실 건가요?",
    a: "결제 흐름은 mutation 체인으로 구성합니다. 계좌 등록 → 1원 인증 요청 → 코드 검증 → 결제 확인 각 단계를 별도의 useMutation으로 만들고, onSuccess 콜백으로 다음 단계로 전환합니다. 폴링이 필요한 결제 상태는 useQuery에 refetchInterval을 설정하고, enabled 옵션으로 '결제 확인 중' 단계에서만 폴링이 시작되게 합니다. 최종 상태(SUCCESS/FAIL/TIMEOUT)에 도달하면 queryClient.cancelQueries()로 폴링을 즉시 중단합니다. queryKey는 ['payment-status', sessionId]처럼 결제 세션 ID를 포함해 탭 간 또는 다른 결제 흐름과 캐시가 섞이지 않도록 격리합니다. 또한 페이지를 이탈했다가 복귀했을 때 캐시된 상태가 즉시 표시되도록 staleTime을 0으로 설정해 항상 최신 상태를 서버에서 가져옵니다.",
  },
  {
    q: "FSD 아키텍처를 사용하면서 가장 중요하게 지켜야 할 원칙은 무엇인가요?",
    a: "단방향 의존성입니다. FSD는 app → pages → widgets → features → entities → shared 순서로만 참조해야 하며, 하위 레이어가 상위 레이어를 절대로 참조하면 안 됩니다. 결제 위젯 기준으로 account-register feature가 payment-confirm feature를 직접 import하는 것이 금지됩니다. 두 feature가 공유해야 할 타입(예: BankCode, AccountNumber)은 entities 레이어에 정의합니다. 슬라이스 간 직접 통신이 필요한 경우, 공유 스토어(예: Zustand의 paymentFlowStore)를 shared 또는 entities에 두고 두 feature가 각자 이를 참조하는 방식을 씁니다. 위반이 생기면 ESLint의 import/no-restricted-paths 규칙으로 CI에서 자동 감지할 수 있습니다.",
  },
  {
    q: "가맹점 페이지에 결제 위젯을 임베드할 때 postMessage로 어떻게 통신하시나요?",
    a: "가맹점(parent)과 위젯 iframe(child) 사이 통신을 위해 postMessage를 사용합니다. 먼저 TypeScript로 이벤트 타입을 판별 유니온으로 엄격히 정의합니다. 예: type WidgetEvent = { type: 'PAYMENT_SUCCESS'; payload: PaymentResult } | { type: 'PAYMENT_FAIL'; payload: ErrorInfo } | { type: 'WIDGET_READY' }. 이 타입 패키지를 가맹점 SDK와 위젯 내부가 동일하게 참조해 계약을 공유합니다. 발신 시: iframe.contentWindow.postMessage(event, 'https://widget.point3.kr')처럼 targetOrigin을 반드시 명시합니다. 수신 시: window.addEventListener('message', handler)에서 event.origin이 허용 도메인 목록에 포함되는지 먼저 검증하고, 통과 못하면 무시합니다. 타입 가드 함수로 event.data가 WidgetEvent 형태인지 런타임 검증 후 처리합니다.",
  },
  {
    q: "인앱 브라우저에서 OAuth 팝업이 막히는 경우 어떻게 처리하시나요?",
    a: "인앱 브라우저는 보안 정책으로 window.open을 차단합니다. 두 단계로 대응합니다. 첫째, 사전 감지: navigator.userAgent에 'KAKAO', 'NAVER', 'Instagram', 'FBAN' 등의 패턴이 있으면 인앱 브라우저로 판단하고, 처음부터 리다이렉트 방식으로 진행합니다. 둘째, 런타임 감지: 사전 감지를 통과했더라도 window.open() 반환값이 null이면 팝업이 차단된 것이므로 즉시 리다이렉트로 전환합니다. 리다이렉트 방식에서는 이동 전 sessionStorage에 현재 폼 상태와 결제 세션 ID를 직렬화해 저장합니다. OAuth 콜백 페이지에 도착하면 인증 결과를 처리하고, sessionStorage에서 이전 상태를 복원해 사용자가 중단된 지점부터 이어서 진행하게 합니다. iOS WebView는 localStorage가 제한될 수 있어 sessionStorage를 우선 사용하고 폴백으로 URL 쿼리 파라미터를 활용합니다.",
  },
  {
    q: "이상거래탐지 결과에 따른 UX 분기를 어떻게 구현하시나요?",
    a: "FDS 라이브러리는 결제 시도 시점에 디바이스 신호를 수집하고, 서버가 리스크 레벨을 판단해 결과 코드를 내려줍니다. FE는 코드에 따라 세 가지 분기로 나뉩니다. PASS(정상): 결제 플로우를 그대로 진행합니다. STEP_UP(추가 인증 필요): SMS OTP 또는 ARS 인증 단계 화면으로 전환합니다. 이때 현재 결제 세션은 유지하면서 인증 컴포넌트만 교체하는 방식으로 사용자 흐름이 끊기지 않게 합니다. BLOCK(거래 차단): '이 거래는 보안 정책에 따라 차단되었습니다'라는 안내와 고객센터 연결 UI를 표시합니다. 구체적인 차단 이유는 보안상 노출하지 않습니다. 각 분기는 PaymentFlowState라는 판별 유니온 타입으로 관리해, 존재하지 않는 상태 조합이 코드에서 표현되지 않도록 타입 시스템으로 강제합니다.",
  },
  {
    q: "결제 PIN 입력 UI를 구현할 때 보안 측면에서 어떤 점을 고려하시나요?",
    a: "①커스텀 숫자 키패드 — 기기 기본 키보드 대신 랜덤 배열 커스텀 키패드를 사용합니다. 매 렌더링마다 숫자 위치를 섞어 화면 캡처나 어깨 너머 시선(shoulder surfing)으로 PIN을 유추하기 어렵게 합니다. ②React 상태에 PIN 값 비보관 — 입력된 PIN 문자열을 useState에 담지 않고 입력 자릿수(length)만 추적합니다. 실제 값은 ref에 누적했다가 전송 직전에 한 번만 읽고 즉시 초기화합니다. ③입력 보호 이벤트 — onCopy, onCut, onContextMenu를 preventDefault로 막습니다. ④화면 가림 처리 — 앱 포커스를 잃을 때(visibilitychange, blur 이벤트) PIN 입력 화면을 블러 처리해 스크린 레코더나 멀티태스킹 미리보기에 값이 노출되지 않게 합니다. ⑤입력 타임아웃 — 60초 미입력 시 세션을 만료하고 처음부터 재시작하도록 유도합니다.",
  },
  {
    q: "결제 상태 실시간 갱신을 Polling, WebSocket, SSE 중 어떤 방식으로 구현하시나요?",
    a: "결제 상태 조회는 단기 폴링(short polling)이 가장 적합합니다. 이유는 ①결제는 보통 10-30초 내에 완료/실패/타임아웃이 결정되는 단기 이벤트여서 긴 커넥션 유지가 불필요합니다. ②폴링은 구현이 단순하고 서버 부하가 예측 가능합니다. 구현은 React Query의 useQuery에 refetchInterval: 2000을 설정하고, 데이터가 최종 상태(SUCCESS/FAIL/TIMEOUT/CANCELLED)이면 refetchInterval을 false로 변경해 폴링을 중단합니다. WebSocket은 커넥션 유지와 재연결 로직 관리 비용이 있어 일회성 결제 완료 확인에는 과도합니다. 다만 가맹점이 다수의 결제를 실시간 모니터링하는 대시보드라면 WebSocket이 적합합니다. SSE는 서버→클라이언트 단방향이라 결제 요청 자체를 보낼 수 없으므로 보조 채널로만 활용합니다.",
  },
  {
    q: "React Hook Form과 Zod를 결합할 때의 장점과 주의할 점은 무엇인가요?",
    a: "zodResolver를 사용하면 Zod 스키마 하나로 TypeScript 타입 추론과 런타임 유효성 검증을 동시에 처리할 수 있습니다. 계좌번호처럼 형식이 복잡한 필드는 z.string().regex(/^[0-9]{10,14}$/)로 검증하고, 은행 코드에 따라 계좌 자릿수가 달라지는 케이스는 z.superRefine()으로 조건부 검증을 작성합니다. 장점은 서버와 같은 스키마를 공유하면 클라이언트/서버 검증 불일치를 방지할 수 있습니다. 주의할 점 ①서버 에러(이미 등록된 계좌 등 비즈니스 에러)는 Zod가 잡을 수 없으므로, mutation의 onError에서 setError('accountNumber', { message: '이미 등록된 계좌입니다' })로 수동 설정해야 합니다. ②폼 제출 중 이중 제출 방지를 위해 formState.isSubmitting으로 제출 버튼을 disabled 처리합니다. ③mode: 'onBlur'로 설정해 입력 중에는 에러를 표시하지 않고, 필드를 떠날 때 검증이 실행되도록 UX를 조정합니다.",
  },
  {
    q: "결제 위젯에서 회원 비밀번호(PIN) 등록과 재설정 흐름을 어떻게 설계하시나요?",
    a: "PIN 등록과 재설정은 '동일한 UI이지만 다른 인증 선행 조건'을 가집니다. 등록: 본인인증(MobileOK/PASS) 완료 후 PIN 2회 입력 일치 확인. 재설정: 기존 PIN 1회 입력(또는 본인인증 폴백) → 새 PIN 2회 입력 일치 확인. 설계 포인트는 ①PIN 입력 컴포넌트를 재사용 가능하게 mode: 'register' | 'confirm' | 'verify' 프롭으로 분기합니다. ②'첫 번째 입력'과 '두 번째 입력 일치 확인'은 별도 단계로 분리합니다. 한 화면에서 두 입력을 동시에 보여주면 사용자가 PIN을 시각적으로 비교하려는 유혹이 생기기 때문입니다. ③일치 검증은 서버에서 최종 확인합니다. 클라이언트에서 두 값을 비교하는 것은 UX 피드백용이고, 실제 저장은 서버 해시 처리 후 이루어집니다. ④재설정 시 기존 세션 무효화와 새 토큰 발급을 서버가 처리하고, FE는 응답을 받아 토큰을 교체합니다.",
  },
  {
    q: "가맹점 환경에서의 결제 흐름 모니터링을 FE 관점에서 어떻게 설계하시나요?",
    a: "FE에서 수집할 수 있는 신호는 세 가지입니다. ①성능 데이터 — 각 결제 단계의 진입/완료 타임스탬프를 측정해, 어느 단계에서 이탈이 많은지 퍼널을 분석합니다. ②에러 데이터 — Sentry 같은 에러 트래킹 도구로 JS 에러와 API 에러 코드를 수집합니다. 결제 세션 ID를 Sentry context에 태깅해 특정 가맹점/결제 흐름에서 에러가 집중되는지 파악합니다. ③환경 데이터 — 결제 시도 시 UA, 브라우저 버전, 화면 해상도를 함께 전송해 특정 환경에서만 발생하는 이슈를 추적합니다. 수집한 데이터는 가맹점별로 필터링 가능해야 합니다. FE 로깅 함수를 하나의 공통 레이어로 추상화해, 추적 도구가 변경되어도 비즈니스 코드에 영향이 없게 설계합니다.",
  },
  {
    q: "모던 브라우저의 이벤트 모델(버블링, 캡처링)을 실제 구현에서 어떻게 활용하시나요?",
    a: "이벤트 모델 이해가 실무에서 가장 도움이 된 케이스는 두 가지입니다. ①이벤트 위임 — 결제 수단 목록처럼 동적으로 추가/제거되는 항목들의 클릭 이벤트를 각 항목이 아니라 부모 컨테이너 하나에 등록합니다. event.target으로 어느 항목을 클릭했는지 구분합니다. 항목이 100개여도 이벤트 리스너는 1개입니다. ②모달 외부 클릭 닫기 — PIN 입력 모달 배경 클릭 시 닫히도록 구현할 때, 모달 내부 요소 클릭 이벤트가 배경까지 버블링되어 의도치 않게 닫히는 문제가 발생합니다. 모달 내부 onClick에 e.stopPropagation()을 추가하거나, 배경 핸들러에서 e.target === e.currentTarget인지 확인해 직접 클릭한 경우만 처리합니다. addEventListener의 세 번째 인자로 { capture: true }를 쓰면 자식보다 먼저 이벤트를 받을 수 있는데, 접근성 키보드 트랩(focus trap) 구현 시 활용합니다.",
  },
  {
    q: "결제 위젯 성능 최적화에서 가장 먼저 고려할 것은 무엇인가요?",
    a: "결제 위젯은 초기 로딩 속도가 전환율에 직접 영향을 미칩니다. 우선순위 순서로 정리합니다. ①초기 번들 크기 최소화 — 결제 위젯에서 사용하지 않는 라이브러리는 dynamic import로 지연 로드합니다. 은행 코드 목록 같은 정적 데이터는 JSON으로 분리해 코드 번들에서 제외합니다. ②중요 CSS 인라인화 — 첫 화면에 필요한 스타일을 인라인으로 포함해 FOUC(스타일 없는 콘텐츠 깜빡임)를 방지합니다. ③폼 리렌더 최소화 — React Hook Form은 비제어 방식이라 입력 시 리렌더가 없지만, 상위 컴포넌트 상태 변화로 폼 전체가 리렌더되는 경우를 memo로 방지합니다. ④이미지/아이콘 최적화 — 은행 로고는 SVG 스프라이트 또는 WebP로 제공하고, 사용 시점에 요청되도록 intersection observer로 지연 로드합니다. 최적화 전후 LCP와 TTI를 측정해 수치로 검증합니다.",
  },
  {
    q: "보안 이론(OWASP, 심층 방어)을 실제 FE 설계에 어떻게 반영하시나요?",
    a: "OWASP Top 10 중 FE가 직접 방어할 수 있는 항목을 중심으로 설명합니다. ①XSS(A03) — dangerouslySetInnerHTML 사용 금지, 사용자 입력은 반드시 텍스트 노드로 렌더링, CSP 헤더로 인라인 스크립트 차단. ②CSRF(A01 관련) — SameSite=Strict 쿠키 설정은 서버가 담당하지만, FE는 CSRF 토큰이 없는 API를 의심해야 합니다. ③민감 데이터 노출(A02) — 토큰이나 계좌번호를 URL 쿼리 파라미터에 담지 않고, 로컬스토리지에 평문 저장 금지. ④심층 방어(Defence in Depth) 원칙 — 서버가 최종 검증을 담당하더라도 클라이언트에서도 입력 검증을 하는 이유는, 서버 부하를 줄이고 사용자에게 즉각적인 피드백을 주기 위함입니다. 클라이언트 검증을 우회하는 공격자는 서버 검증에서 막힙니다. 두 레이어가 모두 있어야 완전합니다.",
  },
];

// ── 면접관에게 할 질문 ─────────────────────────────────────────────────
export const INTERVIEWER_QUESTIONS: { category: string; questions: string[] }[] = [
  {
    category: "서비스 / 결제 도메인",
    questions: [
      "현재 결제 위젯이 지원하는 결제 수단과 인증 방식은 어떻게 되나요? 앞으로 추가 예정인 수단이 있다면 FE 관점에서 어떤 도전이 예상되나요?",
      "가맹점별로 결제 위젯 커스터마이징 요구사항이 다양할 텐데, 위젯 UI의 유연성과 일관성을 어떻게 균형 있게 유지하고 계신가요?",
      "이상거래탐지 정확도를 높이기 위해 FE에서 수집하는 신호의 범위와 방식이 어떻게 되나요?",
    ],
  },
  {
    category: "기술 스택 / 개발 문화",
    questions: [
      "FSD 아키텍처를 도입하신 배경과, 실제 결제 도메인에 적용하면서 어려웠던 점이 있었다면 어떻게 해결하셨나요?",
      "Playwright 기반 E2E 테스트에서 실제 결제 흐름(PG 연동)을 어떻게 테스트하시나요? 목킹 전략이 궁금합니다.",
      "인앱 브라우저·WebView 환경 이슈를 발견했을 때 재현하고 디버깅하는 팀 내 프로세스가 어떻게 되나요?",
    ],
  },
  {
    category: "팀 / 성장",
    questions: [
      "FE팀의 규모와 결제 위젯, SDK, 웹 등 역할 분담이 어떻게 되어 있나요?",
      "입사 후 초기에 기여할 수 있는 영역이 어디가 될 것 같나요? 온보딩 과정이 궁금합니다.",
      "pre-A 단계로 빠르게 성장 중인데, 1년 안에 FE 팀이 가장 집중할 기술적 과제가 무엇인지 여쭤봐도 될까요?",
    ],
  },
];

// ── 핵심 키워드 ────────────────────────────────────────────────────────
export const KEYWORDS: Keyword[] = [
  { term: "TanStack React Query", def: "서버 상태 관리 — queryKey 격리·refetchInterval 폴링·Optimistic Update" },
  { term: "React Hook Form", def: "비제어 컴포넌트 기반 폼 — 최소 리렌더로 성능 좋음, Zod와 연결 시 zodResolver" },
  { term: "Zod", def: "TypeScript-first 스키마 선언 및 런타임 유효성 검증 라이브러리" },
  { term: "zodResolver", def: "React Hook Form과 Zod를 연결하는 어댑터 — 스키마 하나로 타입+검증 통합" },
  { term: "FSD", def: "Feature-Sliced Design — app→pages→widgets→features→entities→shared 단방향 의존성" },
  { term: "OAuth 2.0", def: "위임 인가 프로토콜 — Authorization Code Flow + PKCE로 안전한 토큰 발급" },
  { term: "MobileOK", def: "통신사 기반 본인인증 — 팝업 또는 리다이렉트로 흐름 진입, 콜백으로 결과 전달" },
  { term: "postMessage", def: "다른 origin 간 메시지 통신 API — targetOrigin 명시와 origin 검증 필수" },
  { term: "iframe 격리", def: "위젯을 iframe으로 임베드해 가맹점 스타일·스크립트와 격리, Shadow DOM 대안" },
  { term: "결제 세션 토큰", def: "결제 흐름 전체를 식별하는 단기 토큰 — 만료·갱신·클라이언트 저장 전략 필요" },
  { term: "1원 인증", def: "계좌 실소유자 확인 — 1원 송금 후 입금자명 코드 입력으로 검증, 타임아웃 처리 필수" },
  { term: "FDS", def: "Fraud Detection System — 이상거래탐지, 리스크 스코어에 따른 FE UX 분기" },
  { term: "인앱 브라우저", def: "카카오/네이버 등 앱 내 웹뷰 — 팝업 차단·스토리지 제한·이벤트 차이 존재" },
  { term: "WebView", def: "모바일 네이티브 앱이 웹 콘텐츠를 표시하는 컴포넌트 — 브라우저 API 제약 있음" },
  { term: "Playwright", def: "MS 오픈소스 E2E 테스트 — 크로미엄·파이어폭스·WebKit 멀티 브라우저 지원" },
  { term: "CSP", def: "Content Security Policy — 허용된 스크립트 출처만 실행, XSS 방어의 심층 방어선" },
  { term: "상태 머신", def: "유한한 상태와 전환 규칙으로 복잡한 흐름을 예측 가능하게 관리 — XState 등" },
  { term: "PIN 커스텀 키패드", def: "랜덤 배열 숫자 키패드 — 어깨 너머 시선·화면 캡처 방지, 기기 키보드 미사용" },
];
