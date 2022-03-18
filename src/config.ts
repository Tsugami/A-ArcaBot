import type { Config } from 'types';

export const config: Config = {
  guildId: '323999635993657344',
  fullAwardRoleId: '330101098680197120',
  streamingRoleId: '338493040786145280',
  source: 'https://github.com/Tsugami/A-ArcaBot',
  games: {
    MHFU: {
      name: 'MHFU',
      playingRoleId: '652619091248545802',
      gameRoleId: '339206452482670592',
      activities: [
        {
          state: 'Monster Hunter Freedom Unite',
        },
      ],
    },
    MHP3RD: {
      name: 'MHP3RD',
      playingRoleId: '356645279413567489',
      gameRoleId: '339206693135319041',
      activities: [
        {
          state: 'Monster Hunter Portable 3rd HD Ver.',
        },
      ],
    },
    MHW: {
      name: 'MHW',
      playingRoleId: '392797213752950784',
      gameRoleId: '339206451723501570',
      activities: [
        {
          name: 'Monster Hunter: World',
        },
      ],
    },
    MHGU: {
      name: 'MHGU',
      playingRoleId: '805245051961212939',
      gameRoleId: '954189853074006067',
      activities: [
        {
          state: 'Monster Hunter Generations Ultimate',
        },
        {
          application_id: '568815339807309834',
        },
      ],
    },
    MHR: {
      name: 'MHR',
      playingRoleId: '954190078652071988',
      gameRoleId: '954190720795832400',
      activities: [
        {
          name: 'Monster Hunter Rise',
        },
      ],
    },
    /**
     * PPSSPP should be the last game to be added to the list because it's
     * the only game that doesn't have a game role and it's the others
     * PPSSPP games like MHFU can be added on top
     */
    PPSSPP: {
      name: 'PPSSPP',
      playingRoleId: '335581224972320768',
      activities: [
        {
          name: 'PPSSPP',
        },
        {
          application_id: '423397985041383434',
        },
      ],
    },
  },
};
