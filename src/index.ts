import 'dotenv/config'
import { AkairoClient } from 'discord-akairo'
import path from 'path'

const bot = new AkairoClient({
  listenerDirectory: path.join(__dirname, './events')
}, {})

bot.login(process.env.TOKEN)
