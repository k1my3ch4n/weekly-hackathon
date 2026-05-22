import { Client, GatewayIntentBits } from 'discord.js';
import { config } from '@/config';
import { onReady } from '@/events/ready';
import { onInteractionCreate } from '@/events/interactionCreate';
import { logger } from '@/utils/logger';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMessages,
  ],
});

client.once('clientReady', () => onReady(client));
client.on('interactionCreate', (interaction) => onInteractionCreate(interaction));

client.login(config.discord.token).catch((error) => {
  logger.error('Discord 로그인 실패', error);
  process.exit(1);
});
