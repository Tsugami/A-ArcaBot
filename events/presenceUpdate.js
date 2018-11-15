module.exports = async function presenceUpdate(oldUser, newUser) {
    try {   
        const PPSSPP = '335581224972320768';
        let Arca = this.guilds.get(this.me.id);
        let newPresence = newUser.presence.activity;
        let oldPresence = oldUser.presence.activity;
        if (oldUser.user.bot || newUser.user.bot) return;

        
        if (Arca && Arca.members.get(newUser.id)) {
            
            let userArca = Arca.members.get(newUser.id);
            
            if (newPresence && newPresence.name === 'PPSSPP' && oldPresence && oldPresence.name === 'PPSSPP') {
                if (!userArca.roles.get(PPSSPP)) {
                    await userArca.roles.add(PPSSPP);
                }
            
            } else {
                if (userArca.roles.get(PPSSPP)) {
                    await userArca.roles.remove(PPSSPP);
                }
            }
        }
    } catch(error) {
        console.error(error);
    }

} 