import { Listener } from 'discord-akairo'
import { GuildMember, CategoryChannel } from 'discord.js'
import { voiceChannelCreatorId, voiceCategoryId } from '../config/config'

const channelName = 'Gathering Hall'
export default class VoiceStateUpdateEvent extends Listener {
  constructor () {
    super('voiceStateUpdate', {
      emitter: 'client',
      eventName: 'voiceStateUpdate',
      type: 'on'
    })
  }

  async exec (oldMember: GuildMember, newMember: GuildMember): Promise<void> {
    const guild = newMember.guild
    // create new gathering hall channel
    if (newMember.voiceChannelID === voiceChannelCreatorId) {
      const category = guild.channels.find(channel => channel.id === voiceCategoryId)
      if (!(category instanceof CategoryChannel)) return

      const channels = category.children.filter(channel => channel.type === 'voice')
      const hallChannels = channels.filter(channel => channel.name.startsWith(channelName))

      try {
        const newChannel = await guild.createChannel(`${channelName} ${hallChannels.size}`, {
          type: 'voice',
          parent: voiceCategoryId,
          position: channels.size
        })

        try {
          await newMember.setVoiceChannel(newChannel)
        } catch (error) {
          console.error(`Unable to move member: ${error}`)
        }
      } catch (error) {
        console.error(`Unable to create new channel: ${error}`)
      }
    }

    // delete gathering hall channel when not has members
    if (oldMember.voiceChannel && oldMember.voiceChannel.name.startsWith(channelName)) {
      if (!oldMember.voiceChannel.members.size) {
        oldMember.voiceChannel.delete()
      }
    }
  }
}
