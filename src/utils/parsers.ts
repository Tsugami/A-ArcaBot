import type { Activity, ActivityType as ActivityTypeDiscordJS, User } from 'discord.js';
import type { GatewayActivity, APIUser } from '../types';

import { ActivityType } from '../types';

export const normalizeActivityType = (type: ActivityTypeDiscordJS): ActivityType => {
  switch (type) {
    case 'PLAYING':
      return ActivityType.Playing;
    case 'STREAMING':
      return ActivityType.Streaming;
    case 'LISTENING':
      return ActivityType.Listening;
    case 'WATCHING':
      return ActivityType.Watching;
    case 'COMPETING':
      return ActivityType.Competing;
    case 'CUSTOM':
      return ActivityType.Custom;
    default:
      return ActivityType.Playing;
  }
};

export const normalizeActivity = (activity: Activity): GatewayActivity => {
  return {
    created_at: activity.createdTimestamp,
    id: activity.id,
    name: activity.name,
    type: normalizeActivityType(activity.type),
    application_id: activity.applicationId ?? undefined,
    state: activity.state,
  };
};

export const normalizeUser = (user: User): APIUser => {
  return {
    avatar: user.avatar,
    discriminator: user.discriminator,
    id: user.id,
    username: user.username,
  };
};
