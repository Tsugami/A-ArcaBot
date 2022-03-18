import type { Client } from 'discord.js';
import type { Config } from '../types';

export class RoleManagar {
  constructor(public client: Client, public config: Config) {}

  private getMember(memberId: string) {
    const guild = this.client.guilds.cache.get(this.config.guildId);
    return guild?.members.cache.get(memberId);
  }

  async removeRole(memberId: string, roleId: string): Promise<void> {
    await this.getMember(memberId)?.roles.remove(roleId);
  }

  async addRole(memberId: string, roleId: string): Promise<void> {
    await this.getMember(memberId)?.roles.add(roleId);
  }

  hasRole(memberId: string, roleId: string): boolean {
    return !!this.getMember(memberId)?.roles.cache.has(roleId);
  }
}
