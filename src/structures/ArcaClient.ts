import { Client, Guild, GuildMember } from 'discord.js';
import {
  PlayingRoleIDs,
  GameRoleIDs,
  GuildId,
  fullAwardRoleId,
  STREAMING_ROLE_ID,
} from '../constants';
import Rainbow from '../utils/rainbow';
import RoleUtil from '../utils/role';
import { logger, timeout } from '../utils/decorators';
import { GamePlaying } from '../GamePlaying';

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
        activity: { name: 'source: https://github.com/Tsugami/A-ArcaBot' },
      },
    });
    this.on('ready', this.onReady);
  }

  @logger('Acordei :)')
  private onReady() {
    const guild = this.guilds.cache.get(GuildId);

    if (!guild) {
      console.error('BOT IS NOT ON SERVER');
      process.exit(0);
    }

    this.handleGameRole(guild);
    this.handleRainbow(guild);
  }

  private ensureGameRole(member: GuildMember) {
    GamePlaying.handleGameRole(member);
    GamePlaying.handleRemoveGameRole(member);
    GamePlaying.toggleStreamingRole(member);
  }

  @timeout(5000)
  private handleGameRole(guild: Guild) {
    return guild.members.cache.filter((member) => !member.user.bot).forEach(this.ensureGameRole);
  }

  @timeout(30000)
  private handleRainbow(guild: Guild) {
    return guild.roles.cache.get(fullAwardRoleId)?.edit({ color: this.rainbow.color });
  }
}
