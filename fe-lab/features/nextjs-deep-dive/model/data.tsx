import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "Route Handler (API Routes 대체)",
    code: `// app/api/properties/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const data = await fetchProperties({ city });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const created = await createProperty(body);
  return NextResponse.json(created, { status: 201 });
}`,
  },
  {
    title: "Middleware — 인증 리다이렉트",
    code: `// middleware.ts (프로젝트 루트)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};`,
  },
  {
    title: "generateStaticParams — 동적 SSG",
    code: `// app/properties/[id]/page.tsx
export async function generateStaticParams() {
  const properties = await fetchAllProperties();
  // 빌드 시 각 id에 대한 정적 페이지 생성
  return properties.map((property) => ({
    id: property.id.toString(),
  }));
}

export default async function PropertyPage({
  params,
}: {
  params: { id: string };
}) {
  const property = await fetchProperty(params.id);
  return <PropertyDetail property={property} />;
}`,
  },
  {
    title: "Server Actions — 폼 처리",
    code: `// app/properties/new/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProperty(formData: FormData) {
  const address = formData.get('address') as string;
  const price = Number(formData.get('price'));

  await db.property.create({ data: { address, price } });
  revalidatePath('/properties'); // 목록 캐시 무효화
  redirect('/properties');       // 생성 후 리다이렉트
}

// app/properties/new/page.tsx
export default function NewPropertyPage() {
  return (
    <form action={createProperty}>
      <input name="address" />
      <input name="price" type="number" />
      <button type="submit">등록</button>
    </form>
  );
}`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "App Router와 Pages Router의 핵심 차이점은 무엇인가요?",
    answer: (
      <>
        <strong>App Router</strong>는 React Server Components를 기본으로 사용하여
        컴포넌트 단위로 서버/클라이언트를 분리합니다. 파일 컨벤션(
        <InlineCode>layout.tsx</InlineCode>, <InlineCode>loading.tsx</InlineCode>,{" "}
        <InlineCode>error.tsx</InlineCode>)으로 UI 계층을 구성하며, Server Actions와
        Streaming을 지원합니다.
        <br />
        <br />
        <strong>Pages Router</strong>는 <InlineCode>getServerSideProps</InlineCode>,{" "}
        <InlineCode>getStaticProps</InlineCode>로 데이터를 fetching하며, 모든
        컴포넌트가 기본적으로 클라이언트 컴포넌트입니다. 더 단순하고 예측 가능하지만
        번들 크기 최적화가 어렵습니다.
      </>
    ),
  },
  {
    question: "revalidatePath와 revalidateTag의 차이는 무엇인가요?",
    answer: (
      <>
        <InlineCode>revalidatePath('/properties')</InlineCode>는 특정 경로의
        캐시를 무효화합니다. 해당 경로와 하위 경로의 캐시가 초기화됩니다.
        <br />
        <br />
        <InlineCode>revalidateTag('properties-list')</InlineCode>는 특정 태그로
        묶인 모든 fetch 캐시를 무효화합니다. 태그는{" "}
        <InlineCode>{`fetch(url, { next: { tags: ['properties-list'] } })`}</InlineCode>
        로 부여합니다. 여러 경로에 걸쳐 있는 데이터(예: 사이드바 매물 수)를 한
        번에 무효화할 때 유용합니다.
      </>
    ),
  },
  {
    question: "Server Actions는 언제 사용하고, Route Handler와는 어떻게 다른가요?",
    answer: (
      <>
        <strong>Server Actions</strong>는 폼 제출, 뮤테이션 등 클라이언트가 서버
        함수를 직접 호출할 때 사용합니다. 별도 API 엔드포인트 없이{" "}
        <InlineCode>revalidatePath</InlineCode>, <InlineCode>redirect</InlineCode>와
        함께 사용하면 폼 처리 흐름이 단순해집니다. 서버 컴포넌트의{" "}
        <InlineCode>action</InlineCode> prop에 직접 전달할 수 있습니다.
        <br />
        <br />
        <strong>Route Handler</strong>는 외부 클라이언트(모바일 앱, 타사 서비스)가
        호출하는 REST API나 Webhook 처리에 적합합니다. HTTP 메서드를 명시적으로
        export하고 표준 Request/Response를 다룹니다.
      </>
    ),
  },
  {
    question: "Next.js Middleware는 어디서 실행되고, 무엇을 처리하는 데 적합한가요?",
    answer: (
      <>
        Middleware는 요청이 라우트에 도달하기 전에{" "}
        <strong>Edge Runtime</strong>에서 실행됩니다. Node.js API는 사용할 수
        없고 Web API만 사용 가능합니다.
        <br />
        <br />
        적합한 사용 사례: 인증 토큰 검사 후 리다이렉트, 로케일(i18n) 감지 및
        라우팅, A/B 테스트를 위한 쿠키 설정, 봇 차단.
        <br />
        <br />
        부적합한 사용 사례: DB 직접 조작(Node.js API 필요), 무거운 연산(Edge
        런타임 제약), 복잡한 비즈니스 로직(Route Handler 또는 Server Actions 사용).
      </>
    ),
  },
];
