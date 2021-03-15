
const Event = require('../structures/Event');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            once: true
        })
    }

    async run() {

        const activities = [`🛒 shop.bhowkmc.com.br`, `play.bhowkmc.com.br 🎮`, `👥 ${this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} aventureiros(a)!`];
    
        let i = 0;
        setInterval(() => this.client.user.setActivity(`${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 15000);

        console.log([
            `Online!`,
			`Commands: ${this.client.commands.map(cmd => cmd.name).join(', ')}`,
			`Events: ${this.client.events.map(evt => evt.name).join(', ')}`
        ].join(`\n`));
    }
};
