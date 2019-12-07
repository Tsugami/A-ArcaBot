"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _config = require('../config/config');
var _Utils = require('../utils/Utils');
var _discordakairo = require('discord-akairo');

 class PresenceUpdateEvent extends _discordakairo.Listener {
  constructor () {
    super('presenceUpdate', {
      emitter: 'client',
      eventName: 'presenceUpdate'
    })
  }

  async exec (oldMember, newMember) {
    if (oldMember.guild.id !== _config.guildId) return

    _Utils.manageMonsterHunterRoles.call(void 0, oldMember, 'remove')
    _Utils.manageMonsterHunterRoles.call(void 0, newMember, 'add')
  }
} exports.default = PresenceUpdateEvent;
