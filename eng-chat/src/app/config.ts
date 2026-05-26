import dotenv from 'dotenv';

dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`필수 환경 변수가 없습니다: ${key}`);
  }
  return value;
}

export const config = {
  discord: {
    token: requireEnv('DISCORD_TOKEN'),
    clientId: requireEnv('DISCORD_CLIENT_ID'),
    guildId: process.env.DISCORD_GUILD_ID,
  },
  groq: {
    apiKey: requireEnv('GROQ_API_KEY'),
  },
  elevenlabs: {
    apiKey: requireEnv('ELEVENLABS_API_KEY'),
  },
};
