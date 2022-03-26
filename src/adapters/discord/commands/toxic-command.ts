import { AddToxicUseCase } from '../../../usecases/add-toxic-usecase';
import type { Command } from '../../../types';

import { ApplicationCommandType, ApplicationCommandOptionType } from '../../../types';
import { ToxicRepository } from '../../../db/toxic-repository';
import { DiscordJsUserToApiUser } from '../../helpers/discord-js';

const addToxicUseCase = new AddToxicUseCase(new ToxicRepository());

export const toxicUserCommand: Command = {
  name: 'Tóxico',
  type: ApplicationCommandType.User,
  handle: async (ctx): Promise<void> => {
    if (ctx.interaction.isUserContextMenu()) {
      ctx.interaction.reply(
        await addToxicUseCase.handle({
          toxicUser: DiscordJsUserToApiUser(ctx.interaction.targetUser),
          viewerUser: DiscordJsUserToApiUser(ctx.interaction.user),
        }),
      );
    }
  },
};

export const toxicChannelCommand: Command = {
  name: 'tóxico',
  description: 'Denunciar um usuário como tóxico.',
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'user',
      description: 'Usuário tóxico',
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  handle: async (ctx): Promise<void> => {
    if (ctx.interaction.isApplicationCommand()) {
      const toUser = ctx.interaction.options.getUser('user', true);

      ctx.interaction.reply(
        await addToxicUseCase.handle({
          toxicUser: DiscordJsUserToApiUser(toUser),
          viewerUser: DiscordJsUserToApiUser(ctx.interaction.user),
        }),
      );
    }
  },
};
