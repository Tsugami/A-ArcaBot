const { Client, Collection } = require("discord.js");
const fs = require('fs');

class Arca extends Client {
    constructor(arcaID, core, options = {}) {
        super(options);
        this.core = core;
        this._arcaID = arcaID;
        this.commands = new Collection();
    }

    get me() {
        return this.guilds.get(this._arcaID) || null;
    }
    
    addCommands(COMMAND_FOLDER) {
        fs.readdirSync(COMMAND_FOLDER)
        .forEach((file) => {
            try {
                if (file.endsWith('.js')) {
                    const command_name = file.replace(/.js/g, '');
                    if (!this.commands.get(command_name)) {
                        let command = require(COMMAND_FOLDER + file);
                        if (command.hidden === true) console.log('comando ', command_name, 'não foi adicionado');
                            else this.commands.set(command_name, command);
                    }
                }
            } catch (error) {
                console.error(file, error);
            }
        });
    }

    addListeners(EVENT_FOLDER) {
        fs.readdirSync(EVENT_FOLDER)
        .forEach((file) => {
            try {
                if (file.endsWith('.js')) {
                    const event_name = file.replace(/.js/g, '');
                    const Listener = require(EVENT_FOLDER + file);
                    this.on(event_name, Listener);
                }
            } catch (error) {
                console.error(file, error);
            }
        });
    }

}

module.exports = Arca;