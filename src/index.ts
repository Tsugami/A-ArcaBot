import 'dotenv/config'
import { Client } from 'discord.js'
import events from './events'
import EventBase from './events/base'

const bot = new Client()

for (const i in events) {
  const event: EventBase = new events[i]()
  bot[event.emitter](event.name, event.run.bind(bot))
  console.log(`event loaded: ${event.name}`)
}

bot.login(process.env.TOKEN)
  .then(() => {
    console.log('online')
  })
