const client = require('./src/structures/BhowkMC');
const config = require('./config.json');

const BhowkMC = new client(config);
BhowkMC.start();
