export const TABS = [
  { id: "query-states", label: "쿼리 상태 흐름" },
  { id: "stale-gc", label: "staleTime / gcTime" },
  { id: "optimistic", label: "Optimistic Update" },
] as const;

export type TabId = (typeof TABS)[number]["id"];

export interface QueryStateStep {
  state: "idle" | "loading" | "success" | "stale" | "refetching" | "error";
  label: string;
  description: string;
  color: string;
}

export const QUERY_STATE_STEPS: QueryStateStep[] = [
  {
    state: "idle",
    label: "idle",
    description: "쿼리가 아직 실행되지 않은 초기 상태",
    color: "var(--text-muted)",
  },
  {
    state: "loading",
    label: "loading",
    description: "서버에 첫 요청을 보내는 중 (캐시 없음)",
    color: "var(--accent-amber)",
  },
  {
    state: "success",
    label: "success (fresh)",
    description: "데이터 수신 완료. staleTime 동안 fresh 상태 유지",
    color: "var(--accent-green)",
  },
  {
    state: "stale",
    label: "stale",
    description: "staleTime 경과. 다음 포커스/마운트 시 백그라운드 재요청",
    color: "var(--accent-violet)",
  },
  {
    state: "refetching",
    label: "refetching",
    description: "stale 데이터를 보여주면서 백그라운드에서 새 데이터 요청 중",
    color: "var(--accent-cyan)",
  },
];

export interface TimeConfig {
  label: string;
  staleTime: number;
  gcTime: number;
  description: string;
}

export const TIME_CONFIGS: TimeConfig[] = [
  {
    label: "기본값",
    staleTime: 0,
    gcTime: 5,
    description: "staleTime: 0ms (즉시 stale), gcTime: 5분",
  },
  {
    label: "뉴스 피드",
    staleTime: 3,
    gcTime: 10,
    description: "staleTime: 3초, gcTime: 10초 — 자주 바뀌는 데이터",
  },
  {
    label: "유저 프로필",
    staleTime: 10,
    gcTime: 20,
    description: "staleTime: 10초, gcTime: 20초 — 잘 안 바뀌는 데이터",
  },
];

export interface OptimisticStep {
  phase: "idle" | "optimistic" | "pending" | "success" | "rollback";
  label: string;
  description: string;
  color: string;
  serverResult?: "success" | "error";
}

export const OPTIMISTIC_STEPS_SUCCESS: OptimisticStep[] = [
  {
    phase: "idle",
    label: "초기 상태",
    description: "좋아요 수: 42",
    color: "var(--text-muted)",
  },
  {
    phase: "optimistic",
    label: "Optimistic 업데이트",
    description: "UI 즉시 반영: 좋아요 수 43 (서버 응답 대기 중)",
    color: "var(--accent-cyan)",
  },
  {
    phase: "pending",
    label: "서버 요청 중",
    description: "PATCH /api/posts/1/like 전송 중...",
    color: "var(--accent-amber)",
  },
  {
    phase: "success",
    label: "서버 성공 응답",
    description: "서버 확인 완료. 좋아요 수 43 확정",
    color: "var(--accent-green)",
    serverResult: "success",
  },
];

export const OPTIMISTIC_STEPS_ROLLBACK: OptimisticStep[] = [
  {
    phase: "idle",
    label: "초기 상태",
    description: "좋아요 수: 42",
    color: "var(--text-muted)",
  },
  {
    phase: "optimistic",
    label: "Optimistic 업데이트",
    description: "UI 즉시 반영: 좋아요 수 43 (서버 응답 대기 중)",
    color: "var(--accent-cyan)",
  },
  {
    phase: "pending",
    label: "서버 요청 중",
    description: "PATCH /api/posts/1/like 전송 중...",
    color: "var(--accent-amber)",
  },
  {
    phase: "rollback",
    label: "서버 오류 → 롤백",
    description: "500 Error! 좋아요 수 42로 롤백, 에러 토스트 표시",
    color: "var(--accent-magenta)",
    serverResult: "error",
  },
];
