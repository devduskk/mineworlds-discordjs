const Command = require('../structures/Command'),
    { MessageEmbed } = require('discord.js'),
    settings = require('quick.db'),
    moment = require("moment");
        require("moment-duration-format")
        moment.locale("pt-BR")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['serverinfo'],
            enabled: true,
            guildOnly: false,
            ownerOnly: false,
        })
    }

    async run(message, args) {

        var desc = settings.fetch(`svdesc_${message.guild.id}`)
        if (desc === null) desc = 'A descrição ainda não foi definida.';

        let canaistexto = message.guild.channels.cache.filter(a => a.type === "text").size;
        let canaisvoz = message.guild.channels.cache.filter(a => a.type === "voice").size;

        const serverinfo = new MessageEmbed()

        serverinfo.setAuthor(`Clique aqui para ser redirecionado ao site do BhowkMC`, this.client.user.displayAvatarURL({ dynamic: true }), 'https://shop.bhwokmc.com.br/')
        serverinfo.setColor("#ffbb00")
        serverinfo.setDescription(`📀 Nome: **${message.guild.name}**\n📋 ID: **${message.guild.id}**\n\n:crown: Criado por: ${message.guild.owner} (**ID**: ${message.guild.owner.id})\n👥 Quantidade de membros: **${message.guild.memberCount} membros**\n💬 Quantidade de canais: **${canaistexto + canaisvoz} canais**\n\n🔻 **Descrição do servidor**: \`\`\`asciidoc\n* ${desc}\`\`\`\n:calendar: Você entrou aqui em: **${moment(message.member.joinedAt).format(`LLL`)}**\n:pushpin: Eu entrei aqui em: **${moment(this.client.user.joinedAt).format(`LLL`)}**`)
        serverinfo.setThumbnail(this.client.user.displayAvatarURL({ dynamic: true }))
        

        message.channel.send(serverinfo)
    }
}
