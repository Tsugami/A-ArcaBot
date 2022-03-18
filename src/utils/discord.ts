import { APIUser } from '../types';

export const getUserDisplayName = (user: APIUser) => `${user.username}#${user.discriminator}`;
