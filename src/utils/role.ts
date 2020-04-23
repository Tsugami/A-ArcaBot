import { GuildMember } from 'discord.js'
import { Games, ApplicationIDs, PlayingRoleIDs, States, Names } from '../constants'

export default class RoleUtil {
  static findGameByPlaying (member: GuildMember): Games | null {
    for (const { applicationID, state, name } of member.presence.activities) {
      if (ApplicationIDs[applicationID]) return ApplicationIDs[applicationID]
      if (States[state]) return States[state]
      if (Names[name]) return Names[name]
    }
  }

  static findGameByPlayingRole (member: GuildMember, ignoreGame?: Games): Games {
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

  static isPlayingGame (member: GuildMember, game: Games) {
    return member.presence.activities.some(act =>
      ApplicationIDs[act.applicationID] === game ||
      States[act.state] === game ||
      Names[act.name] === game
    )
  }
}
