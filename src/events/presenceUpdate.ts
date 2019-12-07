import EventBase from './base'
import { GuildMember } from 'discord.js'
import { guildId } from '../config/config'
import { manageMonsterHunterRoles } from '../utils/Utils'

export default class PresenceUpdateEvent implements EventBase {
  name = 'presenceUpdate'
  emitter: 'on' = 'on'

  async run (oldMember: GuildMember, newMember: GuildMember): Promise<void> {
    if (oldMember.guild.id !== guildId) return

    manageMonsterHunterRoles(oldMember, 'remove')
    manageMonsterHunterRoles(newMember, 'add')
  }
}
