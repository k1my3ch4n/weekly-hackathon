import { Client, Events, GatewayIntentBits, GuildMember, ChannelType, GuildTextBasedChannel } from 'discord.js';
import { joinVoiceChannel, getVoiceConnection } from '@discordjs/voice';
import { config } from './config';
import { logger } from '@shared/utils/logger';
import { sessionStore } from '@entities/session';
import { runVoicePipeline, replayLastAudio } from '@processes/voiceConversation';

const guildActivePipelines = new Map<string, Set<string>>();
const guildTextChannels = new Map<string, GuildTextBasedChannel>();

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

    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: guildId!,
      adapterCreator: interaction.guild!.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: false,
    });

    const textChannel = interaction.channel as GuildTextBasedChannel;
    guildTextChannels.set(guildId!, textChannel);
    guildActivePipelines.set(guildId!, new Set());

    connection.receiver.speaking.on('start', (speakingUserId) => {
      const activePipelines = guildActivePipelines.get(guildId!) ?? new Set();

      if (activePipelines.has(speakingUserId)) {
        return;
      }

      const speakingMember = interaction.guild!.members.cache.get(speakingUserId);
      if (!speakingMember || speakingMember.user.bot) {
        return;
      }

      activePipelines.add(speakingUserId);

      runVoicePipeline(connection, textChannel, speakingUserId, speakingMember.user.username).finally(
        () => {
          activePipelines.delete(speakingUserId);
        },
      );
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

    guildActivePipelines.delete(guildId!);
    guildTextChannels.delete(guildId!);

    logger.info(`[${guildId}] 음성 채널 퇴장 및 세션 종료`);
    await interaction.reply('음성 채널에서 나갔습니다. 세션이 종료되었습니다. 👋');
  }
}

async function handleButton(interaction: import('discord.js').ButtonInteraction) {
  if (interaction.customId.startsWith('replay:')) {
    const targetUserId = interaction.customId.split(':')[1];
    const connection = getVoiceConnection(interaction.guildId!);

    if (!connection) {
      await interaction.reply({ content: '봇이 음성 채널에 있지 않습니다.', ephemeral: true });
      return;
    }

    await interaction.deferReply({ ephemeral: true });

    const replayed = await replayLastAudio(connection, targetUserId);

    if (replayed) {
      await interaction.editReply('다시 재생합니다. 🔁');
    } else {
      await interaction.editReply('재생할 이전 음성이 없습니다.');
    }
  }
}

client.login(config.discord.token);
