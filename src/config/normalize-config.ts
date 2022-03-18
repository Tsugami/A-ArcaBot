import type { Game } from '../types';

export const normalizeActivityNameOrState = (text: string) =>
  text.replace(/\s+/g, ' ').trim().toLowerCase();

/**
 * change activity data structure to key value to speed up queries
 */
export const normalizeGamesConfig = (games: Record<string, Game>) => {
  const activitiesStates: Record<string, string> = {};
  const aplicationIds: Record<string, string> = {};
  const aplicationNames: Record<string, string> = {};
  const playingRoleIDs: Record<string, string> = {};

  for (const gameID in games) {
    const game = games[gameID];

    playingRoleIDs[game.playingRoleId] = gameID;

    for (const activity of game.activities) {
      if (activity.application_id) {
        aplicationIds[activity.application_id] = gameID;
      }
      if (activity.state) {
        activitiesStates[normalizeActivityNameOrState(activity.state)] = gameID;
      }
      if (activity.name) {
        aplicationNames[normalizeActivityNameOrState(activity.name)] = gameID;
      }
    }
  }

  return {
    activitiesStates,
    aplicationIds,
    aplicationNames,
    playingRoleIDs,
  };
};
