# discalled 프로젝트 작업 계획

## Phase 1: 프로젝트 초기 설정

- [ ] `package.json` 생성 (의존성: discord.js, @discordjs/voice, openai, libsodium-wrappers, opusscript, dotenv, ts-node, typescript 등)
- [ ] `tsconfig.json` 설정 (절대경로 path alias 포함)
- [ ] `nodemon.json` 설정 (ts-node 기반 개발 서버)
- [ ] `.env.example` 파일 생성 (DISCORD_TOKEN, DISCORD_CLIENT_ID, XAI_API_KEY)
- [ ] `.gitignore` 생성
- [ ] 디렉토리 스캐폴딩 (`src/@types`, `src/events`, `src/commands`, `src/services`, `src/utils`, `src/assets`)

---

## Phase 2: 기반 인프라 (Config & Utils)

- [ ] `src/config.ts` — 환경변수 타입 검증 및 읽기 전용 export
- [ ] `src/@types/index.d.ts` — 오디오 버퍼 및 세션 관련 커스텀 타입 선언
- [ ] `src/utils/logger.ts` — 콘솔 출력 가독화 로거
- [ ] `src/utils/embed.ts` — 성공/에러 Rich Embed 템플릿 생성기

---

## Phase 3: 디스코드 봇 코어

- [ ] `src/index.ts` — Discord Client 빌드, 이벤트 핸들러 등록, 봇 로그인
- [ ] `src/events/ready.ts` — 봇 구동 확인 및 슬래시 명령어 글로벌 등록
- [ ] `src/events/interactionCreate.ts` — 슬래시 명령어 분기 및 실행 핸들러

---

## Phase 4: 슬래시 명령어 정의

- [ ] `src/commands/search.ts` — `/검색` : 텍스트 기반 즉시 검색 명령어 정의
- [ ] `src/commands/call.ts` — `/호출` : 음성 채널 입장 및 녹음 트리거 명령어 정의
- [ ] `src/commands/index.ts` — 명령어 컬렉션 배럴 export

---

## Phase 5: AI 서비스 연동

- [ ] `src/services/grok.ts` — xAI SDK 초기화
  - [ ] `transcribeAudio(buffer)` — grok-speech-to-text 로 WAV → 텍스트 변환
  - [ ] `searchAndSummarize(query)` — grok-2-latest + web_search 툴로 검색 후 3줄 요약 반환

---

## Phase 6: 오디오 처리 (핵심 난이도)

- [ ] `src/services/audio.ts` 구현
  - [ ] 음성 채널 수신 스트림 구독 (OpusDecoder → PCM)
  - [ ] VAD: 발화 시작 감지 후 1.5~2초 침묵 시 녹음 자동 마감
  - [ ] PCM 버퍼 → WAV 파일 변환 (헤더 포함)
  - [ ] 입장/퇴장 사운드 재생 (`entry.mp3`, `exit.mp3`)

---

## Phase 7: /호출 통합 플로우 연결

- [ ] `/호출` 실행 시 전체 파이프라인 연결
  1. 유저 음성 채널 입장 확인 → 봇 입장
  2. `entry.mp3` 재생
  3. `audio.ts` 로 녹음 시작 → VAD 마감
  4. WAV → `grok.transcribeAudio()` → 텍스트
  5. 후미 접사 파싱 (검색해줘, 찾아줘 제거) → 순수 쿼리
  6. `grok.searchAndSummarize()` → 3줄 요약
  7. `embed.ts` 로 Rich Embed 생성 → 텍스트 채널 전송
  8. `exit.mp3` 재생 → 봇 퇴장

---

## Phase 8: /검색 텍스트 Fallback 완성

- [ ] `/검색 [query]` 실행 시 `searchAndSummarize()` 호출 → Rich Embed 응답
- [ ] 로딩 상태 defer 처리 (응답 지연 방지)

---

## Phase 9: 정적 에셋 및 마무리

- [ ] `src/assets/entry.mp3` 추가 (입장 효과음)
- [ ] `src/assets/exit.mp3` 추가 (퇴장 효과음)
- [ ] 에러 핸들링 전체 점검 (API 실패, 음성채널 미참여 등)
- [ ] 로컬 테스트: 봇 실제 구동 및 `/호출`, `/검색` 엔드-투-엔드 검증

---

## 검토 (완료 후 작성)

- 완료된 기능 목록
- 알려진 한계 또는 개선 포인트
