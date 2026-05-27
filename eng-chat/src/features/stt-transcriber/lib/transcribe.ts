import * as fs from 'fs';
import { getGroqClient } from '@shared/api/groqClient';
import { logger } from '@shared/utils/logger';
import type { TranscriptionResult, UserId } from '@shared/types';

export async function transcribeWavFile(wavPath: string, userId: UserId): Promise<TranscriptionResult> {
  logger.info(`Transcribing audio for user: ${userId}`);

  const client = getGroqClient();
  const audioFile = fs.createReadStream(wavPath);

  const transcription = await client.audio.transcriptions.create({
    file: audioFile,
    model: 'whisper-large-v3',
    language: 'en',
    response_format: 'text',
  });

  fs.unlink(wavPath, (err) => {
    if (err) {
      logger.warn(`Failed to delete temp file: ${wavPath}`);
    }
  });

  const text = typeof transcription === 'string' ? transcription : '';

  logger.info(`Transcription result for user ${userId}: "${text.trim()}"`);

  return {
    text: text.trim(),
    userId,
    timestamp: Date.now(),
  };
}
