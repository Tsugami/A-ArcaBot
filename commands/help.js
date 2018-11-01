module.exports = {
    async run(message, args, bot) {
        try {
            let commands = '';
            for (const command in bot.commands) {
                if (command !== 'help') commands += `**${message.prefix+command} - ${bot.commands[command].description ? bot.commands[command].description : 'Sem descrição'}**\n`;
            }
            await message.channel.send(commands);
        } catch (error) {
            console.error(error);
        }
    }
}