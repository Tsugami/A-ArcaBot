import type { APIUser } from './types';

const userToString = (user: APIUser): string => `<@${user.id}>`;

export const MESSAGES = {
  UNKNOWN_ERROR: 'Ocorreu um erro desconhecido. Tente novamente mais tarde.',
  TOXIC_SUCCESS: (to: APIUser, from: APIUser, count: number) => {
    const toString = userToString(to);
    const fromString = userToString(from);

    return `${toString} Tóxico! ${fromString} testemunhou o ${fromString} sendo tóxico. (No total, ${toString} foi tóxico ${count} vezes)`;
  },
  TOXIC_BOT_ERROR: 'Bots não são tóxicos! <:CatRee:702759289516982282>',
  TOXIC_YOURSELF_ERROR: `consulte um psicologo! <:seilporra:341398244854857730>`,
};
