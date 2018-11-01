module.exports = function presenceUpdate(oldMember, newMember) {
    const PPSSPP = '335581224972320768';
    let Arca = this.guilds.get('323999635993657344');

    if (oldMember.user.bot) return;


    if (Arca) {
        let userArca = Arca.members.get(oldMember.id);
        if (userArca && newMember.presence.game && newMember.presence.game.name === 'PPSSPP') {
            userArca.addRole(PPSSPP);
        }

        if (userArca && (oldMember.presence.game && oldMember.presence.game.name == 'PPSSPP') && (!newMember.presence.game || (newMember.presence.game && newMember.presence.game.name !== 'PPSSPP'))) {
            userArca.removeRole(PPSSPP);
        }
    }

} 