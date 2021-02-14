const Command = require('../structures/Command');
const { MessageEmbed } = require('discord.js');
const db = require('quick.db');
const moment = require("moment")
require("moment-duration-format")
moment.locale("en-US")

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['serverinfo'],
            enabled: true,
            description: 'Command used to verify server information.',
            category: 'Utility',
            usage: '\`serverinfo\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message, args) {

        var desc = db.fetch(`svdesc_${message.guild.id}`)
        if (desc === null) desc = 'Undefined.';

        let canaistexto = message.guild.channels.cache.filter(a => a.type === "text").size;
        let canaisvoz = message.guild.channels.cache.filter(a => a.type === "voice").size;

        const serverinfo = new MessageEmbed()

        serverinfo.setAuthor(`Click here to be redirected to the site`, this.client.user.displayAvatarURL({ dynamic: true }), 'WEBSITE LINK HERE')
        serverinfo.setColor("#ffbb00")
        serverinfo.setDescription(`📀 Server Name: **${message.guild.name}**\n📋 ID: **${message.guild.id}**\n\n:crown: Created by: ${message.guild.owner} (**ID**: ${message.guild.owner.id})\n👥 Number of members: **${message.guild.memberCount} members**\n💬 Number of channels: **${canaistexto + canaisvoz} channels**\n\n🔻 **Description of the server**: \`\`\`asciidoc\n* ${desc}\`\`\`\n:calendar: You joined here in: **${moment(message.member.joinedAt).format(`LLL`)}**\n:pushpin: I joined here in: **${moment(this.client.user.joinedAt).format(`LLL`)}**`)
        serverinfo.setThumbnail(this.client.user.displayAvatarURL({ dynamic: true }))
        

        message.channel.send(serverinfo)
    }
}
