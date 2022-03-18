import type { Game, GuildMember } from './types';

import { config } from './config';
import { logger } from './utils/logger';
import { GameConfig } from './config/GameConfig';

export class GamePlaying {
  /**
   * Returns the game that the member is playing, if the game is not found, returns undefined. It only works with games-on config file.
   */
  static getGame(member: GuildMember): Game | undefined {
    for (const activity of member.presence.activities) {
      const game = GameConfig.findGameByActivity(activity);
      if (game) return game;
    }
  }

  /**
   * Check if the member is streaming on twitch
   */
  static isStreaming(member: GuildMember): boolean {
    return member.presence.activities.some(({ type }) => type === 'STREAMING');
  }

  /**
   * Add streaming role if user is streaming, if user is not streaming and has the role, remove role
   */
  static async toggleStreamingRole(member: GuildMember): Promise<void> {
    const hasStreamingRole = member.roles.cache.has(config.streamingRoleId);
    const isStreaming = GamePlaying.isStreaming(member);

    if (isStreaming && !hasStreamingRole) {
      logger.debug('Adding streaming role for %s', member.user.tag);
      await member.roles.add(config.streamingRoleId);
    } else if (!isStreaming && hasStreamingRole) {
      logger.debug('Removing streaming role for %s', member.user.tag);
      await member.roles.remove(config.streamingRoleId);
    }
  }

  /**
   * if user is not playing the game and has the playing role, remove role.
   */
  static async handleRemoveGameRole(member: GuildMember): Promise<void> {
    const playingGame = GamePlaying.getGame(member);

    for (const playingRoleID of GameConfig.getPlayingRoleIds()) {
      if (playingRoleID === playingGame?.playingRoleId) continue;

      if (member.roles.cache.has(playingRoleID)) {
        logger.debug('Removing %s playing role for %s', playingGame, member.user.tag);
        await member.roles.remove(playingRoleID);
      }
    }
  }

  /**
   * Add playing role if user is playing. Also adds the game role if the user doesn't have it.
   */
  static async handleGameRole(member: GuildMember): Promise<void> {
    const playingGame = GamePlaying.getGame(member);

    if (!playingGame) return;

    const hasGameRole =
      !!playingGame?.gameRoleId && member.roles.cache.has(playingGame?.gameRoleId);

    if (!!playingGame?.gameRoleId && !hasGameRole) {
      logger.debug('Adding %s game role for %s', playingGame, member.user.tag);
      member.roles.add(playingGame.gameRoleId);
    }

    const hasPlayingRole = member.roles.cache.has(playingGame.playingRoleId);

    if (playingGame && !hasPlayingRole) {
      logger.debug('Adding %s playing role for %s', playingGame, member.user.tag);
      member.roles.add(playingGame.playingRoleId);
    }
  }
}
