import type { GameActivity, Game } from '../types';

import { config } from '../config';
import { normalizeGamesConfig } from './normalize-config';

const { getGameIdByProp, playingRoleIDs } = normalizeGamesConfig(config.games);

export class GameConfig {
  static getPlayingRoleIds(): string[] {
    return playingRoleIDs;
  }

  static findGameByActivity(activity: GameActivity): Game | undefined {
    const value = activity.application_id ?? activity.name ?? activity.state ?? activity.details;
    const gameId = value ? getGameIdByProp(value) : null;

    return gameId ? config.games[gameId] : undefined;
  }
}
