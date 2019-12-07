import { guildId } from '../config/config'
import { manageMonsterHunterRoles } from '../utils/Utils'
import { Listener } from 'discord-akairo'

export default class ReadyEvent extends Listener {
  constructor () {
    super('ready', {
      emitter: 'client',
      eventName: 'ready'
    })
  }

  async exec (): Promise<void> {
    console.log('online!')
    this.client.guilds.get(guildId)
      .members.forEach((member) => {
        manageMonsterHunterRoles(member, 'add')
      })
  }
}
