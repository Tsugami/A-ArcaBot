import { Client, GuildMember } from 'discord.js'
import { Games, ApplicationIDs, PlayingRoleIDs, GameRoleIDs, GuildId, States, Names } from '../constants'

export default class ArcaClient extends Client {
  constructor () {
    super({
      fetchAllMembers: true
    })
    this.once('ready', () => {
      console.log('Acordei :)')
      this.setInterval(() => this.handleGameRole(), 5000)
    })
  }

  findGameByPlaying (member: GuildMember): Games | null {
    for (const { applicationID, state, name } of member.presence.activities) {
      if (ApplicationIDs[applicationID]) return ApplicationIDs[applicationID]
      if (States[state]) return States[state]
      if (Names[name]) return Names[name]
    }
  }

  findGameByPlayingRole (member: GuildMember, ignoreGame?: Games): Games {
    let result: Games | null = null
    const entries = Object.entries(PlayingRoleIDs)
    for (const { id } of member.roles.cache.values()) {
      const game = entries.find(e => e[1] === id)
      if (game) {
        if (game[0] === ignoreGame) continue
        result = game[0] as Games
        break
      }
    }
    return result
  }

  isPlayingGame (member: GuildMember, game: Games) {
    return member.presence.activities.some(act =>
      ApplicationIDs[act.applicationID] === game ||
      States[act.state] === game ||
      Names[act.name] === game
    )
  }

  handleGameRole () {
    const guild = this.guilds.cache.get(GuildId)
    guild.members.cache.forEach(member => {
      if (member.user.bot) return

      const playingGame = this.findGameByPlaying(member)

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

      const playingRole = this.findGameByPlayingRole(member, playingGame)
      if (playingRole && !this.isPlayingGame(member, playingRole)) {
        member.roles.remove(PlayingRoleIDs[playingRole])
      }
    })
  }
}
