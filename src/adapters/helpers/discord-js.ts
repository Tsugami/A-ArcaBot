import type { User } from 'discord.js';
import type { APIUser } from 'types';

export const DiscordJsUserToApiUser = (user: User): APIUser => {
  return {
    id: user.id,
    username: user.username,
    discriminator: user.discriminator,
    avatar: user.avatar,
  };
};
