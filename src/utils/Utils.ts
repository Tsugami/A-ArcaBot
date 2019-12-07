import { GuildMember } from 'discord.js'
import { mhRoleIds, appIds, playingRoleIds, states } from '../config/config'

export async function manageRole (member: GuildMember, roleId: string, option: 'add' | 'remove') {
  if (option === 'add' && member.roles.has(roleId)) return
  if (option === 'remove' && !member.roles.has(roleId)) return

  try {
    await member[option + 'Role'](roleId)
    const roleName = member.guild.roles.get(roleId).name
    const msg = option === 'remove' ? 'removed' : 'added'
    console.log(`${roleName} role ${msg} on ${member.user.tag} member`)
  } catch (error) {
    console.error(`Unable to ${option} role (${roleId}) to member (${member.id}): ${error}`)
  }
}

export async function manageMonsterHunterRoles (member: GuildMember, option: 'add' | 'remove') {
  if (member.user.bot || !member.presence.game || !member.presence.game.applicationID) return
  const fn = (roleId: string) => manageRole(member, roleId, option)
  switch (member.presence.game.applicationID) {
    case appIds.mhw:
      if (option === 'add') await fn(mhRoleIds.mhw)
      await fn(playingRoleIds.mhw)
      break

    case appIds.ppsspp: {
      const oldState = member.presence.game.state
      if (!oldState) return
      const mh = Object.entries(states).find(val => val[1].includes(oldState))
      if (mh) {
        if (option === 'add') fn(mhRoleIds[mh[0]])
        fn(playingRoleIds[mh[0]])
      } else {
        fn(playingRoleIds.ppsspp)
      }
      break
    }
  }
}
