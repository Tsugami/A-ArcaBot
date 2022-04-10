import type { ColorResolvable, Guild, GuildMember } from 'discord.js';

import { Client, Intents } from 'discord.js';

import { config } from './config';
import { logger, timeout } from './utils/decorators';

import Rainbow from './utils/rainbow';
import { GamePlaying } from './GamePlaying';
import { RoleManager } from './lib/RoleManager';
import { normalizeActivity, normalizeUser } from './utils/parsers';

export default class ArcaClient extends Client {
  private rainbow = new Rainbow(100);
  public roleManager = new RoleManager(this, config);
  public gamePlaying = new GamePlaying(this.roleManager, config);

  constructor() {
    super({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_PRESENCES],
      presence: {
        activities: [{ name: config.botActivity }],
      },
    });

    this.on('ready', this.handleReady);
  }

  @logger('Acordei :)')
  private handleReady() {
    const guild = this.guilds.cache.get(config.guildId);

    if (!guild) {
      console.error('BOT NOT FOUND IN GUILD');
      process.exit(0);
    }

    this.handleGameRole(guild);
    this.handleRainbow(guild);
  }

  private runGamePlayingHandlers(member: GuildMember) {
    if (!member.user || member.user.bot) return;

    const user = normalizeUser(member.user);
    const activities = member.presence?.activities.map(normalizeActivity) ?? [];

    this.gamePlaying.handleGameRole(user, activities);
    this.gamePlaying.handleRemoveGameRole(user, activities);
    this.gamePlaying.toggleStreamingRole(user, activities);
  }

  @timeout(5000)
  private handleGameRole(guild: Guild) {
    return guild.members.cache
      .filter((member) => !member.user.bot)
      .forEach((member) => this.runGamePlayingHandlers(member));
  }

  @timeout(30000)
  private handleRainbow(guild: Guild) {
    return guild.roles.cache
      .get(config.fullAwardRoleId)
      ?.edit({ color: this.rainbow.color as ColorResolvable });
  }
}
