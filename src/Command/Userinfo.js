const Command = require('../structures/Command');
const { MessageEmbed } = require('discord.js');
const { orange } = require('../../config.json');
const db = require('quick.db');
const moment = require("moment")
require("moment-duration-format")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['userinfo'],
            enabled: true,
            description: 'Command used to verify user information.',
            category: 'Utility',
            usage: '\`userinfo\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message, args) {
        var desc = db.fetch(`setdesc_${message.author.id}`)
        if (desc === null) desc = 'Undefined.';

        var avatar = message.author.displayAvatarURL({size: 2048, dynamic: true});
        var embed = new MessageEmbed();

        var membro = message.author;

        let badges = await membro.flags
        badges = await badges.toArray();

        let newbadges = [];
        badges.forEach(m => {
            newbadges.push(m.replace("_", " "))
    })


        if (!message.mentions.users.first()) {
            embed.setAuthor(`${membro.username}'s Profile information`, membro.displayAvatarURL({ dynamic: true }), avatar)
            embed.setColor(orange)
            embed.setDescription(`📀 Name: **${membro.username}**\n📋 ID: **${membro.id}**\n\n🔹 Level: \`System currently unavailable.\`\n🔸 XP: \`System currently unavailable.\`\n🪙 Coins: **0**\n\n:handbag: Badges: **${newbadges.join(", ") || "None"}**\n\n🔻 Description: \`\`\`asciidoc\n- ${desc}\`\`\`\n🔴 Infractions: \`\`\`asciidoc\n- System currently unavailable\`\`\`\n\n📆 Account created in: **${moment(membro.createdAt).format('LLL')}**\n:pushpin: Joined here in **${moment(membro.joinedAt).format('LLL')}**`)
            embed.setThumbnail(avatar)

            message.channel.send(embed);
        } else {
            var user = message.mentions.users.first()
            var avatar = user.displayAvatarURL({size: 2048, dynamic: true});

            var descc = db.fetch(`setdesc_${user.id}`)
            if (descc === null) descc = 'Undefined';

            let badges = await user.flags
        badges = await badges.toArray();

        let newbadges = [];
        badges.forEach(m => {
            newbadges.push(m.replace("_", " "))
    })

            embed.setAuthor(`${user.username}'s Profile Information`, user.displayAvatarURL({ dynamic: true }), avatar)
            embed.setColor(orange)
            embed.setDescription(`📀 Name: **${user.username}**\n📋 ID: **${user.id}**\n\n🔹 Level: \`System currently unavailable.\`\n🔸 XP: \`System currently unavailable.\`\n🪙 Coins: **0**\n\n:handbag: Badges: **${newbadges.join(", ") || "None"}**\n\n🔻 Description: \`\`\`asciidoc\n- ${descc}\`\`\`\n🔴 Infractions: \`\`\`asciidoc\n- System currently unavailable.\`\`\`\n\n📆 Account created in: **${moment(user.createdAt).format('LLL')}**\n:pushpin: Joined here in: **${moment(user.joinedAt).format('LLL')}**`)
            embed.setThumbnail(avatar)

            message.channel.send(embed);
        }
    }
}
