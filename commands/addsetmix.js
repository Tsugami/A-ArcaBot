const {RichEmbed} = require('discord.js');
const types = ['skills', 'parts', 'recommended weapons'];
const messages = [
    "write the skills below",
    "write the parts",
    "write the recommended weapons or `not`"
]
class AddSetMix {
    constructor(name, client, category){
        this.argsRequired = true;
        this.usage = '[set name]'; 
    }

    async collector(message, embed, msg, msg2, type, count) {
        return message.channel.awaitMessages(((m) => m.author.id === message.author.id), {max: 1, time: 60000, erros: ["time"]})
            .then(async (c) => {
                c = c.first();

                if (c.content.toLowerCase() === 'cancel') {
                    msg2.delete();
                    msg.delete();
                    message.channel.send('command canceled :(');
                    
                } else if (type === 'image') {
                    try {
                        embed.setImage(c.content);
                        msg.edit(embed);
                        c.delete();
                        msg2.delete();
                        msg2 = await message.channel.send('send to skills');
                        this.collector(message, embed, msg, msg2, 'skills', count++); 
                        
                    } catch (e) {
                        message.channel.send("image was not recognized");
                        
                    }
                } else {
                    if (type === 'recommended weapons' && c.content.toLowerCase() !== 'not') {
                        embed.addField('▶ ' + type.split(' ').map(l => l.capitalize()).join(' '), c.content.replace(/,/g, '\n'));
                    } else {
                        embed.addField('▶ ' + type.capitalize(), c.content.replace(/,/g, '\n'));
                    }
                    msg.edit(embed);
                    c.delete();
                    msg2.delete();
                    if (type !== 'recommended weapons') msg2 = await message.channel.send(messages[types.indexOf(type) + 1]);
                    console.log
                    if (count === 3) {
                        msg2.delete();
                        message.channel.send('ready?');
                    } else {
                        this.collector(message, embed, msg, msg2, types[types.indexOf(type) + 1], count++);
                    }
                    
                    
                }

            })
            .catch((e) => {
                console.log(e)
                msg.delete();
                message.channel.send(`<@${message.author.id}>, You did not wrote the \`${type}\`. :(`);
            })
    }
    async run(message, args) {
        let embed = new RichEmbed()
            .setTitle(args.join(' '))
            .setFooter(message.author.tag, message.author.avatarURL);
        let msg = await message.channel.send(embed);
        let msg2 = await message.channel.send('send image');
        this.collector(message, embed, msg, msg2, 'image', 0)
    }
}

module.exports = {
    hidden: false
}