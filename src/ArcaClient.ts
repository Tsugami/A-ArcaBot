import type { Guild, GuildMember } from 'discord.js';

import { Client } from 'discord.js';

import { config } from './config';
import { logger, timeout } from './utils/decorators';

import Rainbow from './utils/rainbow';
import { GamePlaying } from './GamePlaying';

export default class ArcaClient extends Client {
  private rainbow = new Rainbow(100);

  constructor() {
    super({
      fetchAllMembers: true,
      messageCacheMaxSize: 0,
      ws: {
        intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_PRESENCES'],
      },
      presence: {
        activity: { name: `source: ${config.source}` },
      },
    });
    this.on('ready', this.handleReady);
  }

  @logger('Acordei :)')
  private handleReady() {
    const guild = this.guilds.cache.get(config.guildId);

    if (!guild) {
      console.error('BOT IS NOT ON SERVER');
      process.exit(0);
    }

    this.handleGameRole(guild);
    this.handleRainbow(guild);
  }

  private runGamePlayingHandlers(member: GuildMember) {
    GamePlaying.handleGameRole(member);
    GamePlaying.handleRemoveGameRole(member);
    GamePlaying.toggleStreamingRole(member);
  }

  @timeout(5000)
  private handleGameRole(guild: Guild) {
    return guild.members.cache
      .filter((member) => !member.user.bot)
      .forEach(this.runGamePlayingHandlers);
  }

  @timeout(30000)
  private handleRainbow(guild: Guild) {
    return guild.roles.cache.get(config.fullAwardRoleId)?.edit({ color: this.rainbow.color });
  }
}
