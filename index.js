require('dotenv').config();

// MODULES
const Arca = require("./Arca.js");
const core = require('./core.json');
// CLIENT
const client = new Arca(core.arca_id, core);

client.addCommands(core.COMMAND_FOLDER);
client.addListeners(core.EVENT_FOLDER);

client.login(process.env.TOKEN);