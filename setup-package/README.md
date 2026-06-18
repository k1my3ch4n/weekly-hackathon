# create-k1my3ch4n-setup

프론트엔드 프로젝트를 빠르게 셋업하는 CLI 도구.

```bash
npx create-k1my3ch4n-setup my-app
```

---

## 동작 원리

### 1. npx create-\* 컨벤션

`npx create-xxx` 형태는 npm/npx의 약속된 컨벤션이다.
`npx`는 npm 레지스트리에서 `create-xxx` 패키지를 찾아 임시 다운로드 후 실행한다.

### 2. package.json의 bin 필드

```json
"bin": {
  "create-k1my3ch4n-setup": "bin/index.js"
}
```

패키지가 실행될 때 어떤 파일을 진입점으로 쓸지 선언한다.
`npm link` 또는 전역 설치 시 이 파일이 CLI 명령어로 등록된다.

### 3. 실행 흐름

```
npx create-k1my3ch4n-setup my-app
         │
         ▼
    bin/index.js          ← #!/usr/bin/env node 로 Node.js 실행 지시
         │
         ▼
    src/index.js          ← run() 호출
         │
         ├── src/prompts.js    ← @clack/prompts 로 터미널 질문 표시
         │        │
         │        └── context 객체 반환 { framework, useTailwind, ... }
         │
         └── src/generator.js  ← context 받아서 폴더/파일 생성
                  │
                  ├── src/templates/ 파일 복사 (fs-extra)
                  ├── FSD 폴더 생성 (pages, widgets, features, entities, shared)
                  ├── package.json 동적 생성
                  ├── git init 실행
                  └── 선택한 패키지 매니저로 install 실행
```

---

## 선택 옵션

| 항목          | 선택지                        |
| ------------- | ----------------------------- |
| 프레임워크    | Vite (React) / Next.js / 없음 |
| TypeScript    | yes / no                      |
| Tailwind CSS  | yes / no                      |
| Claude 설정   | yes / no                      |
| 패키지 매니저 | pnpm / npm / yarn             |

---

## 생성되는 구조

```
my-app/
├── src/
│   ├── pages/index.ts       ← FSD 레이어
│   ├── widgets/index.ts
│   ├── features/index.ts
│   ├── entities/index.ts
│   └── shared/index.ts
├── .claude/
│   └── CLAUDE.md            ← Claude 선택 시
├── tailwind.config.ts       ← Tailwind 선택 시
├── tsconfig.json            ← TypeScript 선택 시
├── .gitignore
└── package.json
```

---

## 주요 파일

| 파일                  | 역할                                        |
| --------------------- | ------------------------------------------- |
| `bin/index.js`        | CLI 진입점. `#!/usr/bin/env node` 선언 필수 |
| `src/prompts.js`      | `@clack/prompts` 기반 대화형 질문 흐름      |
| `src/generator.js`    | 선택 결과를 받아 파일/폴더 실제 생성        |
| `src/templates/vite/` | Vite + React 템플릿 파일                    |
| `src/templates/next/` | Next.js App Router 템플릿 파일              |

---

## 로컬 테스트

```bash
cd create-k1my3ch4n-setup
npm install
npm link

# 다른 폴더에서
npx create-k1my3ch4n-setup my-app
```

## npm 배포

```bash
npm publish
```

배포 후 누구나 `npx create-k1my3ch4n-setup` 으로 사용 가능.
