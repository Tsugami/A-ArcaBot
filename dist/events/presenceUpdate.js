"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});

var _config = require('../config/config');
var _Utils = require('../utils/Utils');

 class PresenceUpdateEvent  {constructor() { PresenceUpdateEvent.prototype.__init.call(this);PresenceUpdateEvent.prototype.__init2.call(this); }
  __init() {this.name = 'presenceUpdate'}
  __init2() {this.emitter = 'on'}

  async run (oldMember, newMember) {
    if (oldMember.guild.id !== _config.guildId) return

    _Utils.manageMonsterHunterRoles.call(void 0, oldMember, 'remove')
    _Utils.manageMonsterHunterRoles.call(void 0, newMember, 'add')
  }
} exports.default = PresenceUpdateEvent;
