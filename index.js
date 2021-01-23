const client = require('./src/structures/MineWorlds');
const config = require('./config.json');

const mineworlds = new client(config);
mineworlds.start();