import RoleUtil from './utils/role';
import { GameRoleIDs, Games, PlayingRoleIDs, STREAMING_ROLE_ID } from './constants';

import { GuildMember } from './structures/Member';
import { logger } from './utils/logger';

export class GamePlaying {
  /**
   * Returns the game that the member is playing, if the game is not found, returns undefined. It only works with pre-config games.
   * @example GamePlaying.getGame(member);
   */
  static getGame(member: GuildMember): Games | undefined {
    return RoleUtil.findGameByPlaying(member);
  }

  /**
   * Check if the member is streaming on twitch
   * @example GamePlaying.isStreaming(member);
   */
  static isStreaming(member: GuildMember): boolean {
    return member.presence.activities.some(({ type }) => type === 'STREAMING');
  }

  /**
   * Add streaming role if user is streaming, if user is not streaming and has the role, remove role
   * @example GamePlaying.toggleStreamingRole(member, game);
   */
  static async toggleStreamingRole(member: GuildMember): Promise<void> {
    const hasStreamingRole = member.roles.cache.has(STREAMING_ROLE_ID);
    const isStreaming = GamePlaying.isStreaming(member);

    if (isStreaming && !hasStreamingRole) {
      logger.debug('Adding streaming role for %s', member.user.tag);
      await member.roles.add(STREAMING_ROLE_ID);
    } else if (!isStreaming && hasStreamingRole) {
      logger.debug('Removing streaming role for %s', member.user.tag);
      await member.roles.remove(STREAMING_ROLE_ID);
    }
  }

  /**
   * if user is not playing the game and has the playing role, remove role.
   * @example GamePlaying.toggleGameRole(member, game);
   */
  static async handleRemoveGameRole(member: GuildMember): Promise<void> {
    const playingGame = GamePlaying.getGame(member);

    const playingRole = RoleUtil.findGameByPlayingRole(member, playingGame);
    if (playingRole && !RoleUtil.isPlayingGame(member, playingRole)) {
      logger.debug('Remove %s playing role for %s', playingRole, member.user.tag);
      member.roles.remove(PlayingRoleIDs[playingRole]);
    }
  }

  /**
   * Add playing role if user is playing. Also adds the game role if the user doesn't have it.
   * @example GamePlaying.toggleGameRole(member, game);
   */
  static async handleGameRole(member: GuildMember): Promise<void> {
    const playingGame = GamePlaying.getGame(member);

    if (!playingGame) return;

    const gameRoleId = GameRoleIDs[playingGame];
    const playingRoleId = PlayingRoleIDs[playingGame];

    const hasGameRole = !!gameRoleId && member.roles.cache.has(gameRoleId);
    const hasPlayingRole = member.roles.cache.has(playingRoleId);

    if (gameRoleId && !hasGameRole) {
      logger.debug('Adding %s game role for %s', playingGame, member.user.tag);
      member.roles.add(gameRoleId);
    }

    if (playingRoleId && !hasPlayingRole) {
      logger.debug('Adding %s playing role for %s', playingGame, member.user.tag);
      member.roles.add(playingRoleId);
    }
  }
}
