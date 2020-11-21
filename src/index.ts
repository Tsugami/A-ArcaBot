import ArcaClient from './structures/ArcaClient'

const client = new ArcaClient()

client.login(process.env.TOKEN)
