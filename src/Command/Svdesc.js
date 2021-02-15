const Command = require('../structures/Command');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['svdesc'],
            enabled: true,
            description: 'Command used to enter the server description.',
            category: 'Utility',
            usage: '\`svdesc\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message, args) {
        message.delete();

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("OOPS! It looks like you don't have enough permission.").then(async (msg) => {
            await msg.delete({ timeout: 5 * 1000 });
        });

        var serverDescription = args.join(" ");
        if(serverDescription) return message.channel.send(`Success! The server description has been set correctly.`).then(async (msg) => {
            await msg.delete({ timeout: 5 * 1000 });
        });
        db.set(`svdesc_${message.guild.id}`, serverDescription);
    }
}
