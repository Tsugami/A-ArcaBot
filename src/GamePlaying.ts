import type { Game, APIUser, Config, GatewayActivity } from './types';

import { ActivityType } from './types';
import { logger } from './utils/logger';
import { GameConfig } from './config/GameConfig';
import { RoleManagar } from './lib/RoleManagar';
import { getUserDisplayName } from './utils/discord';

export class GamePlaying {
  constructor(public roleManagar: RoleManagar, public config: Config) {}

  /**
   * Returns the game that the member is playing, if the game is not found, returns undefined. It only works with games-on config file.
   */
  static getGame(activities: GatewayActivity[]): Game | undefined {
    for (const activity of activities) {
      const game = GameConfig.findGameByActivity(activity);
      if (game) return game;
    }
  }

  /**
   * Check if the member is streaming on twitch
   */
  static isStreaming(activities: GatewayActivity[]): boolean {
    return !!activities.some(({ type }) => type === ActivityType.Streaming);
  }

  /**
   * Add streaming role if user is streaming, if user is not streaming and has the role, remove role
   */
  async toggleStreamingRole(user: APIUser, activities: GatewayActivity[]): Promise<void> {
    const hasStreamingRole = this.roleManagar.hasRole(user.id, this.config.streamingRoleId);
    const isStreaming = GamePlaying.isStreaming(activities);

    if (isStreaming && !hasStreamingRole) {
      logger.debug('Adding streaming role for %s', getUserDisplayName(user));
      await this.roleManagar.addRole(user.id, this.config.streamingRoleId);
    } else if (!isStreaming && hasStreamingRole) {
      logger.debug('Removing streaming role for %s', getUserDisplayName(user));
      await this.roleManagar.removeRole(user.id, this.config.streamingRoleId);
    }
  }

  /**
   * if user is not playing the game and has the playing role, remove role.
   */
  async handleRemoveGameRole(user: APIUser, activities: GatewayActivity[]): Promise<void> {
    const playingGame = GamePlaying.getGame(activities);

    for (const playingRoleID of GameConfig.getPlayingRoleIds()) {
      if (playingRoleID === playingGame?.playingRoleId) continue;

      if (this.roleManagar.hasRole(user.id, playingRoleID)) {
        logger.debug('Removing %s playing role for %s', playingGame, getUserDisplayName(user));
        await this.roleManagar.removeRole(user.id, playingRoleID);
      }
    }
  }

  /**
   * Add playing role if user is playing. Also adds the game role if the user doesn't have it.
   */
  async handleGameRole(user: APIUser, activities: GatewayActivity[]): Promise<void> {
    const playingGame = GamePlaying.getGame(activities);

    if (!playingGame) return;

    const hasGameRole =
      !!playingGame?.gameRoleId && this.roleManagar.hasRole(user.id, playingGame?.gameRoleId);

    if (!!playingGame?.gameRoleId && !hasGameRole) {
      logger.debug('Adding %s game role for %s', playingGame, getUserDisplayName(user));
      this.roleManagar.addRole(user.id, playingGame.gameRoleId);
    }

    const hasPlayingRole = this.roleManagar.hasRole(user.id, playingGame.playingRoleId);

    if (playingGame && !hasPlayingRole) {
      logger.debug('Adding %s playing role for %s', playingGame, getUserDisplayName(user));
      this.roleManagar.addRole(user.id, playingGame.playingRoleId);
    }
  }
}
