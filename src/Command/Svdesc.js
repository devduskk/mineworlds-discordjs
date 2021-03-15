const Command = require('../structures/Command'),
    { MessageEmbed } = require('discord.js'),
    settings = require('quick.db');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['svdesc'],
            enabled: true,
            guildOnly: false,
            ownerOnly: false,
        })
    }

    async run(message, args) {
        message.delete();

        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Eita! Parece que você não tem permissão suficiente.").then(async (msg) => {
            await msg.delete({ timeout: 5 * 1000 });
        });

        var messager = args.join(" ");
        message.channel.send(`Sucesso! A descrição do servidor foi setada corretamente.`).then(async (msg) => {
            await msg.delete({ timeout: 5 * 1000 });
        });
        settings.set(`svdesc_${message.guild.id}`, messager);
    }
}
