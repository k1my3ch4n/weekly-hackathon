import type { UserId } from '@shared/types';

const lastAudioMap = new Map<UserId, Buffer>();

export function getLastAudio(userId: UserId): Buffer | undefined {
  return lastAudioMap.get(userId);
}

export function setLastAudio(userId: UserId, buffer: Buffer): void {
  lastAudioMap.set(userId, buffer);
}
