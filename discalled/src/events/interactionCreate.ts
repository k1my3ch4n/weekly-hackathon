import { Interaction } from 'discord.js';
import { commands } from '@/commands';
import { createErrorEmbed } from '@/utils/embed';
import { logger } from '@/utils/logger';

export async function onInteractionCreate(interaction: Interaction): Promise<void> {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const command = commands.get(interaction.commandName);

  if (!command) {
    logger.warn(`알 수 없는 명령어: ${interaction.commandName}`);
    await interaction.reply({
      embeds: [createErrorEmbed('알 수 없는 명령어입니다.')],
      ephemeral: true,
    });
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    logger.error(`명령어 실행 오류: ${interaction.commandName}`, error);
    const errorEmbed = createErrorEmbed('명령어 실행 중 오류가 발생했습니다.');
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
    } else {
      await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
  }
}
