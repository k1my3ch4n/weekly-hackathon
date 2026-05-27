# 🎙️ Discord AI English Tutor Bot

Discord 음성 채널에서 AI와 실시간으로 영어 회화를 연습하는 봇입니다.

[**봇 초대하기 →**](https://discord.com/oauth2/authorize?client_id=1508716326665846834&permissions=2184251392&integration_type=0&scope=applications.commands+bot)

---

## 핵심 가치

- ⚡ **실시간성** — Groq API를 활용해 발화 종료 후 1.5초 이내 STT + AI 답변 생성 시작
- 🎧 **자연스러운 오디오 UX** — 음성 감지, 텍스트 병기, 다시 듣기 버튼으로 실제 대화에 가까운 경험 제공
- 🏗️ **유지보수 가능한 구조** — FSD(Feature-Sliced Design) 패턴으로 기능 단위 분리, 낮은 결합도

---

## 기능

| 기능 | 설명 |
|------|------|
| 🎙️ 음성 대화 | 말하면 자동으로 STT → AI 답변 → TTS 음성 송출 |
| 💬 텍스트 대화 | 채팅 입력으로도 동일한 AI와 대화 가능 |
| 🔁 다시 듣기 | 마지막 AI 답변 음성을 버튼 하나로 재생 |
| 🇰🇷 한국어 번역 | 모든 발화(유저·AI)에 번역을 함께 출력 |
| 🧠 대화 기억 | 세션 동안 유저별 대화 히스토리 유지, 문맥 있는 대화 |
| 🚫 에코 방지 | 봇이 말하는 동안 새 입력 차단으로 피드백 루프 방지 |

---

## 사용 방법

### 명령어

| 명령어 | 설명 |
|--------|------|
| `/join` | 현재 입장한 음성 채널에 봇을 초대하고 세션을 시작합니다 |
| `/leave` | 봇이 음성 채널에서 퇴장하고 대화 히스토리를 초기화합니다 |

### 1단계 — 세션 시작

음성 채널에 먼저 입장한 뒤, 텍스트 채널에서 `/join` 명령어를 입력합니다.

### 2단계 — 대화

마이크에 영어로 말합니다. 800ms 침묵이 감지되면 자동으로 파이프라인이 시작됩니다.

```
🎙️ User: I went to the store yesterday.
> 번역: 어제 가게에 갔어요.

🤖 AI Tutor: Nice! What did you get at the store? I love grocery shopping on weekdays.
> 번역: 좋아요! 가게에서 뭘 샀나요? 저는 평일 장보기를 좋아해요.
[다시 듣기 🔁]
```

채팅 메시지로 입력해도 동일하게 동작합니다.

### 3단계 — 세션 종료

`/leave` 입력 시 봇이 퇴장하고 대화 히스토리가 초기화됩니다.

---

## 필요 권한

봇 초대 시 아래 권한이 필요합니다.

| 권한 | 용도 |
|------|------|
| `Connect` | 음성 채널 입장 |
| `Speak` | 음성 채널에서 TTS 송출 |
| `Use Voice Activity` | 사용자 발화 시작 감지 (speaking 이벤트) |
| `Read Message History` | 텍스트 채팅 수신 |
| `Send Messages` | 채팅창에 발화 내용 및 번역 출력 |
| `Use Slash Commands` | `/join`, `/leave` 명령어 사용 |

---

## 유의사항

- **대화 히스토리는 메모리 기반**입니다. 봇이 재시작되면 모든 세션의 대화 내용이 초기화됩니다.
- **Groq API 무료 플랜**은 rate limit이 있습니다. 다수의 서버에서 동시에 사용할 경우 응답이 지연될 수 있습니다.
- 봇이 말하는 도중에는 새로운 음성 입력이 무시됩니다. 봇의 발화가 끝난 후 말해주세요.

---

## 아키텍처

### 음성 파이프라인

```
음성 입력 → 침묵 감지(800ms) → PCM→WAV 변환
→ Groq Whisper (STT) → Groq Llama 3 (AI 답변) + 번역 병렬
→ Groq TTS (음성 합성) + 번역 병렬 → 음성 채널 송출
```

### FSD 디렉토리 구조

```
src/
├── app/          # 봇 초기화, Discord 클라이언트, 커맨드/버튼 핸들러
├── processes/    # voiceConversation / textConversation 전체 흐름 제어
├── features/     # audio-recorder · stt-transcriber · ai-chat · tts-speaker
├── entities/     # session (대화 히스토리) · audio (마지막 TTS 버퍼)
└── shared/       # API 클라이언트, 유틸, 공통 타입
```

### 기술 스택

| 역할 | 기술 |
|------|------|
| 플랫폼 | Discord.js + @discordjs/voice |
| STT | Groq Whisper (`whisper-large-v3`) |
| LLM | Groq Llama 3 |
| TTS | Groq TTS (`canopylabs/orpheus-v1-english`) |
| 번역 | Groq LLM |
| 상태 관리 | Zustand (vanilla) |
| 런타임 | Node.js + tsx |

---

## License

MIT
