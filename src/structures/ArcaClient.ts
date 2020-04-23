import { Client, Guild } from 'discord.js'
import { PlayingRoleIDs, GameRoleIDs, GuildId, fullAwardRoleId } from '../constants'
import { createRainbow } from '../utils/rainbow'
import RoleUtil from '../utils/role'

export default class ArcaClient extends Client {
  rainbow: string[] = createRainbow(100)
  currentColorIndex = 0;

  constructor () {
    super({
      fetchAllMembers: true
    })
    this.once('ready', () => {
      const guild = this.guilds.cache.get(GuildId)

      console.log('Acordei :)')

      this.setInterval(() => this.handleGameRole(guild), 5000)
      this.setInterval(() => this.handleRainbow(guild), 300000)
    })
  }

  handleGameRole (guild: Guild) {
    guild.members.cache.forEach(member => {
      if (member.user.bot) return

      const playingGame = RoleUtil.findGameByPlaying(member)

      if (playingGame) {
        const gameRoleId = GameRoleIDs[playingGame]
        const playingRoleId = PlayingRoleIDs[playingGame]

        if (gameRoleId && !member.roles.cache.has(gameRoleId)) {
          member.roles.add(gameRoleId)
        }

        if (playingRoleId && !member.roles.cache.has(playingRoleId)) {
          member.roles.add(playingRoleId)
        }
      }

      const playingRole = RoleUtil.findGameByPlayingRole(member, playingGame)
      if (playingRole && !RoleUtil.isPlayingGame(member, playingRole)) {
        member.roles.remove(PlayingRoleIDs[playingRole])
      }
    })
  }

  handleRainbow (guild: Guild) {
    this.currentColorIndex = this.getNextColorIndex()
    guild.roles.cache.get(fullAwardRoleId).edit({ color: this.rainbow[this.currentColorIndex] })
  }

  getNextColorIndex () {
    const next = this.currentColorIndex + 1
    if (next === this.rainbow.length - 1) return 0
    return next
  }
}
