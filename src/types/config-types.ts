import type { GatewayActivity } from 'discord-api-types/v10';

export type GameActivity = Pick<
  Partial<GatewayActivity>,
  'application_id' | 'state' | 'name' | 'details'
>;

export interface Config {
  clientId: string;
  guildId: string;
  fullAwardRoleId: string;
  botActivity: string;
  streamingRoleId: string;
  games: Record<string, Game>;
}

export interface Game {
  name: string;
  /**
   * the role of playing the game that the user receives when playing
   */
  playingRoleId: string;
  /**
   * the game role that the user receives when playing at least once
   */
  gameRoleId?: string;
  /**
   * user discord activities that the bot will try to match to give the game roles
   */
  activities: GameActivity[];
}
