const Command = require('../structures/Command');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['avatar'],
            enabled: true,
            description: 'Command used to verify a user's avatar.',
            category: 'Utility',
            usage: '\`avatar\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message, args) {
        const embed = new MessageEmbed()
        let avatar = message.author.displayAvatarURL({size: 2048, dynamic: true});

        if (!message.mentions.users.first()){

            embed.setAuthor(`Click here to download the image of ${message.author.username}'s`, message.author.displayAvatarURL({ dynamic: true }), avatar)
            embed.setImage(avatar)
            embed.setColor("#ffbb00")

            return message.channel.send(embed)

        } else {

            const user = message.mentions.users.first()
            let avatar = user.displayAvatarURL({size: 2048, dynamic: true});

            embed.setAuthor(`Click here to download the image of ${user.username}'s`, user.displayAvatarURL({ dynamic: true }), avatar)
            embed.setImage(avatar)
            embed.setColor("#ffbb00")

            return message.channel.send(embed)
        }
    }
}
