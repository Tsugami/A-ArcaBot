import { Client, Guild, GuildMember } from 'discord.js';
import {
  PlayingRoleIDs,
  GameRoleIDs,
  GuildId,
  fullAwardRoleId,
  StreamingRoleId,
} from '../constants';
import Rainbow from '../utils/rainbow';
import RoleUtil from '../utils/role';
import { logger, timeout } from '../utils/decorators';

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
    const playingGame = RoleUtil.findGameByPlaying(member);

    const isStreaming = member.presence.activities.some(({ type }) => type === 'STREAMING');
    const hasStreamingRole = member.roles.cache.has(StreamingRoleId);

    if (playingGame) {
      const gameRoleId = GameRoleIDs[playingGame];
      const playingRoleId = PlayingRoleIDs[playingGame];

      if (isStreaming && !hasStreamingRole) {
        member.roles.add(StreamingRoleId);
      }

      if (gameRoleId && !member.roles.cache.has(gameRoleId)) {
        member.roles.add(gameRoleId);
      }

      if (playingRoleId && !member.roles.cache.has(playingRoleId)) {
        member.roles.add(playingRoleId);
      }
    }

    if (!isStreaming && hasStreamingRole) {
      member.roles.remove(StreamingRoleId);
    }

    const playingRole = RoleUtil.findGameByPlayingRole(member, playingGame);
    if (playingRole && !RoleUtil.isPlayingGame(member, playingRole)) {
      member.roles.remove(PlayingRoleIDs[playingRole]);
    }
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
