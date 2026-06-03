import { InlineCode } from "@shared/ui";
import type { InterviewQuestion } from "@shared/ui";

export const codeExamples = [
  {
    title: "useQuery 기본",
    code: `import { useQuery } from '@tanstack/react-query';

// queryKey는 캐시 식별자 — 계층적 배열로 설계
const { data, isLoading, isError, isFetching } = useQuery({
  queryKey: ['properties', { city: 'seoul', type: 'apt' }],
  queryFn: () => fetchProperties({ city: 'seoul', type: 'apt' }),
  staleTime: 1000 * 60 * 5,   // 5분 동안 fresh
  gcTime: 1000 * 60 * 10,     // 비활성 10분 후 캐시 제거
  enabled: !!userId,           // 조건부 실행
});

// isLoading: 캐시 없이 처음 로딩 중
// isFetching: 백그라운드 재요청 포함 모든 요청 중`,
  },
  {
    title: "useMutation + invalidateQueries",
    code: `import { useMutation, useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();

const { mutate, isPending } = useMutation({
  mutationFn: (newProperty) => createProperty(newProperty),
  onSuccess: () => {
    // 'properties'로 시작하는 모든 쿼리 캐시 무효화
    queryClient.invalidateQueries({ queryKey: ['properties'] });
  },
  onError: (error) => {
    console.error('생성 실패:', error);
  },
});

// 호출
mutate({ address: '서울시 강남구...', type: 'apt' });`,
  },
  {
    title: "Optimistic Update 패턴",
    code: `const { mutate } = useMutation({
  mutationFn: (likeCount) => patchLike(postId, likeCount),
  onMutate: async (newCount) => {
    // 진행 중인 refetch 취소 (덮어쓰기 방지)
    await queryClient.cancelQueries({ queryKey: ['post', postId] });
    // 현재 캐시 스냅샷 저장
    const previous = queryClient.getQueryData(['post', postId]);
    // Optimistic 업데이트
    queryClient.setQueryData(['post', postId], (old) => ({
      ...old,
      likeCount: newCount,
    }));
    return { previous };
  },
  onError: (_err, _newCount, context) => {
    // 실패 시 스냅샷으로 롤백
    queryClient.setQueryData(['post', postId], context.previous);
  },
  onSettled: () => {
    // 성공/실패 무관하게 최신 데이터로 동기화
    queryClient.invalidateQueries({ queryKey: ['post', postId] });
  },
});`,
  },
  {
    title: "SSR + prefetchQuery (Next.js)",
    code: `// app/properties/page.tsx (Server Component)
import { dehydrate, HydrationBoundary, QueryClient }
  from '@tanstack/react-query';

export default async function PropertiesPage() {
  const queryClient = new QueryClient();

  // 서버에서 미리 데이터 패칭
  await queryClient.prefetchQuery({
    queryKey: ['properties'],
    queryFn: fetchProperties,
  });

  return (
    // 직렬화된 캐시를 클라이언트로 전달
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PropertiesList />  {/* useQuery로 즉시 캐시 사용 */}
    </HydrationBoundary>
  );
}`,
  },
];

export const interviewQuestions: InterviewQuestion[] = [
  {
    question: "staleTime과 gcTime(구 cacheTime)의 차이는 무엇인가요?",
    answer: (
      <>
        <InlineCode>staleTime</InlineCode>은 데이터를 <strong>fresh</strong>로
        간주하는 시간입니다. 이 시간 내에는 동일한 queryKey로 useQuery를 마운트해도
        재요청을 보내지 않고 캐시를 즉시 반환합니다. 기본값은 0(즉시 stale)입니다.
        <br />
        <br />
        <InlineCode>gcTime</InlineCode>은 컴포넌트가 언마운트되어 쿼리가{" "}
        <strong>비활성</strong>이 된 후 캐시를 메모리에서 제거하기까지의 시간입니다.
        기본값은 5분입니다. gcTime이 남아있는 동안 같은 쿼리를 다시 마운트하면
        stale 데이터를 즉시 보여주면서 백그라운드 재요청이 시작됩니다.
      </>
    ),
  },
  {
    question: "queryKey를 어떻게 설계해야 하나요?",
    answer: (
      <>
        <strong>계층적 배열</strong>로 설계합니다. 예를 들어{" "}
        <InlineCode>{`['properties', userId, { type: 'apt' }]`}</InlineCode>처럼
        엔티티 → 식별자 → 필터 순으로 구성합니다.
        <br />
        <br />
        이렇게 하면 <InlineCode>{`invalidateQueries({ queryKey: ['properties'] })`}</InlineCode>로
        모든 properties 쿼리를 무효화하거나,{" "}
        <InlineCode>{`invalidateQueries({ queryKey: ['properties', userId] })`}</InlineCode>로
        특정 유저의 properties만 무효화하는 세밀한 제어가 가능합니다. 객체나 배열을
        포함해도 deep equality로 비교하므로 순서가 중요합니다.
      </>
    ),
  },
  {
    question: "Optimistic Update 구현 시 rollback은 어떻게 처리하나요?",
    answer: (
      <>
        <InlineCode>onMutate</InlineCode>에서 현재 캐시 스냅샷을 저장하고 즉시
        UI를 업데이트합니다. <InlineCode>onError</InlineCode>에서 스냅샷으로
        캐시를 복원하고, <InlineCode>onSettled</InlineCode>에서 성공·실패 무관하게{" "}
        <InlineCode>invalidateQueries</InlineCode>로 서버 최신 데이터를
        동기화합니다.
        <br />
        <br />
        주의할 점은 <InlineCode>onMutate</InlineCode> 시작 시{" "}
        <InlineCode>cancelQueries</InlineCode>를 먼저 호출해야 한다는 것입니다.
        진행 중인 refetch가 Optimistic 업데이트를 덮어쓰는 경쟁 조건(race
        condition)을 방지하기 위해서입니다.
      </>
    ),
  },
  {
    question: "React Query와 Suspense를 함께 사용하는 방법은?",
    answer: (
      <>
        <InlineCode>useQuery</InlineCode>에{" "}
        <InlineCode>{'{ suspense: true }'}</InlineCode> 옵션을 주거나, v5에서는{" "}
        <InlineCode>useSuspenseQuery</InlineCode>를 사용합니다. 컴포넌트를{" "}
        <InlineCode>{"<Suspense fallback={<Spinner />}>"}</InlineCode>로 감싸면
        로딩 중에 fallback을 보여주고, 데이터가 준비되면 컴포넌트를 렌더링합니다.
        에러는 상위의 <InlineCode>{"<ErrorBoundary>"}</InlineCode>가 잡습니다.
        이 패턴으로 isLoading/isError 분기 없이 선언적으로 비동기 UI를 구성할 수
        있습니다.
      </>
    ),
  },
];
