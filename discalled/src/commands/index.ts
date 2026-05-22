import { Collection } from 'discord.js';
import type { Command } from '@/@types';
import { search } from './search';
import { call } from './call';

export const commands = new Collection<string, Command>();

commands.set(search.data.name, search);
commands.set(call.data.name, call);
