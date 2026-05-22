import { EmbedBuilder } from 'discord.js';

export function createSuccessEmbed(title: string, description: string): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(0x5865f2)
    .setTitle(title)
    .setDescription(description)
    .setTimestamp();
}

export function createErrorEmbed(description: string): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(0xed4245)
    .setTitle('오류가 발생했습니다')
    .setDescription(description)
    .setTimestamp();
}

export function createLoadingEmbed(description: string): EmbedBuilder {
  return new EmbedBuilder()
    .setColor(0xfee75c)
    .setTitle('처리 중...')
    .setDescription(description);
}
