import { Client, REST, Routes } from 'discord.js';
import { config } from '@/config';
import { commands } from '@/commands';
import { logger } from '@/utils/logger';

export async function onReady(client: Client): Promise<void> {
  logger.info(`봇 준비 완료: ${client.user?.tag}`);

  const rest = new REST().setToken(config.discord.token);
  const commandData = [...commands.values()].map((command) => command.data.toJSON());

  try {
    await rest.put(Routes.applicationCommands(config.discord.clientId), {
      body: commandData,
    });
    logger.info(`슬래시 명령어 ${commandData.length}개 글로벌 등록 완료`);
  } catch (error) {
    logger.error('슬래시 명령어 등록 실패', error);
  }
}
