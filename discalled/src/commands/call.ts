import { SlashCommandBuilder, ChatInputCommandInteraction, GuildMember, MessageFlags } from 'discord.js';
import { joinVoiceChannel, DiscordGatewayAdapterCreator } from '@discordjs/voice';
import { createErrorEmbed, createLoadingEmbed } from '@/utils/embed';
import type { Command } from '@/@types';

export const call: Command = {
  data: new SlashCommandBuilder()
    .setName('호출')
    .setDescription('음성 채널에 입장하여 음성 명령을 받습니다'),
  execute: async (interaction: ChatInputCommandInteraction) => {
    const member = interaction.member as GuildMember;

    if (!member.voice.channel) {
      await interaction.reply({
        embeds: [createErrorEmbed('음성 채널에 먼저 입장해주세요.')],
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    const voiceChannel = member.voice.channel;

    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator as unknown as DiscordGatewayAdapterCreator,
    });

    // Phase 6에서 오디오 처리 연동 예정
    await interaction.reply({
      embeds: [createLoadingEmbed(`🎙️ **${voiceChannel.name}** 에 입장했습니다.\n음성 인식 기능은 준비 중입니다.`)],
    });
  },
};
