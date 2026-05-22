import { Collection } from 'discord.js';
import type { Command } from '@/@types';

// Phase 4에서 /호출, /검색 명령어가 추가됩니다
export const commands = new Collection<string, Command>();
