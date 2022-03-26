import { REST } from '@discordjs/rest';
import { config } from './config';
import ArcaClient from './ArcaClient';
import { toxicChannelCommand, toxicUserCommand } from './adapters/discord/commands/toxic-command';

const client = new ArcaClient();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN!);

client.on('interactionCreate', (interaction) => {
  console.log('mt');
  if (!interaction.isApplicationCommand()) return;
  console.log('ata', interaction);

  if (interaction.isUserContextMenu()) {
    if (interaction.commandName === toxicUserCommand.name) {
      return toxicUserCommand.handle({ interaction });
    }
  }

  if (interaction.isCommand()) {
    if (interaction.commandName === toxicChannelCommand.name) {
      return toxicChannelCommand.handle({ interaction });
    }
  }
});

const applicationGuildCommands = (applicationId: string, guildId: string) =>
  `/applications/${applicationId}/guilds/${guildId}/commands` as const;

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(applicationGuildCommands(config.clientId, config.guildId), {
      body: [toxicUserCommand, toxicChannelCommand],
    });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.login(process.env.TOKEN);
