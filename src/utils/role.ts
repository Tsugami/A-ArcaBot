import { GuildMember } from 'discord.js'
import { Games, ApplicationIDs, PlayingRoleIDs, States, Names } from '../constants'

export default class RoleUtil {
  static findGameByPlaying (member: GuildMember): Games | undefined {
    for (const { applicationID, state, name } of member.presence.activities) {
      if (Names[name]) return Names[name]
      if (state && States[state]) return States[state]
      if (applicationID && ApplicationIDs[applicationID]) return ApplicationIDs[applicationID]
    }
  }

  static findGameByPlayingRole (member: GuildMember, ignoreGame?: Games): Games | undefined {
    const entries = Object.entries(PlayingRoleIDs)
    for (const { id } of member.roles.cache.values()) {
      const game = entries.find(e => e[1] === id)
      if (game) {
        if (game[0] === ignoreGame) continue
        return game[0] as Games
      }
    }
  }

  static isPlayingGame (member: GuildMember, game: Games) {
    return member.presence.activities.some(({ name, state, applicationID }) =>
      Names[name] === game ||
      (state && States[state] === game) ||
      (applicationID && ApplicationIDs[applicationID] === game)
    )
  }
}
