# Discord AI English Tutor Bot - Todo List

## Phase 1: 프로젝트 초기 세팅

- [x] **1-1** Node.js + TypeScript 프로젝트 초기화 (`package.json`, `tsconfig.json`)
- [x] **1-2** 필수 패키지 설치
  - `discord.js`, `@discordjs/voice`, `opusscript`
  - `groq-sdk` (STT + LLM)
  - `openai`, `elevenlabs` (TTS)
  - `zustand` (상태관리)
  - `ffmpeg-static`, `fluent-ffmpeg` (오디오 변환)
  - `dotenv`, `typescript`, `tsx`, `@types/node`
- [x] **1-3** `.env` / `.env.example` 파일 생성 (DISCORD_TOKEN, GROQ_API_KEY, ELEVENLABS_API_KEY 등)
- [x] **1-4** FSD 디렉토리 뼈대 생성
  ```
  src/app/ src/processes/ src/features/ src/entities/ src/shared/
  ```
- [x] **1-5** `tsconfig.json` path alias 설정 (`@app/*`, `@shared/*` 등)
- [x] **1-6** `nodemon` + `tsx` 개발 서버 스크립트 설정

---

## Phase 2: shared 레이어 구축

- [x] **2-1** `shared/types/index.ts` — 글로벌 타입 정의
  - `ChatMessage`, `SessionState`, `UserProfile`, `TranscriptionResult` 등
- [x] **2-2** `shared/api/groqClient.ts` — Groq SDK 클라이언트 싱글톤 생성
- [x] **2-3** `shared/api/elevenLabsClient.ts` — ElevenLabs TTS 클라이언트 싱글톤 생성
  > ⚠️ 원래 계획의 `openaiClient.ts` → TTS 제공업체를 ElevenLabs로 변경 / 패키지: `@elevenlabs/elevenlabs-js`
- [x] **2-4** `shared/utils/ffmpegWrapper.ts` — PCM → WAV 변환 헬퍼 함수
- [x] **2-5** `shared/utils/logger.ts` — 공통 로거 (타임스탬프 + 레벨)

---

## Phase 3: entities 레이어 구축

- [x] **3-1** `entities/user/index.ts` — 유저 도메인 모델 타입 정의 (`UserId`, `UserProfile`)
- [x] **3-2** `entities/session/model/sessionStore.ts` — Zustand 세션 스토어 구현
  - 유저별 대화 히스토리 (`Map<UserId, ChatMessage[]>`) 저장
  - `addMessage`, `getHistory`, `clearSession` 액션 정의
- [x] **3-3** `entities/session/index.ts` — 퍼블릭 API 배럴 익스포트

---

## Phase 4: features 레이어 구축

### 4-A. audio-recorder (음성 수신 및 인코딩)

- [x] **4-1** `features/audio-recorder/lib/silenceDetector.ts`
  - Discord `VoiceReceiver`에서 유저 오디오 스트림 구독
  - Silence Detection: 일정 시간(~800ms) 무음 감지 시 발화 종료 신호 발송
- [x] **4-2** `features/audio-recorder/lib/pcmToWav.ts`
  - Opus 스트림 → PCM → WAV 파일 변환 (ffmpeg 래퍼 활용)
  - 임시 파일 경로 관리 (`os.tmpdir()`)
- [x] **4-3** `features/audio-recorder/index.ts` — 배럴 익스포트

### 4-B. stt-transcriber (음성 → 텍스트)

- [x] **4-4** `features/stt-transcriber/lib/transcribe.ts`
  - WAV 파일을 Groq Whisper API(`whisper-large-v3`)에 전송
  - 변환된 텍스트 반환 + 채팅창 출력 트리거
- [x] **4-5** `features/stt-transcriber/index.ts` — 배럴 익스포트

### 4-C. ai-chat (LLM 답변 생성)

- [x] **4-6** `features/ai-chat/lib/systemPrompt.ts`
  - 영어 튜터 역할 시스템 프롬프트 정의 (자연스러운 회화 유도, 문법 교정 포함)
- [x] **4-7** `features/ai-chat/lib/generateReply.ts`
  - 세션 스토어에서 유저 대화 히스토리 조회
  - Groq Llama 3(`llama3-70b-8192`) API 호출 → 답변 생성
  - 새 메시지를 세션 스토어에 저장
- [x] **4-8** `features/ai-chat/index.ts` — 배럴 익스포트

### 4-D. tts-speaker (텍스트 → 음성 송출)

- [x] **4-9** `features/tts-speaker/lib/synthesize.ts`
  - ElevenLabs TTS API 호출 → MP3 오디오 버퍼 반환
- [x] **4-10** `features/tts-speaker/lib/playAudio.ts`
  - Discord `VoiceConnection`에 오디오 리소스 생성 후 재생
  - 재생 완료 이벤트 처리
- [x] **4-11** `features/tts-speaker/index.ts` — 배럴 익스포트

---

## Phase 5: processes 레이어 구축

- [x] **5-1** `processes/voiceConversation/index.ts` — 전체 파이프라인 오케스트레이션
  - 순서: 음성 수신 → 무음 감지 → PCM→WAV → STT → 채팅창 출력 → LLM → TTS → 음성 송출 → 채팅창 출력 + [다시 듣기] 버튼
  - 단계별 에러 핸들링 및 로깅
- [x] **5-2** [다시 듣기 🔁] 버튼 클릭 시 마지막 TTS 오디오 재재생 로직 구현

---

## Phase 6: app 레이어 구축 (Discord Bot 초기화)

- [x] **6-1** `app/config.ts` — 환경 변수 로드 및 유효성 검사 (필수 키 누락 시 조기 종료)
- [x] **6-2** `app/index.ts` — Discord 클라이언트 초기화
  - 필요한 Intents 설정 (`GuildVoiceStates`, `GuildMessages`, `MessageContent`)
  - 이벤트 핸들러 바인딩
  - 봇 로그인

---

## Phase 7: Discord 명령어 & 이벤트 핸들러

- [x] **7-1** 슬래시 커맨드 등록 스크립트 (`scripts/deployCommands.ts`)
  - `/join` — 봇을 현재 음성 채널에 참여시키고 세션 시작
  - `/leave` — 봇이 음성 채널에서 나가고 세션 종료
- [x] **7-2** `interactionCreate` 이벤트 핸들러 (`app/index.ts`)
  - `/join` 처리: 음성 채널 연결 완료
  - `/leave` 처리: 연결 해제 + 세션 클리어 완료
  - `[다시 듣기 🔁]` 버튼 인터랙션 처리 (Phase 5-2 구현 후 연동 필요)
- [x] **7-3** 채팅 메시지 포맷 구현
  - 유저 발화 텍스트 출력 (embed or plain)
  - AI 답변 텍스트 + ActionRow 버튼 출력
    > ✅ Phase 9-6에서 번역 포함 포맷으로 구현 완료

---

## Phase 8: 통합 테스트 & 최적화

- [ ] **8-1** End-to-end 흐름 테스트 (실제 Discord 서버에서 음성 입력 → 응답 확인)
- [ ] **8-2** 응답 시간 측정 — 목표: 발화 종료 후 1.5초 이내 STT + LLM 시작
- [ ] **8-3** 에러 시나리오 처리 확인
  - API 호출 실패, 음성 연결 끊김, 빈 transcript 등
- [ ] **8-4** `README.md` 작성 (설치 방법, 환경 변수 목록, 실행 방법)

## Phase 9: UX 개선 및 버그 수정

### 9-1. AI 텍스트를 음성보다 먼저 출력

- [x] **9-1** `processes/voiceConversation/index.ts` 수정
  - 현재: TTS 재생(`playAudioBuffer`) 완료 후 AI 텍스트 + [다시 듣기] 버튼 전송
  - 변경: TTS 재생 **전에** AI 텍스트 + [다시 듣기] 버튼 먼저 전송 → 이후 `playAudioBuffer` 호출
  - 효과: 유저가 음성을 들으면서 동시에 텍스트 확인 가능

### 9-2. 봇 발화 중 마이크 입력 차단 (다시 듣기 피드백 루프 버그)

- [x] **9-2** `app/index.ts` 수정
  - guild 단위 `isBotSpeaking: Map<string, boolean>` 플래그 추가
  - `speaking.on('start')` 핸들러에서 `isBotSpeaking` 체크 → true면 파이프라인 시작 차단
- [x] **9-3** `processes/voiceConversation/index.ts` 수정
  - `runVoicePipeline`: `playAudioBuffer` 호출 전 `isBotSpeaking = true` 설정, 완료 후 `false`로 복원
  - `replayLastAudio`: 동일하게 `isBotSpeaking` 플래그 제어
  - 플래그는 콜백 또는 파라미터로 주입 (`(setPlaying: (v: boolean) => void)`)

### 9-3. 채널 입장 직후 오디오 수신 버그 (입장 시 잔여 패킷 처리)

- [x] **9-4** `app/index.ts` 수정
  - `joinVoiceChannel` 후 즉시 speaking 리스너 등록하는 현재 방식 변경
  - `VoiceConnectionStatus.Ready` 이벤트 수신 후 speaking 리스너 등록
  - Ready 이후에도 일정 시간(1,000ms) 쿨다운을 두고 리스너 활성화
  - 효과: 입장 직후 Discord가 전송하는 잔여 오디오 패킷으로 인한 오발화 방지

### 9-4. 유저 발화 및 AI 답변 번역 표시

- [x] **9-5** `shared/utils/translator.ts` 신규 생성
  - `translateToKorean(text: string): Promise<string>` 함수 구현
  - Groq LLM(`llama-3.3-70b-versatile`) 활용, 단순 번역 전용 시스템 프롬프트 사용
  - 입력이 이미 한국어인 경우 원문 그대로 반환
- [x] **9-6** `processes/voiceConversation/index.ts` 수정
  - 유저 발화 메세지: transcript 번역 후 함께 표시
    ```
    🎙️ **username**: transcript
    > 번역: 한국어 번역 텍스트
    ```
  - AI 답변 메세지: replyText 번역 후 함께 표시
    ```
    🤖 **AI Tutor**: replyText
    > 번역: 한국어 번역 텍스트
    ```
  - 번역은 LLM 응답 생성과 병렬(`Promise.all`)로 처리하여 지연 최소화

### 9-5. 비영어 입력 감지 및 안내

- [x] **9-7** `features/stt-transcriber/lib/transcribe.ts` 수정
  - 현재 `language: 'en'` 강제 설정 제거
  - `response_format: 'verbose_json'`으로 변경하여 Whisper 언어 감지 결과 수신
  - 반환 타입 `TranscriptionResult`에 `detectedLanguage: string` 필드 추가
- [x] **9-8** `shared/types/index.ts` 수정
  - `TranscriptionResult`에 `detectedLanguage?: string` 필드 추가
- [x] **9-9** `processes/voiceConversation/index.ts` 수정
  - STT 결과의 `detectedLanguage`가 `'en'`이 아닌 경우:
    - LLM / TTS 호출 없이 파이프라인 조기 종료
    - 채팅창에 안내 메세지 전송: `"Please speak in English! 영어로 말씀해 주세요. 😊"`

---

## 현재 상태

- [x] 기획서 작성 완료 (`eng-chat/.claude/CLAUDE.md`)
- [x] Phase 1 완료
- [x] Phase 2 완료
- [x] Phase 3 완료
- [x] Phase 6 완료
- [x] Phase 7 완료
- [x] Phase 4 완료
- [x] Phase 5 완료
- [x] Phase 9 완료
- [ ] Phase 8 진행 예정

## 의존 관계 요약

```
Phase 1 → Phase 2 → Phase 3
                          ↓
          Phase 4 (features, shared + entities 활용)
                          ↓
                    Phase 5 (processes)
                          ↓
          Phase 6 + 7 (app + commands) ← 이미 뼈대 완료
                          ↓
                    Phase 8 (테스트)
```
