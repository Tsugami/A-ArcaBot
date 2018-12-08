module.exports = async function messageCreate(message) {
    const PREFIXES = ['!', `<@!${this.user.id}>`];
    const prefix = PREFIXES.find((p) => message.content.startsWith(p));
    if (prefix && message.guild.id === this.me.id && !message.author.bot) {
        let args = message.content.split(' ');
        console.log(args, args[0])
        let command = this.commands.get(args.shift().slice(prefix.length).toLowerCase());
        console.log(args, args.shift())
        if (prefix && command) {
            Object.defineProperty(message, 'prefix', {value: prefix});
            return command.run(message, args, this, await this.guilds.get(this.ARCAID));
        }
    }
}   