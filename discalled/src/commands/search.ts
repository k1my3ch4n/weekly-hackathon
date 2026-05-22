import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import { createLoadingEmbed } from '@/utils/embed';
import type { Command } from '@/@types';

export const search: Command = {
  data: new SlashCommandBuilder()
    .setName('검색')
    .setDescription('AI가 웹을 검색하여 결과를 요약합니다')
    .addStringOption((option) =>
      option
        .setName('질문')
        .setDescription('검색할 내용을 입력하세요')
        .setRequired(true)
    ),
  execute: async (interaction: ChatInputCommandInteraction) => {
    const query = interaction.options.getString('질문', true);
    await interaction.deferReply();
    // Phase 5에서 grok.searchAndSummarize(query) 연동 예정
    await interaction.editReply({
      embeds: [createLoadingEmbed(`**${query}** — AI 서비스 연동 후 사용 가능합니다.`)],
    });
  },
};
