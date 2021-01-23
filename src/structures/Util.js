const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const Command = require('./Command');
const Events = require('../structures/Event');

module.exports = class Util {

    constructor(client) {
        this.client = client;
    }

    isClass(input) {
        return typeof input === 'function' &&
        typeof input.prototype === 'object' &&
        input.toString().substring(0, 5) === 'class';
    }

    get directory() {
        return `${path.dirname(require.main.filename)}${path.sep}`
    }

    async checkOwner(target) {
        return this.client.owners.includes(target.id)
    }

    comparePerms(member, target) {
        return member.roles.highest.position < target.roles.highest.position
    }

    formatArray(array, type = 'conjunction') {
        return new Intl.ListFormat('en-GB', { style: 'short', type: type }).format(array);
    }

    async loadCommands() {
        return glob(`${this.directory}src/Command/**/*.js`).then(commands => {
            for (const commandFile of commands) {
                delete require.cache[commandFile];
                const { name } = path.parse(commandFile);
                const File = require(commandFile);
                if (!this.isClass(File)) throw new Error(`The command ${name} doesn't export the Commands class.`)
                const command = new File(this.client, name.toLowerCase());
                if (!(command instanceof Command)) throw new TypeError(`The command ${name} isn't in the Commands directory.`);
                this.client.commands.set(command.name, command);
                if (command.aliases.length) {
                    for (const alias of command.aliases) {
                        this.client.aliases.set(alias, command.name)
                    }
                }
            }
        })
    }

    async loadEvents() {
        return glob(`${this.directory}src/Events/**/*.js`).then(events => {
            for (const eventFile of events) {
                delete require.cache[eventFile];
                const { name } = path.parse(eventFile);
                const File = require(eventFile);
                if (!this.isClass(File)) throw new TypeError(`The event ${name} doesn't export the Events class.`);
                const events = new File(this.client, name);
                if (!(events instanceof Events)) throw new TypeError(`The event ${name} isn't in the Events directory.`);
                this.client.events.set(events.name, events);
                events.emitter[events.type](name, (...args) => events.run(...args));
            }
        })
    }

}
