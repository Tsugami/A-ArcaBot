"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _discordakairo = require('discord-akairo');
var _discordjs = require('discord.js');
var _config = require('../config/config');

const channelName = 'Gathering Hall'
 class VoiceStateUpdateEvent extends _discordakairo.Listener {
  constructor () {
    super('voiceStateUpdate', {
      emitter: 'client',
      eventName: 'voiceStateUpdate',
      type: 'on'
    })
  }

  async exec (oldMember, newMember) {
    const guild = newMember.guild
    // create new gathering hall channel
    if (newMember.voiceChannelID === _config.voiceChannelCreatorId) {
      const category = guild.channels.find(channel => channel.id === _config.voiceCategoryId)
      if (!(category instanceof _discordjs.CategoryChannel)) return

      const channels = category.children.filter(channel => channel.type === 'voice')
      const hallChannels = channels.filter(channel => channel.name.startsWith(channelName))

      try {
        const newChannel = await guild.createChannel(`${channelName} ${hallChannels.size}`, {
          type: 'voice',
          parent: _config.voiceCategoryId,
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
} exports.default = VoiceStateUpdateEvent;
