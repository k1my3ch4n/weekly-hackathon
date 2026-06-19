# create-k1my3ch4n-setup

프론트엔드 프로젝트를 빠르게 셋업하는 CLI 도구.

```bash
npx create-k1my3ch4n-setup my-app
```

---

## 패키지 구조

```
create-k1my3ch4n-setup/
├── bin/
│   └── index.js              ← CLI 진입점
├── src/
│   ├── index.js              ← run() — 전체 흐름 오케스트레이션
│   ├── prompts.js            ← @clack/prompts 기반 대화형 질문
│   ├── generator.js          ← context 받아서 파일/폴더 생성
│   ├── generators/
│   │   ├── fsd.js            ← FSD 레이어 폴더 생성
│   │   ├── framework.js      ← 프레임워크 템플릿 복사
│   │   ├── tailwind.js       ← tailwind.config.ts / postcss.config.js 생성
│   │   ├── package.js        ← package.json 동적 생성
│   │   └── gitignore.js      ← .gitignore 생성
│   └── templates/
│       ├── CLAUDE.md         ← Claude 설정 템플릿
│       ├── vite/             ← Vite + React 템플릿
│       └── next/             ← Next.js App Router 템플릿
└── package.json
```

---

## 실행 흐름

```
npx create-k1my3ch4n-setup my-app
         │
         ▼
    bin/index.js
         │
         ▼
    src/index.js              ← run()
         │
         ├── src/prompts.js   ← 질문 → context 반환
         │                       { projectName, framework, useTypeScript,
         │                         useTailwind, useClaude, packageManager }
         │
         └── src/generator.js ← generate(context)
                  │
                  ├── generateFSD()         템플릿 없이 코드로 생성
                  ├── generateFramework()   src/templates/ 복사
                  ├── generateTailwind()    코드로 생성
                  ├── generateClaudeMd()    src/templates/CLAUDE.md 복사
                  ├── generateGitignore()   코드로 생성
                  ├── generatePackageJson() 코드로 생성
                  └── git init + [pm] install
```

---

## 확장 계획

### 구현 현황

| 기능                                              | 상태 |
| ------------------------------------------------- | ---- |
| Vite (React) / Next.js 템플릿                     | ✅   |
| FSD 폴더 구조                                     | ✅   |
| TypeScript 설정                                   | ✅   |
| Tailwind CSS 설정                                 | ✅   |
| Claude 설정 파일                                  | ✅   |
| 스타일링 옵션 (CSS Modules, styled-components 등) | ☐    |
| 린팅 / 포맷팅 (ESLint, Prettier, Husky)           | ☐    |

### 새 Generator 추가 방법

기능별로 파일이 분리되어 있어 새 옵션을 추가할 때 건드리는 파일이 최소화됩니다.

```
1. src/generators/foo.js    ← 파일 생성 로직 작성
2. src/prompts.js           ← 사용자 질문 추가
3. src/generator.js         ← generate() 안에서 호출
```

예시 — ESLint generator 추가:

```js
// src/generators/eslint.js
export async function generateEslint(targetDir, framework) {
  // eslint.config.js 생성 로직
}
```

```js
// src/generator.js
import { generateEslint } from "./generators/eslint.js";

if (useEslint) {
  await generateEslint(targetDir, framework);
}
```

---

## 로컬 개발

```bash
cd create-k1my3ch4n-setup
npm install
npm link

# 다른 폴더에서 실행 테스트
npx create-k1my3ch4n-setup my-app
```

## 배포

```bash
cd create-k1my3ch4n-setup
npm publish
```
