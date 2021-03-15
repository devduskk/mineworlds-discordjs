const Command = require('../structures/Command'),
    { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['avatar'],
            enabled: true,
            guildOnly: false,
            ownerOnly: false,
        })
    }

    async run(message, args) {
        const embed = new MessageEmbed()
        let avatar = message.author.displayAvatarURL({size: 2048, dynamic: true});

        if (!message.mentions.users.first()){

            embed.setAuthor(`Clique aqui para baixar a imagem de ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }), avatar)
            embed.setImage(avatar)
            embed.setColor("#ffbb00")

            return message.channel.send(embed)

        } else {

            const user = message.mentions.users.first()
            let avatar = user.displayAvatarURL({size: 2048, dynamic: true});

            embed.setAuthor(`Clique aqui para baixar a imagem de ${user.tag}`, user.displayAvatarURL({ dynamic: true }), avatar)
            embed.setImage(avatar)
            embed.setColor("#ffbb00")

            return message.channel.send(embed)
        }
    }
}
