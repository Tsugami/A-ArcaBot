import { Client, Guild } from 'discord.js'
import { PlayingRoleIDs, GameRoleIDs, GuildId, fullAwardRoleId, StreamingRoleId } from '../constants'
import Rainbow from '../utils/rainbow'
import RoleUtil from '../utils/role'

export default class ArcaClient extends Client {
  rainbow = new Rainbow(100)
  currentColorIndex = 0;

  constructor () {
    super({
      fetchAllMembers: true,
      messageCacheMaxSize: 0,
      presence: {
        activity: { name: 'source: https://github.com/Tsugami/A-ArcaBot' }
      }
    })
    this.once('ready', () => {
      const guild = this.guilds.cache.get(GuildId)

      if (!guild) {
        console.error('BOT IS NOT ON SERVER')
        process.exit(0)
      }

      console.log('Acordei :)')

      this.setInterval(() => this.handleGameRole(guild), 5000)
      this.setInterval(() => this.handleRainbow(guild), 300000)
    })
  }

  handleGameRole (guild: Guild) {
    guild.members.cache.forEach(member => {
      if (member.user.bot) return

      const playingGame = RoleUtil.findGameByPlaying(member)

      const isStreaming = member.presence.activities.some(({ type }) => type === 'STREAMING')
      const hasStreamingRole = member.roles.cache.has(StreamingRoleId)

      if (playingGame) {
        const gameRoleId = GameRoleIDs[playingGame]
        const playingRoleId = PlayingRoleIDs[playingGame]

        if (isStreaming && !hasStreamingRole) {
          member.roles.add(StreamingRoleId)
        }

        if (gameRoleId && !member.roles.cache.has(gameRoleId)) {
          member.roles.add(gameRoleId)
        }

        if (playingRoleId && !member.roles.cache.has(playingRoleId)) {
          member.roles.add(playingRoleId)
        }
      }

      if (!isStreaming && hasStreamingRole) {
        member.roles.remove(StreamingRoleId)
      }

      const playingRole = RoleUtil.findGameByPlayingRole(member, playingGame)
      if (playingRole && !RoleUtil.isPlayingGame(member, playingRole)) {
        member.roles.remove(PlayingRoleIDs[playingRole])
      }
    })
  }

  handleRainbow (guild: Guild) {
    guild.roles.cache.get(fullAwardRoleId)?.edit({ color: this.rainbow.color })
  }
}
