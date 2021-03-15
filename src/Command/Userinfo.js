const Command = require('../structures/Command'),
    { MessageEmbed } = require('discord.js'),
    { orange } = require('../../config.json'),
    settings = require('quick.db'),
    moment = require("moment");
        require("moment-duration-format")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['userinfo'],
            enabled: true,
            guildOnly: false,
            ownerOnly: false,
        })
    }

    async run(message, args) {
        var desc = settings.fetch(`setdesc_${message.author.id}`)
        if (desc === null) desc = 'Indefinido.';

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
            embed.setAuthor(`Informações do perfil de ${membro.username}`, membro.displayAvatarURL({ dynamic: true }), avatar)
            embed.setColor(orange)
            embed.setDescription(`📀 Nome: **${membro.username}**\n📋 ID: **${membro.id}**\n\n🔹 Nível: \`Sistema indisponível no momento.\`\n🔸 XP: \`Sistema indisponível no momento.\`\n🪙 Coins: **0**\n\n:handbag: Badges: **${newbadges.join(", ") || "Nenhuma"}**\n\n🔻 Descrição: \`\`\`asciidoc\n- ${desc}\`\`\`\n🔴 Infrações: \`\`\`asciidoc\n- Sistema indisponível no momento.\`\`\`\n\n📆 Conta criada em: **${moment(membro.createdAt).format('LLL')}**\n:pushpin: Entrou aqui em: **${moment(membro.joinedAt).format('LLL')}**`)
            embed.setThumbnail(avatar)

            message.channel.send(embed);
        } else {
            var user = message.mentions.users.first()
            var avatar = user.displayAvatarURL({size: 2048, dynamic: true});

            var descc = settings.fetch(`setdesc_${user.id}`)
            if (descc === null) descc = 'Indefinido.';

            let badges = await user.flags
        badges = await badges.toArray();

        let newbadges = [];
        badges.forEach(m => {
            newbadges.push(m.replace("_", " "))
    })

            embed.setAuthor(`Informações do perfil de ${user.username}`, user.displayAvatarURL({ dynamic: true }), avatar)
            embed.setColor(orange)
            embed.setDescription(`📀 Nome: **${user.username}**\n📋 ID: **${user.id}**\n\n🔹 Nível: \`Sistema indisponível no momento.\`\n🔸 XP: \`Sistema indisponível no momento.\`\n🪙 Coins: **0**\n\n:handbag: Badges: **${newbadges.join(", ") || "Nenhuma"}**\n\n🔻 Descrição: \`\`\`asciidoc\n- ${descc}\`\`\`\n🔴 Infrações: \`\`\`asciidoc\n- Sistema indisponível no momento.\`\`\`\n\n📆 Conta criada em: **${moment(user.createdAt).format('LLL')}**\n:pushpin: Entrou aqui em: **${moment(user.joinedAt).format('LLL')}**`)
            embed.setThumbnail(avatar)

            message.channel.send(embed);
        }
    }
}
