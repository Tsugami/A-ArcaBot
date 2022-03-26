import { InteractionReplyOptions } from 'discord.js';

export const ok = (content: string): InteractionReplyOptions => {
  return { content };
};

export const error = (content: string): InteractionReplyOptions => {
  return { content, ephemeral: true };
};
