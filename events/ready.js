module.exports = async function Ready () {
  try {
    const ReadyLog = [
      'Estou online!',
            `meu nome é ${this.user.username}`,
            `atualmente em ${this.guilds.size}`,
            'meus servidores:',
            this.guilds.map((guild) => `${guild.name} com ${guild.members.size} membros`).join('\n')
    ]

    console.log(ReadyLog.join('\n'))

    const status = await this.user.setPresence({ status: 'dnd', activity: { name: 'PPSSPP' } })

    if (status) {
      console.log('mudei de status para: ' + status.activity.name)
    }
  } catch (error) {
    console.error(error)
  }
}
