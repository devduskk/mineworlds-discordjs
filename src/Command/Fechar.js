const Command = require('../structures/Command'),
    { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['fechar'],
            enabled: true,
            guildOnly: false,
            ownerOnly: false,
        })
    }

    async run(message, args) {
        if(message.channel.name.includes('ticket-')) {
            message.channel.delete();
        } else {
            return message.reply('Você não pode usar este comando aqui, apenas em um canal de ticket.');
        }
    }
}
