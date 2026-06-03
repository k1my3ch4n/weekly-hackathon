import dynamic from "next/dynamic";
import { InlineCode } from "@shared/ui";
import type { FeatureConfig } from "./types";

export const frameworkConfigs: Record<string, FeatureConfig> = {
  "react-query": {
    Demo: dynamic(() => import("@features/react-query/ui/ReactQueryDemo")),
    getData: () => import("@features/react-query/model/data"),
    concept: {
      title: "React Query (TanStack Query)",
      description:
        "서버 상태를 선언적으로 관리하는 라이브러리로, 캐싱·동기화·백그라운드 업데이트를 자동으로 처리합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          React Query는 <strong>서버 상태(Server State)</strong>와{" "}
          <strong>클라이언트 상태(Client State)</strong>를 분리합니다.
          <InlineCode size="md">useQuery</InlineCode>로 데이터를 fetch하면
          자동으로 캐싱·로딩·에러 상태가 관리됩니다.{" "}
          <InlineCode size="md">staleTime</InlineCode>은 데이터를 fresh로 간주하는
          시간이고, <InlineCode size="md">gcTime</InlineCode>은 비활성 캐시를
          메모리에서 제거하기까지의 시간입니다.{" "}
          <InlineCode size="md">queryKey</InlineCode>는 캐시의 식별자로, 계층적
          배열로 설계해야 <InlineCode size="md">invalidateQueries</InlineCode>를
          세밀하게 제어할 수 있습니다.
        </p>
      ),
    },
    demo: {
      title: "React Query 동작 시각화",
      description:
        "쿼리 상태 흐름, staleTime/gcTime 타이머, Optimistic Update 롤백을 직접 확인하세요.",
    },
  },

  "nextjs-deep-dive": {
    Demo: dynamic(
      () => import("@features/nextjs-deep-dive/ui/NextjsDeepDiveDemo"),
    ),
    getData: () => import("@features/nextjs-deep-dive/model/data"),
    concept: {
      title: "Next.js 심화",
      description:
        "App Router의 파일 컨벤션, 렌더링 전략 선택 기준, Server Actions까지 Next.js 핵심 개념을 심화 학습합니다.",
      children: (
        <p className="text-sm text-text-secondary leading-[1.8]">
          Next.js App Router는 <InlineCode size="md">layout.tsx</InlineCode>,{" "}
          <InlineCode size="md">page.tsx</InlineCode>,{" "}
          <InlineCode size="md">loading.tsx</InlineCode>,{" "}
          <InlineCode size="md">error.tsx</InlineCode> 파일 컨벤션으로 UI
          계층을 구성합니다. 페이지마다 <strong>SSG / ISR / SSR</strong> 전략을
          독립적으로 선택할 수 있으며,{" "}
          <InlineCode size="md">revalidateTag</InlineCode>로 On-Demand ISR을
          트리거합니다. <InlineCode size="md">Server Actions</InlineCode>는
          별도 API 라우트 없이 서버 함수를 클라이언트에서 직접 호출하는 패턴으로,
          폼 처리와 뮤테이션에 활용됩니다.
        </p>
      ),
    },
    demo: {
      title: "Next.js App Router 핵심 패턴",
      description:
        "파일 컨벤션 트리, 렌더링 전략 비교, Server Action 흐름을 인터랙티브하게 확인하세요.",
    },
  },
};
