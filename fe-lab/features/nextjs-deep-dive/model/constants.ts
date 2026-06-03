export const TABS = [
  { id: "file-conventions", label: "파일 컨벤션" },
  { id: "rendering-strategy", label: "렌더링 전략" },
  { id: "server-action", label: "Server Action" },
] as const;

export type TabId = (typeof TABS)[number]["id"];

export interface FileNode {
  name: string;
  type: "folder" | "file";
  role: string;
  color: string;
  children?: FileNode[];
}

export const APP_ROUTER_TREE: FileNode[] = [
  {
    name: "app/",
    type: "folder",
    role: "Next.js App Router 루트. 모든 라우트는 이 안에 정의됩니다.",
    color: "var(--accent-cyan)",
    children: [
      {
        name: "layout.tsx",
        type: "file",
        role: "루트 레이아웃. <html><body> 포함. 모든 페이지에 공통 적용됩니다.",
        color: "var(--accent-violet)",
      },
      {
        name: "page.tsx",
        type: "file",
        role: "루트 페이지 (/) UI. 라우트의 실제 컨텐츠를 담당합니다.",
        color: "var(--accent-green)",
      },
      {
        name: "loading.tsx",
        type: "file",
        role: "Suspense fallback. 페이지 로딩 중 자동으로 표시됩니다.",
        color: "var(--accent-amber)",
      },
      {
        name: "error.tsx",
        type: "file",
        role: "Error Boundary. 렌더링 에러를 캐치합니다. 'use client' 필수.",
        color: "var(--accent-magenta)",
      },
      {
        name: "not-found.tsx",
        type: "file",
        role: "404 페이지. notFound() 호출 시 또는 매칭 라우트 없을 때 렌더링됩니다.",
        color: "var(--text-muted)",
      },
      {
        name: "properties/",
        type: "folder",
        role: "/properties 경로 세그먼트.",
        color: "var(--accent-cyan)",
        children: [
          {
            name: "layout.tsx",
            type: "file",
            role: "properties 하위 공통 레이아웃. 루트 layout 안에 중첩됩니다.",
            color: "var(--accent-violet)",
          },
          {
            name: "page.tsx",
            type: "file",
            role: "/properties 페이지 UI.",
            color: "var(--accent-green)",
          },
          {
            name: "[id]/",
            type: "folder",
            role: "동적 세그먼트. /properties/123 등 params.id로 접근합니다.",
            color: "var(--accent-amber)",
            children: [
              {
                name: "page.tsx",
                type: "file",
                role: "/properties/[id] 상세 페이지.",
                color: "var(--accent-green)",
              },
            ],
          },
        ],
      },
      {
        name: "api/",
        type: "folder",
        role: "Route Handlers 폴더.",
        color: "var(--accent-cyan)",
        children: [
          {
            name: "route.ts",
            type: "file",
            role: "GET/POST/PATCH 등 HTTP 메서드를 export하는 Route Handler.",
            color: "var(--accent-green)",
          },
        ],
      },
    ],
  },
];

export interface RenderingStrategy {
  id: "ssg" | "isr" | "ssr";
  label: string;
  color: string;
  when: string;
  code: string;
  steps: string[];
}

export const RENDERING_STRATEGIES: RenderingStrategy[] = [
  {
    id: "ssg",
    label: "SSG",
    color: "var(--accent-green)",
    when: "FAQ, 이용약관 — 빌드 후 변경 없는 콘텐츠",
    code: `// 빌드 타임에 한 번 생성
export default async function Page() {
  const data = await fetchStaticData(); // 빌드 시 실행
  return <div>{data.title}</div>;
}`,
    steps: [
      "빌드 시 서버에서 fetchStaticData() 실행",
      "HTML 정적 파일 생성 → CDN 배포",
      "모든 요청에 동일한 HTML 즉시 응답",
    ],
  },
  {
    id: "isr",
    label: "ISR",
    color: "var(--accent-amber)",
    when: "매물 목록, 블로그 포스트 — 자주 바뀌지 않는 콘텐츠",
    code: `export const revalidate = 60; // 60초마다 재생성

export default async function Page() {
  const data = await fetchProperties();
  return <PropertyList data={data} />;
}

// On-Demand ISR
import { revalidateTag } from 'next/cache';
revalidateTag('properties'); // 특정 태그 무효화`,
    steps: [
      "첫 요청 → SSG처럼 캐시된 HTML 응답",
      "revalidate 시간 경과 → 백그라운드에서 재생성",
      "다음 요청부터 새 HTML 응답",
    ],
  },
  {
    id: "ssr",
    label: "SSR",
    color: "var(--accent-magenta)",
    when: "개인 계약 이력, 인증 필요 페이지 — 요청마다 최신 데이터 필요",
    code: `// noStore()로 캐싱 명시적 비활성화
import { unstable_noStore as noStore } from 'next/cache';

export default async function Page({ params }) {
  noStore();
  const data = await fetchUserData(params.userId);
  return <UserDashboard data={data} />;
}`,
    steps: [
      "요청마다 서버에서 fetchUserData() 실행",
      "매 요청에 새 HTML 생성 (캐시 없음)",
      "가장 최신 데이터 보장, 응답 시간이 가장 오래 걸림",
    ],
  },
];

export interface ServerActionStep {
  actor: "client" | "server" | "db";
  label: string;
  description: string;
  color: string;
}

export const SERVER_ACTION_STEPS: ServerActionStep[] = [
  {
    actor: "client",
    label: "폼 제출",
    description: "사용자가 버튼 클릭 → form action 또는 startTransition 호출",
    color: "var(--accent-cyan)",
  },
  {
    actor: "server",
    label: "Server Action 실행",
    description: "'use server' 함수가 서버에서 실행 (별도 API 라우트 불필요)",
    color: "var(--accent-violet)",
  },
  {
    actor: "db",
    label: "DB/외부 API 호출",
    description: "서버 컨텍스트에서 직접 DB 조작 또는 내부 API 호출",
    color: "var(--accent-amber)",
  },
  {
    actor: "server",
    label: "revalidatePath 호출",
    description: "변경된 경로의 캐시를 무효화하여 최신 데이터 반영",
    color: "var(--accent-green)",
  },
  {
    actor: "client",
    label: "UI 자동 업데이트",
    description: "Next.js가 변경된 세그먼트만 재렌더링 (전체 페이지 새로고침 없음)",
    color: "var(--accent-green)",
  },
];
