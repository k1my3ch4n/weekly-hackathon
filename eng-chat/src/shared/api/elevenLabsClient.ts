// TODO: Phase 4-D — ElevenLabs TTS 클라이언트
// 사용 패키지: elevenlabs (npm install elevenlabs)

export function getElevenLabsApiKey(): string {
  return process.env.ELEVENLABS_API_KEY ?? '';
}
