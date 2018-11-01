const Color = require('Color');
const {RichEmbed} = require('discord.js');

module.exports = {
    guildID: '323999635993657344',
    usage: '[color hex]',
    argsRequired: true,
    description: 'Alterar sua cor no grupo, apenas full awards',
    async run(message, args) {
        try {
            let fullAward = message.guild.roles.find(r => r.id === '361277334118203402'); 

            if (!message.member.roles.find(role => role.id === fullAward.id)) {
                return;
            }

            let color = Color(args.join(' '));
            let embed = new RichEmbed().setColor(color.rgbNumber()).setDescription('Essa cor que você quer?');
            let msg = await message.channel.send(embed);

            msg.react('🇸');
            msg.react('🇳');

            const filter = (reaction, user) => (reaction.emoji.name === '🇸' || reaction.emoji.name === '🇳') && user.id === message.author.id;
            let collect = msg.createReactionCollector(filter, {time: 15000, max: 1, error: ['time']});

            collect.on('collect', async (c) => {
                switch (c.emoji.name) {
                    case '🇸':
                        let role = message.member.roles.find(r => r.name === message.author.id);
                        
                        if (!role) {
                            role = await message.guild.createRole({
                                name: message.member.id
                            });
                            message.member.addRole(role.id);
                        }

                        if (role.position < fullAward.position) {
                            role.setPosition(fullAward.position+1);
                        }

                        role.edit({color: color.rgbNumber()})
                            .then(() => {
                                msg.delete();
                                message.channel.send(`Cor alterada para \`${color.rgbNumber()}\`!`);
                            })
                            .catch((e) => {
                                console.log(e);
                                message.channel.send('erro');
                            });
                        
                        break;
                    
                    case '🇳':
                            msg.delete();

                        break;
                    default:
                        break;
                }
            });

            collect.on('error', () => msg.delete());
        } catch (error) {
            console.error(error);
            message.channel.send('Essa cor não existe!');
        }
        }
}