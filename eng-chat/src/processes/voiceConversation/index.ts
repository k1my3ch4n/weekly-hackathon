import { VoiceConnection } from '@discordjs/voice';
import { GuildTextBasedChannel, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { subscribeSpeaker, opusStreamToWav } from '@features/audio-recorder';
import { transcribeWavFile } from '@features/stt-transcriber';
import { generateReply } from '@features/ai-chat';
import { synthesizeSpeech, playAudioBuffer } from '@features/tts-speaker';
import { logger } from '@shared/utils/logger';
import type { UserId } from '@shared/types';

const lastAudioMap = new Map<UserId, Buffer>();

export function getLastAudio(userId: UserId): Buffer | undefined {
  return lastAudioMap.get(userId);
}

export async function runVoicePipeline(
  connection: VoiceConnection,
  textChannel: GuildTextBasedChannel,
  userId: UserId,
  username: string,
): Promise<void> {
  try {
    logger.info(`[Pipeline:${username}] 시작 — 음성 스트림 구독`);

    const opusStream = subscribeSpeaker(connection.receiver, userId);
    const wavPath = await opusStreamToWav(opusStream);

    logger.info(`[Pipeline:${username}] WAV 변환 완료 → STT 요청`);
    const transcription = await transcribeWavFile(wavPath, userId);

    if (!transcription.text) {
      logger.info(`[Pipeline:${username}] 빈 transcript — 파이프라인 종료`);
      return;
    }

    await textChannel.send(`🎙️ **${username}**: ${transcription.text}`);
    logger.info(`[Pipeline:${username}] STT 완료 → LLM 요청`);

    const replyText = await generateReply(userId, transcription.text);

    logger.info(`[Pipeline:${username}] LLM 완료 → TTS 요청`);
    const ttsResult = await synthesizeSpeech(replyText);

    lastAudioMap.set(userId, ttsResult.audioBuffer);

    logger.info(`[Pipeline:${username}] TTS 완료 → 음성 송출`);
    await playAudioBuffer(connection, ttsResult.audioBuffer);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`replay:${userId}`)
        .setLabel('다시 듣기 🔁')
        .setStyle(ButtonStyle.Secondary),
    );

    await textChannel.send({
      content: `🤖 **AI Tutor**: ${replyText}`,
      components: [row],
    });

    logger.info(`[Pipeline:${username}] 파이프라인 완료`);
  } catch (error) {
    logger.error(`[Pipeline:${username}] 오류 발생`, error);

    try {
      await textChannel.send(`⚠️ **${username}** — 처리 중 오류가 발생했습니다. 다시 말씀해주세요.`);
    } catch (sendError) {
      logger.error(`[Pipeline:${username}] 오류 메시지 전송 실패`, sendError);
    }
  }
}

export async function replayLastAudio(
  connection: VoiceConnection,
  userId: UserId,
): Promise<boolean> {
  const audioBuffer = lastAudioMap.get(userId);

  if (!audioBuffer) {
    return false;
  }

  logger.info(`[Replay] 마지막 TTS 재재생 — userId: ${userId}`);
  await playAudioBuffer(connection, audioBuffer);
  return true;
}
