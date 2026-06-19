# create-k1my3ch4n-setup

프론트엔드 프로젝트를 빠르게 셋업하는 CLI 도구.  
FSD 구조 + 프레임워크 + Tailwind + Claude 설정을 한 번에 생성합니다.

```bash
npx create-k1my3ch4n-setup my-app
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

### Vite (React)

```
my-app/
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── globals.css
│   ├── pages/index.ts
│   ├── widgets/index.ts
│   ├── features/index.ts
│   ├── entities/index.ts
│   └── shared/
│       ├── ui/index.ts
│       ├── api/index.ts
│       ├── lib/index.ts
│       └── model/index.ts
├── index.html
├── vite.config.ts
├── tsconfig.json               ← TypeScript 선택 시
├── tailwind.config.ts          ← Tailwind 선택 시
├── postcss.config.js           ← Tailwind 선택 시
├── .claude/CLAUDE.md           ← Claude 선택 시
├── .gitignore
└── package.json
```

### Next.js

```
my-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── src/
│   ├── pages/index.ts
│   ├── widgets/index.ts
│   ├── features/index.ts
│   ├── entities/index.ts
│   └── shared/
│       ├── ui/index.ts
│       ├── api/index.ts
│       ├── lib/index.ts
│       └── model/index.ts
├── next.config.ts
├── tsconfig.json               ← TypeScript 선택 시
├── tailwind.config.ts          ← Tailwind 선택 시
├── postcss.config.js           ← Tailwind 선택 시
├── .claude/CLAUDE.md           ← Claude 선택 시
├── .gitignore
└── package.json
```
