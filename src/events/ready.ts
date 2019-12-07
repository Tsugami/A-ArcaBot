import EventBase from './base'
import { Client } from 'discord.js'
import { guildId } from '../config/config'
import { manageMonsterHunterRoles } from '../utils/Utils'

export default class ReadyEvent implements EventBase {
  name = 'ready'
  emitter: 'once' = 'once'

  async run (this: Client): Promise<void> {
    this.guilds.get(guildId)
      .members.forEach((member) => {
        manageMonsterHunterRoles(member, 'add')
      })
  }
}
