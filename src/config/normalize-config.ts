import type { Game } from '../types';

export const normalizeActivityNameOrState = (text: string) =>
  text.replace(/\s+/g, ' ').trim().toLowerCase();

type Value = string;
type GameId = string;

/**
 * change activity data structure to key value to speed up queries
 */
export const normalizeGamesConfig = (games: Record<string, Game>) => {
  const gamesAlias = new Map<Value, GameId>();
  const playingRoleIDs: string[] = [];

  for (const gameID in games) {
    const game = games[gameID];

    playingRoleIDs.push(game.playingRoleId);
    gamesAlias.set(game.playingRoleId, gameID);

    for (const activity of game.activities) {
      for (const value of Object.values(activity)) {
        if (!value) continue;
        gamesAlias.set(normalizeActivityNameOrState(value), gameID);
      }
    }
  }

  return {
    getGameIdByProp: (value: Value): GameId | undefined => {
      return gamesAlias.get(normalizeActivityNameOrState(value));
    },
    playingRoleIDs,
  };
};
