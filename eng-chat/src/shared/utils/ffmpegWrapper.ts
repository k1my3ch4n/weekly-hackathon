import ffmpegStatic from 'ffmpeg-static';
import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';
import * as path from 'path';
import * as os from 'os';
import * as crypto from 'crypto';

if (ffmpegStatic) {
  ffmpeg.setFfmpegPath(ffmpegStatic);
}

export interface PcmToWavOptions {
  sampleRate?: number;
  channels?: number;
  bitDepth?: number;
}

export function pcmStreamToWav(
  pcmStream: Readable,
  options: PcmToWavOptions = {},
): Promise<string> {
  const { sampleRate = 48000, channels = 1, bitDepth = 16 } = options;
  const outputPath = path.join(os.tmpdir(), `eng-chat-${crypto.randomUUID()}.wav`);

  return new Promise((resolve, reject) => {
    ffmpeg(pcmStream)
      .inputFormat('s16le')
      .inputOptions([`-ar ${sampleRate}`, `-ac ${channels}`])
      .audioCodec('pcm_s16le')
      .audioFrequency(sampleRate)
      .audioChannels(channels)
      .outputFormat('wav')
      .on('error', reject)
      .on('end', () => resolve(outputPath))
      .save(outputPath);
  });
}
