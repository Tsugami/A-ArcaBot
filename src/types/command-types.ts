// import type { Database } from '../db/database';
import type { ApplicationCommandType, APIApplicationCommandOption } from 'discord-api-types/v9';
import type { Interaction } from 'discord.js';

export interface Command {
  name: string;
  type: ApplicationCommandType;
  options?: APIApplicationCommandOption[];
  description?: string;
  handle(ctx: CommandContext): void;
}

export interface CommandContext {
  // db: Database;
  interaction: Interaction;
}
