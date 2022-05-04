import { REST, RouteLike } from '@discordjs/rest';
import { logger } from '../utils/logger';

import { Command, Config } from '../types';

export class CommandHandler {
  private commands = new Map<string, Command>();

  constructor(private config: Config) {}

  get appCommandRoute(): RouteLike {
    return `/applications/${this.config.clientId}/guilds/${this.config.guildId}/commands`;
  }

  async registerGuildCommands() {
    const rest = new REST({ version: '9' });

    logger.log('Started refreshing application (/) commands.');

    await rest.put(this.appCommandRoute, {
      body: {
        commands: Array.from(this.commands.values()),
      },
    });

    logger.log('Successfully reloaded application (/) commands.');
  }

  addCommands(commands: Command[]) {
    commands.forEach((command) => this.commands.set(command.id, command));
  }
}
