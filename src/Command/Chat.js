const Command = require('../structures/Command');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['chat'],
            enabled: true,
            description: 'Command used to lock or unlock a channel.',
            category: 'Utility',
            usage: '\`chat\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message, args) {
        message.delete();

        if (args[0] === "on") {

        message.channel.updateOverwrite(message.guild.roles.everyone, {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true
        });

        message.channel.send(`Our chats were activated again by the moderator ${message.author}.`).then(async (msg) => {
            await msg.delete({ timeout: 5 * 1000 })
        });
        }

        if (args[0] === "off") {
            message.channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: false,
                VIEW_CHANNEL: true
            });

            message.channel.send(`Chat has been disabled by the moderator ${message.author}, wait for us to return to active with our chats!`).then(async (msg) => {
                await msg.delete({ timeout: 5 * 1000 })
            });
        }

        if (!args[0]) return message.channel.send("OOPS! It looks like you didn't enter an argument, young adventurer.").then(async (msg) => {
            await msg.delete({ timeout: 5 * 1000 })
        });
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send("OOPS! It looks like you don't have enough permission.").then(async (msg) => {
            await msg.delete({ timeout: 5 * 1000 })
        });
    }
}
