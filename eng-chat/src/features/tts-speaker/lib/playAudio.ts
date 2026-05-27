import {
  VoiceConnection,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus,
  StreamType,
} from '@discordjs/voice';
import { Readable } from 'stream';
import { logger } from '@shared/utils/logger';

export function playAudioBuffer(connection: VoiceConnection, audioBuffer: Buffer): Promise<void> {
  return new Promise((resolve, reject) => {
    const player = createAudioPlayer();
    const stream = Readable.from(audioBuffer);
    // StreamType.Arbitrary lets @discordjs/voice use ffmpeg to transcode MP3
    const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary });

    connection.subscribe(player);

    player.once(AudioPlayerStatus.Idle, () => {
      logger.info('Audio playback finished');
      resolve();
    });

    player.once('error', (error) => {
      logger.error('Audio player error', error);
      reject(error);
    });

    player.play(resource);
  });
}
