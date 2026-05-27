import OpusScript from 'opusscript';
import { PassThrough } from 'stream';
import type { AudioReceiveStream } from '@discordjs/voice';
import { pcmStreamToWav } from '@shared/utils/ffmpegWrapper';
import { logger } from '@shared/utils/logger';

const SAMPLE_RATE = 48000;
const CHANNELS = 2;
const FRAME_SIZE = 960;

export function opusStreamToWav(opusStream: AudioReceiveStream): Promise<string> {
  const decoder = new OpusScript(SAMPLE_RATE, CHANNELS);
  const pcmPassthrough = new PassThrough();

  opusStream.on('data', (opusPacket: Buffer) => {
    try {
      const pcmData = decoder.decode(opusPacket);
      pcmPassthrough.write(Buffer.from(pcmData.buffer));
    } catch (error) {
      logger.debug(`Skipping invalid Opus packet: ${error}`);
    }
  });

  opusStream.once('end', () => {
    pcmPassthrough.end();
    decoder.delete();
  });

  opusStream.once('error', (error) => {
    pcmPassthrough.destroy(error);
    decoder.delete();
  });

  return pcmStreamToWav(pcmPassthrough, {
    sampleRate: SAMPLE_RATE,
    channels: CHANNELS,
    bitDepth: 16,
  });
}
