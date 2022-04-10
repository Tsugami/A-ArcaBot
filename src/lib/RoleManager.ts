import type { Client } from 'discord.js';
import { logger } from '../utils/logger';
import type { Config } from '../types';

const DISABLED_ROLE_MANAGER = !!process.env.DISABLED_ROLE_MANAGER;

export class RoleManager {
  constructor(public client: Client, public config: Config) {}

  private getMember(memberId: string) {
    const guild = this.client.guilds.cache.get(this.config.guildId);
    return guild?.members.cache.get(memberId);
  }

  private getMemberDisplayName(memberId: string) {
    const member = this.getMember(memberId);
    return member?.displayName ?? 'unknown';
  }

  private getRoleName(roleId: string) {
    const guild = this.client.guilds.cache.get(this.config.guildId);
    return guild?.roles.cache.get(roleId)?.name ?? 'unknown';
  }

  async removeRole(memberId: string, roleId: string): Promise<void> {
    logger.debug(
      'Removing "%s" playing role for %s',
      this.getRoleName(roleId),
      this.getMemberDisplayName(memberId),
    );

    if (!DISABLED_ROLE_MANAGER) await this.getMember(memberId)?.roles.remove(roleId);
  }

  async addRole(memberId: string, roleId: string): Promise<void> {
    logger.debug(
      'Adding "%s" game role for %s',
      this.getRoleName(roleId),
      this.getMemberDisplayName(memberId),
    );

    if (!DISABLED_ROLE_MANAGER) await this.getMember(memberId)?.roles.add(roleId);
  }

  hasRole(memberId: string, roleId: string): boolean {
    return !!this.getMember(memberId)?.roles.cache.has(roleId);
  }
}
