const Command = require('../structures/Command');
const { MessageEmbed } = require('discord.js');
const { orange } = require('../../config.json');
const { promptMessage } = require("../../functions.js");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['ban'],
            enabled: true,
            description: 'Command used to ban a user from the server.',
            category: 'Moderative',
            usage: '\`ban\`',
            guildOnly: false,
            ownerOnly: false,
            nsfw: false,
            args: false,
            cooldown: 5000
        })
    }

    async run(message, args) {
        message.delete();

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("you are not allowed to use this command.")
                .then(m => m.delete(5000));
        
        }

        let Channel = message.guild.channels.cache.find(chan => chan.id === "CHANNEL ID HERE")
        let Avatar = this.client.user.displayAvatarURL({ dynamic: true })

        let User = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!User) {
            return message.reply("user not found.")
                .then(m => m.delete({timeout: 5 * 1000}));
        }

        if (User.hasPermission("BAN_MEMBERS")) return message.reply("I cannot ban this user.").then(m => m.delete({timeout: 5 * 1000}));

        message.channel.send(new MessageEmbed()
        
        .setDescription(`Select a reason why the punishment can be applied to the user ${User}:\n\n\`#1\` - Disclosure of servers or links;\n\`#2\` - +18 content on public channels;\n\`#3\` - Infringement of a server policy (#rules)\n\`#4\` - Other reasons;\n\nTo apply the punishment to the user, enter the reason ID and the punishment will be applied. Then just confirm the ban!`)
        .setColor("36393e")).then(async (msg) => {
            await msg.delete({ timeout: 15 * 1000 })
        })

        let br1 = message.channel.createMessageCollector(a => a.author.id == message.author.id, {
            time: 60000 * 5,
            max: 1
          })

          br1.on('collect', async r => {

        if(r.content.toLowerCase() === "#1") {
            const banReason_1 = "Disclosure of servers or links"
            const banEmbed = new MessageEmbed()
            
            banEmbed.setAuthor(`Adventurer banned from the server!`, this.client.user.displayAvatarURL({ dynamic: true }), Avatar)
            banEmbed.setColor(orange)
            banEmbed.setDescription(`\`\`\`\n- Adventurer: ${User.user.tag} (ID: ${User.id})\n- Staff: ${message.author.tag}\n- Reason: ${banReason_1}\`\`\``)

            const promptEmbed = new MessageEmbed()
            .setColor("36393e")
            .setDescription(`A banning punishment will be applied to the adventurer ${User}, want to confirm?`)

        await message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                msg.delete();

                User.ban({ reason: banReason_1 })
                    .catch(err => {
                        if (err) return message.channel.send(`Error: ${err}`)
                    });

                Channel.send(banEmbed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`process cancelled.`)
                    .then(m => m.delete({timeout: 5000}));
            }
        });
    }

        if(r.content.toLowerCase() === "#2") {
            const banReason_2 = "+18 content on public channels"
            const banEmbed = new MessageEmbed()
            
            banEmbed.setAuthor(`Adventurer banned from the server!`, this.client.user.displayAvatarURL({ dynamic: true }), Avatar)
            banEmbed.setColor(orange)
            banEmbed.setDescription(`\`\`\`\n- Adventurer: ${User.user.tag} (ID: ${User.id})\n- Staff: ${message.author.tag}\n- Reason: ${banReason_2}\`\`\``)

            const promptEmbed = new MessageEmbed()
            .setColor("36393e")
            .setDescription(`A banning punishment will be applied to the adventurer ${User}, want to confirm?`)

        await message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                msg.delete();

                User.ban({ reason: banReason_2 })
                    .catch(err => {
                        if (err) return message.channel.send(`Error: ${err}`)
                    });

                Channel.send(banEmbed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`process cancelled.`)
                    .then(m => m.delete({timeout: 5000}));
            }
        });
    }

        if(r.content.toLowerCase() === "#3") {
            const banReason_3 = "Infringement of a server policy (#rules)"
            const banEmbed = new MessageEmbed()
            
            banEmbed.setAuthor(`Adventurer banned from the server!`, this.client.user.displayAvatarURL({ dynamic: true }), Avatar)
            banEmbed.setColor(orange)
            banEmbed.setDescription(`\`\`\`\n- Adventurer: ${User.user.tag} (ID: ${User.id})\n- Staff: ${message.author.tag}\n- Reason: ${banReason_3}\`\`\``)

            const promptEmbed = new MessageEmbed()
            .setColor("36393e")
            .setDescription(`A banning punishment will be applied to the adventurer ${User}, want to confirm?`)

        await message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                msg.delete();

                User.ban({ reason: banReason_3 })
                    .catch(err => {
                        if (err) return message.channel.send(`Error: ${err}`)
                    });

                Channel.send(banEmbed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`process cancelled.`)
                    .then(m => m.delete({timeout: 5000}));
            }
        });
    }

        if(r.content.toLowerCase() === "#4") {
            const banReason_4 = "Other reasons"
            const banEmbed = new MessageEmbed()
            
            banEmbed.setAuthor(`Adventurer banned from the server1`, this.client.user.displayAvatarURL({ dynamic: true }), Avatar)
            banEmbed.setColor(orange)
            banEmbed.setDescription(`\`\`\`\n- Adventurer: ${User.user.tag} (ID: ${User.id})\n- Staff: ${message.author.tag}\n- Reason: ${banReason_4}\`\`\``)

            const promptEmbed = new MessageEmbed()
            .setColor("36393e")
            .setDescription(`A banning punishment will be applied to the adventurer ${User}, want to confirm?`)

        await message.channel.send(promptEmbed).then(async msg => {
            const emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            if (emoji === "✅") {
                msg.delete();

                User.ban({ reason: banReason_4 })
                    .catch(err => {
                        if (err) return message.channel.send(`Error: ${err}`)
                    });

                Channel.send(banEmbed);
            } else if (emoji === "❌") {
                msg.delete();

                message.reply(`process cancelled.`)
                    .then(m => m.delete({timeout: 5000}));
            }
        });
    }
    });
    }
}
