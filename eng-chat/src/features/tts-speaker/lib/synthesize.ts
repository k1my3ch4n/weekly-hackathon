import { getElevenLabsClient } from '@shared/api/elevenLabsClient';
import { logger } from '@shared/utils/logger';
import type { TTSResult } from '@shared/types';

// ElevenLabs "Rachel" — replace with your preferred voice ID
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID ?? '21m00Tcm4TlvDq8ikWAM';

export async function synthesizeSpeech(text: string): Promise<TTSResult> {
  logger.info(`Synthesizing TTS (${text.length} chars)`);

  const client = getElevenLabsClient();

  const audioStream = await client.textToSpeech.convert(VOICE_ID, {
    text,
    modelId: 'eleven_multilingual_v2',
    outputFormat: 'mp3_44100_128',
    voiceSettings: {
      stability: 0.5,
      similarityBoost: 0.8,
    },
  });

  const chunks: Buffer[] = [];
  for await (const chunk of audioStream) {
    chunks.push(Buffer.from(chunk));
  }

  const audioBuffer = Buffer.concat(chunks);

  logger.info(`TTS synthesis complete (${audioBuffer.byteLength} bytes)`);

  return { audioBuffer, text };
}
