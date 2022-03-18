# A Arca Bot

Discord bot for a server of friends who play monster hunter

## Getting Started

> Note: Node.js 16.12+ is required!

To run this project, install it locally using yarn:

```bash
yarn install
```

Copy .env.example file and change the bot token for your bot:

```bash
cp .env.example .env
```

Run project:

```bash
yarn dev
```

## How to add new games?

In the [configuration file](/src/config.ts) in the `games` property it must be added to the game with the correct activity of discord, the activity must be the same as the one returned by discord, you can see the activity structure [here](https://discord.com/developers/docs/game-sdk/activities#data-models-activity-struct).
