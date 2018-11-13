module.exports = async function StateUpdate(oldState, newState) {
    try{
        let category_name = '● < # GH >'
        let gh = newState.guild.channels.find(channel => channel.name === category_name);

        if (newState.channel && newState.channel.name.toLowerCase() === 'crie uma hall!') {
            if (!gh) gh = await newState.guild.channels.create(category_name, {type: 'category'}); 

            let channel = await newState.guild.channels.create(
                'Gathering Hall ' + (gh.children.array().length === 0 ? 1 : gh.children.array().length + 1),
                {
                    userLimit: 4,
                    type: 'voice',
                    parent: gh
                });
            await newState.member
            .setVoiceChannel(channel);
        }

        if (gh && (oldState.channel && oldState.channel.parent && oldState.channel.parent.name === gh.name)) {
            
            let names = gh.children.map(c => Number(c.name.replace('Gathering Hall ', '')));
            let namesSe = names.map((x, a) => a + 1);
            console.log(names, namesSe)
            if (names !== namesSe) {
                gh.children.array().forEach((c, x) => c.edit({name: 'Gathering Hall ' + (x + 1)}));
            }

            if (oldState.channel.members.array().length === 0) {
                await oldState.channel.delete();

                if (gh.children.array().length === 0 || gh.children.every(c => c.members.array().length === 0)) {
                    await gh.delete();
                }
            }
        }
    } catch(Erro) {
        console.error(Erro);
    }
}