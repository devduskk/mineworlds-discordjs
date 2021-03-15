const Command = require('../structures/Command'),
    { MessageEmbed } = require('discord.js'),
    config = require('../../config.json');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['painel'],
            enabled: true,
            guildOnly: false,
            ownerOnly: false,
        })
    }

    async run(message, args) {
        message.delete()
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            const channel = message.guild.channels.cache.find(chan => chan.id === config.painel_channelID)
            const icon = "https://cdn.discordapp.com/attachments/569290453506064384/779195443820888134/full-trophy_0.png"

            channel.send(new MessageEmbed().setDescription("Olá aventureiro(a), parece que você está com alguma dúvida ou com um problema, estou certo? Bom, nós estamos aqui para lhe ajudar em qualquer coisa, até porque, nós somos uma família de aventureiros.\n\n\`\`\`Para você abrir um canal de atendimento é bem simples, basta clicar no emoji abaixo e o canal será criado.\`\`\`").setColor(config.orange).setThumbnail(icon).setTimestamp(new Date()).setFooter("BhowkMC", this.client.user.displayAvatarURL({ dynamic: true }))).then(async (msg) => {
                await msg.react("🌴");

                this.client.on('messageReactionAdd', async (reaction, user) => {
                    const member = message.guild.members.cache.get(user.id)
                if (reaction.emoji.name === '🌴' && user.id === member.id) {
                    reaction.users.remove(user.id)
                    const categoryID = "819374965421506582"
                        message.guild.channels.create(`🌴│ticket-${user.username.toLowerCase()}-${user.discriminator}`, 'text').then((chan) => {
                            chan.setParent(categoryID).then((settedparent) => {
                                settedparent.updateOverwrite(message.guild.roles.everyone, {
                                    SEND_MESSAGES: false,
                                    VIEW_CHANNEL: false
                                })
                                settedparent.updateOverwrite(user, {
                                    SEND_MESSAGES: true,
                                    VIEW_CHANNEL: true,
                                    ATTACH_FILES: true,
                                    EMBED_LINKS: true
                                });
                            });

                            chan.send(new MessageEmbed().setDescription("Olá aventureiro(a), estamos aqui para te ajudar com a sua dúvida ou com o seu problema. Para agilizar o atendimento, diga abaixo qual é o problema ou dúvida que você está tendo.\n\n\`\`\`O tempo estimado para você ser atendido é de até 5 minutos ou mais, dependendo da quantidade de ticket.\`\`\`").setColor(config.orange).setTimestamp(new Date()).setThumbnail(icon))
                        });
                    };
                });
            });
        } else {
            message.channel.send("Eita! Parece que você não tem permissão suficiente.").then(async (msg) => {
                await msg.delete({ timeout: 5 * 1000 })
            });
        }
    }
}
