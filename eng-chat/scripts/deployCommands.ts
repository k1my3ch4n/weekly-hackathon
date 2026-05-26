import { REST, Routes, SlashCommandBuilder } from 'discord.js';
import { config } from '../src/app/config';
import { logger } from '../src/shared/utils/logger';

const commands = [
  new SlashCommandBuilder()
    .setName('join')
    .setDescription('봇을 현재 음성 채널에 초대하고 영어 회화 세션을 시작합니다.'),
  new SlashCommandBuilder()
    .setName('leave')
    .setDescription('봇이 음성 채널에서 나가고 세션을 종료합니다.'),
].map((command) => command.toJSON());

const rest = new REST().setToken(config.discord.token);

(async () => {
  try {
    logger.info('슬래시 커맨드 등록 중...');

    if (config.discord.guildId) {
      await rest.put(
        Routes.applicationGuildCommands(config.discord.clientId, config.discord.guildId),
        { body: commands }
      );
      logger.info(`길드 커맨드 등록 완료 (guildId: ${config.discord.guildId})`);
    } else {
      await rest.put(
        Routes.applicationCommands(config.discord.clientId),
        { body: commands }
      );
      logger.info('글로벌 커맨드 등록 완료 (전파까지 최대 1시간 소요)');
    }
  } catch (error) {
    logger.error('커맨드 등록 실패', error);
    process.exit(1);
  }
})();
