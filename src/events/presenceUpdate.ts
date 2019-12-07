import { GuildMember } from 'discord.js'
import { guildId } from '../config/config'
import { manageMonsterHunterRoles } from '../utils/Utils'
import { Listener } from 'discord-akairo'

export default class PresenceUpdateEvent extends Listener {
  constructor () {
    super('presenceUpdate', {
      emitter: 'client',
      eventName: 'presenceUpdate'
    })
  }

  async exec (oldMember: GuildMember, newMember: GuildMember): Promise<void> {
    if (oldMember.guild.id !== guildId) return

    manageMonsterHunterRoles(oldMember, 'remove')
    manageMonsterHunterRoles(newMember, 'add')
  }
}
