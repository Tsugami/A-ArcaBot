module.exports = async function messageCreate(message) {
    const PREFIXES = ['!', `<@!${this.user.id}>`];
    if (message.guild.id === this.ARCAID && message.author.bot === false) {
        let args = message.content.split(' ');
        let prefix = PREFIXES.find((p) => message.content.startsWith(p));
        if (prefix && this.commands[args[0].slice(prefix.length)]) {
            Object.defineProperty(message, 'prefix', {value: prefix});
            return this.commands[args[0].slice(prefix.length)].run(message, args.slice(1), this, await this.guilds.get(this.ARCAID));
        }
    }
}   