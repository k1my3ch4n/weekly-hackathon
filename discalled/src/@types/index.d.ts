import type { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
}

export interface AudioChunk {
  userId: string;
  chunks: Buffer[];
  startedAt: number;
}

export interface VoiceSession {
  guildId: string;
  voiceChannelId: string;
  textChannelId: string;
  userId: string;
  audioChunk: AudioChunk;
}
