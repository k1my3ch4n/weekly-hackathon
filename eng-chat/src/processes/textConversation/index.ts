import { VoiceConnection } from '@discordjs/voice';
import { GuildTextBasedChannel, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { generateReply } from '@features/ai-chat';
import { synthesizeSpeech, playAudioBuffer } from '@features/tts-speaker';
import { translateToKorean } from '@shared/utils/translator';
import { logger } from '@shared/utils/logger';
import { setLastAudio } from '@entities/audio';
import type { UserId } from '@shared/types';

export async function runTextPipeline(
  connection: VoiceConnection,
  textChannel: GuildTextBasedChannel,
  userId: UserId,
  username: string,
  userText: string,
  setPlaying: (v: boolean) => void,
): Promise<void> {
  try {
    logger.info(`[TextPipeline:${username}] 시작 — 입력: "${userText}"`);

    const [replyText, userKorean] = await Promise.all([
      generateReply(userId, userText),
      translateToKorean(userText),
    ]);

    await textChannel.send(`💬 **${username}**: ${userText}\n> 번역: ${userKorean}`);
    logger.info(`[TextPipeline:${username}] LLM 완료 → TTS 요청 + AI 답변 번역 병렬 처리`);

    const [ttsResult, aiKorean] = await Promise.all([
      synthesizeSpeech(replyText),
      translateToKorean(replyText),
    ]);

    setLastAudio(userId, ttsResult.audioBuffer);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(`replay:${userId}`)
        .setLabel('다시 듣기 🔁')
        .setStyle(ButtonStyle.Secondary),
    );

    await textChannel.send({
      content: `🤖 **AI Tutor**: ${replyText}\n> 번역: ${aiKorean}`,
      components: [row],
    });

    logger.info(`[TextPipeline:${username}] TTS 완료 → 음성 송출`);

    setPlaying(true);
    try {
      await playAudioBuffer(connection, ttsResult.audioBuffer);
    } finally {
      setPlaying(false);
    }

    logger.info(`[TextPipeline:${username}] 파이프라인 완료`);
  } catch (error) {
    logger.error(`[TextPipeline:${username}] 오류 발생`, error);

    try {
      await textChannel.send(`⚠️ **${username}** — 처리 중 오류가 발생했습니다. 다시 입력해주세요.`);
    } catch (sendError) {
      logger.error(`[TextPipeline:${username}] 오류 메시지 전송 실패`, sendError);
    }
  }
}
