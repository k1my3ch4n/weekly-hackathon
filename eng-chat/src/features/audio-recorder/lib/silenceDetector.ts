import { VoiceReceiver, EndBehaviorType, AudioReceiveStream } from '@discordjs/voice';
import { logger } from '@shared/utils/logger';

const SILENCE_DURATION_MS = 800;

export function subscribeSpeaker(receiver: VoiceReceiver, userId: string): AudioReceiveStream {
  logger.info(`Subscribing to audio stream for user: ${userId}`);

  return receiver.subscribe(userId, {
    end: {
      behavior: EndBehaviorType.AfterSilence,
      duration: SILENCE_DURATION_MS,
    },
  });
}
