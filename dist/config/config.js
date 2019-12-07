"use strict";Object.defineProperty(exports, "__esModule", {value: true}); const guildId = process.env.GUILD_ID || '323999635993657344'; exports.guildId = guildId
 const voiceChannelCreatorId = process.env.VOICE_CHANNEL_CREATOR_ID || '511965999839576082'; exports.voiceChannelCreatorId = voiceChannelCreatorId
 const voiceCategoryId = process.env.VOICE_CATEGORY_ID || '652622719203934221'; exports.voiceCategoryId = voiceCategoryId
 const fullAwardRoleId = process.env.FULL_AWARD_ROLE_ID || '361277334118203402'; exports.fullAwardRoleId = fullAwardRoleId
 const playingRoleIds = {
  ppsspp: process.env.PPSSPP_PLAYING_OLE_ID || '335581224972320768',
  mhfu: process.env.MHFU_PLAYING_ROLE_ID || '652619091248545802',
  mhp3rd: process.env.MH3RD_PLAYING_ROLE_ID || '356645279413567489',
  mhw: process.env.MHW_PLAYING_ROLE_ID || '392797213752950784',
  mho: process.env.MHO_PLAYING_ROLE_ID || '340194860529221633'
}; exports.playingRoleIds = playingRoleIds
 const mhRoleIds = {
  mhfu: process.env.MHFU_ROLE_ID || '339206452482670592',
  mhp3rd: process.env.MH3RD_ROLE_ID || '339206693135319041',
  mhw: process.env.MHW_ROLE_ID || '339206451723501570',
  mho: process.env.MHO_ROLE_ID || '339206697987866627'
}; exports.mhRoleIds = mhRoleIds
 const appIds = {
  mhw: '477152881196269569',
  ppsspp: '423397985041383434'
}; exports.appIds = appIds
 const states = {
  mhfu: ['MONSTER HUNTER FREEDOM UNITE™'],
  mhp3rd: ['MONSTER HUNTER PORTABLE 3rd HD Ver.']
}; exports.states = states
