import { getGroqClient } from '@shared/api/groqClient';
import { logger } from '@shared/utils/logger';
import type { TTSResult } from '@shared/types';

const MODEL = 'canopylabs/orpheus-v1-english';
const VOICE = process.env.GROQ_TTS_VOICE ?? 'hannah';

export async function synthesizeSpeech(text: string): Promise<TTSResult> {
  logger.info(`Synthesizing TTS (${text.length} chars)`);

  const client = getGroqClient();

  const response = await client.audio.speech.create({
    model: MODEL,
    voice: VOICE,
    input: text,
    response_format: 'wav',
  });

  const audioBuffer = Buffer.from(await response.arrayBuffer());

  logger.info(`TTS synthesis complete (${audioBuffer.byteLength} bytes)`);

  return { audioBuffer, text };
}
