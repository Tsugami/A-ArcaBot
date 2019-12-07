"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _config = require('../config/config');
var _Utils = require('../utils/Utils');
var _discordakairo = require('discord-akairo');

 class ReadyEvent extends _discordakairo.Listener {
  constructor () {
    super('ready', {
      emitter: 'client',
      eventName: 'ready'
    })
  }

  async exec () {
    console.log('online!')
    this.client.guilds.get(_config.guildId)
      .members.forEach((member) => {
        _Utils.manageMonsterHunterRoles.call(void 0, member, 'add')
      })
  }
} exports.default = ReadyEvent;
