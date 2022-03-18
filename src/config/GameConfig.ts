import type { GameActivity, Game } from '../types';

import { config } from '../config';
import { normalizeGamesConfig, normalizeActivityNameOrState } from './normalize-config';

const { playingRoleIDs, activitiesStates, aplicationIds, aplicationNames } = normalizeGamesConfig(
  config.games,
);

export class GameConfig {
  static getPlayingRoleIds(): string[] {
    return Object.keys(playingRoleIDs);
  }

  static findGameByPlayingRoleId(playingRoleId: string): Game | undefined {
    return config.games[playingRoleIDs[playingRoleId]];
  }

  static findGameByActivity(activity: GameActivity): Game | undefined {
    if (activity.application_id) {
      return GameConfig.findGameByActivityApplicationID(activity.application_id);
    }

    if (activity.state) {
      return GameConfig.findGameByActivityState(activity.state);
    }

    if (activity.name) {
      return GameConfig.findGameByActivityName(activity.name);
    }
  }

  static findGameByActivityName(activityName: string): Game | undefined {
    return config.games[aplicationNames[normalizeActivityNameOrState(activityName)]];
  }

  static findGameByActivityState(activityState: string): Game | undefined {
    return config.games[activitiesStates[normalizeActivityNameOrState(activityState)]];
  }

  static findGameByActivityApplicationID(applicationID: string): Game | undefined {
    return config.games[aplicationIds[applicationID]];
  }
}
