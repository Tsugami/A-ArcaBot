"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _config = require('../config/config');

 async function manageRole (member, roleId, option) {
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
} exports.manageRole = manageRole;

 async function manageMonsterHunterRoles (member, option) {
  if (member.user.bot || !member.presence.game || !member.presence.game.applicationID) return
  const fn = (roleId) => manageRole(member, roleId, option)
  switch (member.presence.game.applicationID) {
    case _config.appIds.mhw:
      await fn(_config.mhRoleIds.mhw)
      await fn(_config.playingRoleIds.mhw)
      break

    case _config.appIds.ppsspp: {
      const oldState = member.presence.game.state
      if (!oldState) return
      const mh = Object.entries(_config.states).find(val => val[1].includes(oldState))
      if (mh) {
        fn(_config.playingRoleIds[mh[0]])
        fn(_config.mhRoleIds[mh[0]])
      } else {
        fn(_config.playingRoleIds.ppsspp)
      }
      break
    }
  }
} exports.manageMonsterHunterRoles = manageMonsterHunterRoles;
