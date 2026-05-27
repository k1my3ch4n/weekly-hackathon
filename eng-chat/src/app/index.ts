import { Client, Events, GatewayIntentBits, GuildMember, ChannelType, GuildTextBasedChannel } from 'discord.js';
import { joinVoiceChannel, getVoiceConnection, VoiceConnectionStatus } from '@discordjs/voice';
import { config } from './config';
import { logger } from '@shared/utils/logger';
import { sessionStore } from '@entities/session';
import { runVoicePipeline, replayLastAudio, getLastAudio } from '@processes/voiceConversation';

const guildActivePipelines = new Map<string, Set<string>>();
const guildTextChannels = new Map<string, GuildTextBasedChannel>();
// 9-2: guild 단위 봇 발화 중 플래그
const guildBotSpeaking = new Map<string, boolean>();

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
    guildBotSpeaking.set(guildId!, false);

    // 9-4: VoiceConnectionStatus.Ready 이벤트 수신 후 speaking 리스너 등록
    //       Ready 이후 1000ms 쿨다운으로 잔여 패킷으로 인한 오발화 방지
    connection.once(VoiceConnectionStatus.Ready, () => {
      logger.info(`[${guildId}] VoiceConnection Ready — 1000ms 쿨다운 후 speaking 리스너 활성화`);

      setTimeout(() => {
        connection.receiver.speaking.on('start', (speakingUserId) => {
          // 9-2: 봇 발화 중이면 파이프라인 시작 차단
          if (guildBotSpeaking.get(guildId!) === true) {
            return;
          }

          const activePipelines = guildActivePipelines.get(guildId!) ?? new Set();

          if (activePipelines.has(speakingUserId)) {
            return;
          }

          const speakingMember = interaction.guild!.members.cache.get(speakingUserId);
          if (!speakingMember || speakingMember.user.bot) {
            return;
          }

          activePipelines.add(speakingUserId);

          const setPlaying = (v: boolean) => guildBotSpeaking.set(guildId!, v);

          runVoicePipeline(
            connection,
            textChannel,
            speakingUserId,
            speakingMember.user.username,
            setPlaying,
          ).finally(() => {
            activePipelines.delete(speakingUserId);
          });
        });

        logger.info(`[${guildId}] speaking 리스너 활성화 완료`);
      }, 1000);
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
    guildBotSpeaking.delete(guildId!);

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

    if (!getLastAudio(targetUserId)) {
      await interaction.reply({ content: '재생할 이전 음성이 없습니다.', ephemeral: true });
      return;
    }

    await interaction.reply({ content: '다시 재생합니다. 🔁', ephemeral: true });

    const setPlaying = (v: boolean) => guildBotSpeaking.set(interaction.guildId!, v);
    replayLastAudio(connection, targetUserId, setPlaying);
  }
}

client.login(config.discord.token);
