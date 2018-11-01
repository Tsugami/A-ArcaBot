// MODULES
const Discord = require("discord.js");
const fs = require('fs');

// VARS
const COMMAND_FOLDER = './commands/';
const EVENT_FOLDER = './events/';
const TOKEN = 'NTA3NTYwMTA1ODE1MDQ4MjEy.DryeHg.O8w8Mg8xKkaP7vVZsGVc2s5914k';

// CLIENT
const client = new Discord.Client();
Object.defineProperty(client, 'commands', { value: {} });
Object.defineProperty(client, 'ARCAID', { value: '323999635993657344' });

// ADD COMMANDS
fs.readdirSync(COMMAND_FOLDER)
    .forEach((file) => {
        try {
            if (file.endsWith('.js')) {
                const command_name = file.replace(/.js/g, '');
                if (!client.commands[command_name]) {
                    let command = require(COMMAND_FOLDER + file);
                    if (!command.hidden) client.commands[command_name] = command;
                }
            }
        } catch (error) {
            console.error(file, error);
        }
    });

// ADD EVENTS
fs.readdirSync(EVENT_FOLDER)
    .forEach((file) => {
        try {
            if (file.endsWith('.js')) {
                const event_name = file.replace(/.js/g, '');
                client.on(event_name, require(EVENT_FOLDER + file));
            }
        } catch (error) {
            console.error(file, error);
        }
    });


client.login(TOKEN);