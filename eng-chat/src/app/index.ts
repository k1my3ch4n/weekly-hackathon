import { Client, Events, GatewayIntentBits, GuildMember, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { joinVoiceChannel, getVoiceConnection } from '@discordjs/voice';
import { config } from './config';
import { logger } from '@shared/utils/logger';
import { sessionStore } from '@entities/session';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (readyClient) => {
  logger.info(`봇 준비 완료: ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    await handleCommand(interaction);
    return;
  }

  if (interaction.isButton()) {
    await handleButton(interaction);
  }
});

async function handleCommand(interaction: import('discord.js').ChatInputCommandInteraction) {
  const { commandName, guildId } = interaction;

  if (commandName === 'join') {
    const member = interaction.member as GuildMember;
    const voiceChannel = member.voice.channel;

    if (!voiceChannel || voiceChannel.type !== ChannelType.GuildVoice) {
      await interaction.reply({ content: '먼저 음성 채널에 입장해주세요.', ephemeral: true });
      return;
    }

    joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: guildId!,
      adapterCreator: interaction.guild!.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: false,
    });

    logger.info(`[${guildId}] 음성 채널 참여: ${voiceChannel.name}`);
    await interaction.reply(`**${voiceChannel.name}** 채널에 참여했습니다! 영어 회화 세션을 시작합니다. 🎙️`);
    return;
  }

  if (commandName === 'leave') {
    const connection = getVoiceConnection(guildId!);

    if (!connection) {
      await interaction.reply({ content: '봇이 음성 채널에 있지 않습니다.', ephemeral: true });
      return;
    }

    const userId = interaction.user.id;
    sessionStore.getState().clearSession(userId);
    connection.destroy();

    logger.info(`[${guildId}] 음성 채널 퇴장 및 세션 종료`);
    await interaction.reply('음성 채널에서 나갔습니다. 세션이 종료되었습니다. 👋');
  }
}

async function handleButton(interaction: import('discord.js').ButtonInteraction) {
  if (interaction.customId.startsWith('replay:')) {
    // TODO: Phase 5-2 — 마지막 TTS 오디오 재재생
    await interaction.reply({ content: '(다시 듣기 기능은 곧 추가됩니다)', ephemeral: true });
  }
}

client.login(config.discord.token);
