const Command = require('../structures/Command'),
    { MessageEmbed } = require('discord.js'),
    { orange } = require('../../config.json'),
    { promptMessage } = require("../../functions.js"),
    settings = require('quick.db');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ban'],
            enabled: true,
            guildOnly: false,
            ownerOnly: false,
        })
    }

    async run(message, args) {
        message.delete();

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("você não tem permissão para utilizar este comando.")
                .then(m => m.delete(5000));
        
        }

        let Channel = message.guild.channels.cache.find(chan => chan.id === "799406316719308844")
        let Avatar = this.client.user.displayAvatarURL({ dynamic: true })

        let User = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!User) {
            return message.reply("usuário não encontrato.")
                .then(m => m.delete({timeout: 5 * 1000}));
        }

        if (User.hasPermission("BAN_MEMBERS")) return message.reply("eu não posso banir esse usuário.").then(m => m.delete({timeout: 5 * 1000}));

        message.channel.send(new MessageEmbed()
        
        .setDescription(`Selecione um motivo para que a punição possa ser aplicada ao usuário ${User}:\n\n\`#1\` - Divulgação de servidores ou links;\n\`#2\` - Conteúdo +18 em canais públicos;\n\`#3\` - Infração de um regulamento do servidor (#regras)\n\`#4\` - Outros motivos;\n\nPara aplicar a punição ao usuário, digite o ID do motivo e a punição será aplicada. Depois, basta confirmar o banimento!`)
        .setColor("36393e")).then(async (msg) => {
            await msg.delete({ timeout: 15 * 1000 })
        })

        let br1 = message.channel.createMessageCollector(a => a.author.id == message.author.id, {
            max: 1
          })

          var ans = { "#1": "Divulgação de servidores ou links.", "#2": "Conteúdo +18 em canais públicos.", "#3": "Infração de um regulamento do servidor (#regras).", "#4": "Outros motivos." }

          br1.on('collect', async r => {

            const banReason = ans[r]
            const banEmbed = new MessageEmbed()
            
            banEmbed.setAuthor(`Aventureiro(a) banido(a) do servidor!`, this.client.user.displayAvatarURL({ dynamic: true }), Avatar)
            banEmbed.setColor(orange)
            banEmbed.setDescription(`\`\`\`\n- Aventureiro(a): ${User.user.tag} (ID: ${User.id})\n- Autor da punição: ${message.author.tag}\n- Motivo: ${banReason_1}\`\`\``)

            const promptEmbed = new MessageEmbed()
            .setColor("36393e")
            .setDescription(`Será aplicado uma punição de banimento no(a) aventureiro(a) ${User}, deseja confirmar?`)

        await message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                msg.delete();

                User.ban({ reason: banReason })
                    .catch(err => {
                        if (err) return message.channel.send(`Erro: ${err}`)
                    });

                if (settings.get(`${User.id}-bans_count`) !== "null") {
                        settings.add(`${User.id}-bans_count`, 1);
                     } else {
                       settings.set(`${User.id}-bans_count`, 1);
                     }
                Channel.send(banEmbed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`banimento cancelado.`)
                    .then(m => m.delete({timeout: 5000}));
                }
            }); 
        });
    }
}
