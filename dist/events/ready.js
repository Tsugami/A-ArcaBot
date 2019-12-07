"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});

var _config = require('../config/config');
var _Utils = require('../utils/Utils');

 class ReadyEvent  {constructor() { ReadyEvent.prototype.__init.call(this);ReadyEvent.prototype.__init2.call(this); }
  __init() {this.name = 'ready'}
  __init2() {this.emitter = 'once'}

  async run () {
    this.guilds.get(_config.guildId)
      .members.forEach((member) => {
        _Utils.manageMonsterHunterRoles.call(void 0, member, 'add')
      })
  }
} exports.default = ReadyEvent;
