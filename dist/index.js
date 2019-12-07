"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('dotenv/config');
var _discordjs = require('discord.js');
var _events = require('./events'); var _events2 = _interopRequireDefault(_events);


const bot = new (0, _discordjs.Client)()

for (const i in _events2.default) {
  const event = new _events2.default[i]()
  bot[event.emitter](event.name, event.run.bind(bot))
  console.log(`event loaded: ${event.name}`)
}

bot.login(process.env.TOKEN)
  .then(() => {
    console.log('online')
  })
