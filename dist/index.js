"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('dotenv/config');
var _discordakairo = require('discord-akairo');
var _path = require('path'); var _path2 = _interopRequireDefault(_path);

const bot = new (0, _discordakairo.AkairoClient)({
  listenerDirectory: _path2.default.join(__dirname, './events')
}, {})

bot.login(process.env.TOKEN)
