import * as prompt from "@clack/prompts";

export async function getProjectOptions(projectNameArg) {
  prompt.intro("create-k1my3ch4n-setup");

  const projectName =
    projectNameArg ||
    (await prompt.text({
      message: "프로젝트 이름을 입력하세요",
      placeholder: "my-app",
      validate(value) {
        if (!value) {
          return "프로젝트 이름을 입력해주세요";
        }
      },
    }));

  if (prompt.isCancel(projectName)) {
    prompt.cancel("취소되었습니다");
    process.exit(0);
  }

  const framework = await prompt.select({
    message: "프레임워크를 선택하세요",
    options: [
      { value: "vite", label: "Vite (React)" },
      { value: "next", label: "Next.js" },
      { value: "none", label: "없음" },
    ],
  });

  if (prompt.isCancel(framework)) {
    prompt.cancel("취소되었습니다");
    process.exit(0);
  }

  const useTypeScript = await prompt.confirm({
    message: "TypeScript를 사용하시겠습니까?",
    initialValue: true,
  });

  if (prompt.isCancel(useTypeScript)) {
    prompt.cancel("취소되었습니다");
    process.exit(0);
  }

  const useTailwind = await prompt.confirm({
    message: "Tailwind CSS를 사용하시겠습니까?",
    initialValue: true,
  });

  if (prompt.isCancel(useTailwind)) {
    prompt.cancel("취소되었습니다");
    process.exit(0);
  }

  const useClaude = await prompt.confirm({
    message: "Claude 설정 파일을 생성하시겠습니까?",
    initialValue: true,
  });

  if (prompt.isCancel(useClaude)) {
    prompt.cancel("취소되었습니다");
    process.exit(0);
  }

  const packageManager = await prompt.select({
    message: "패키지 매니저를 선택하세요",
    options: [
      { value: "pnpm", label: "pnpm" },
      { value: "npm", label: "npm" },
      { value: "yarn", label: "yarn" },
    ],
  });

  if (prompt.isCancel(packageManager)) {
    prompt.cancel("취소되었습니다");
    process.exit(0);
  }

  return {
    projectName,
    framework,
    useTypeScript,
    useTailwind,
    useClaude,
    packageManager,
  };
}
