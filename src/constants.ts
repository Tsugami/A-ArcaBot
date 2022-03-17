export const GuildId = '323999635993657344';
export const fullAwardRoleId = '361277334118203402';
export const StreamingRoleId = '338493040786145280';
export type Games = 'PPSSPP' | 'MHFU' | 'MHP3RD' | 'MHW' | 'MHO' | 'MHGU';

export const PlayingRoleIDs: Record<Games, string> = {
  PPSSPP: '335581224972320768',
  MHFU: '652619091248545802',
  MHP3RD: '356645279413567489',
  MHW: '392797213752950784',
  MHO: '340194860529221633',
  MHGU: '805245051961212939',
};

export const GameRoleIDs: Partial<Record<Games, string>> = {
  MHFU: '339206452482670592',
  MHP3RD: '339206693135319041',
  MHW: '339206451723501570',
  MHO: '339206697987866627',
};

export const ApplicationIDs: Record<string, Games> = {
  '477152881196269569': 'MHW',
  '423397985041383434': 'PPSSPP',
  '568815339807309834': 'MHGU',
};

export const States: Record<string, Games> = {
  'MONSTER HUNTER FREEDOM UNITE™': 'MHFU',
  'Monster Hunter Freedom Unite': 'MHFU',
  'MONSTER HUNTER PORTABLE 3rd HD Ver.': 'MHP3RD',
  'MONSTER HUNTER GENERATIONS ULTIMATE': 'MHGU',
};

export const Names: Record<string, Games> = {
  'MONSTER HUNTER: WORLD': 'MHW',
};
