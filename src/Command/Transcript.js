const Command = require('../structures/Command'),
    { MessageEmbed } = require('discord.js'),
    sourcebin = require('sourcebin_js');

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            aliases: ['transcript'],
            enabled: true,
            guildOnly: false,
            ownerOnly: false,
        })
    }

    async run(message, args) {
        message.delete();
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel;
        if (channel.name.includes('ticket-')) {
            if (message.member.hasPermission('ADMINISTRATOR')) {
                channel.messages.fetch().then(async (messages) => {
                    const output = messages.array().reverse().map(m => `${new Date(m.createdAt).toLocaleString('pt-BR')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');

                    let response;
                    try {
                        response = await sourcebin.create([
                            {
                                name: ' ',
                                content: output,
                                languageId: 'text',
                            },
                        ], {
                            title: `Transcript do canal: ${channel.name}`,
                            description: ' ',
                        });
                    }
                    catch(e) {
                        return message.channel.send('Ocorreu um erro, tente novamente!');
                    }

                    const embed = new MessageEmbed()
                        .setDescription(`:newspaper: [Clique aqui para ser redirecionado ao seu transcript.](${response.url})`)
                        .setColor('#00ff0d');
                    message.channel.send('Escrevendo o transcript...').then(async (msg) => {
                        await msg.edit('Configurando o transcript...').then(async (msg2) => {
                            await msg2.edit('Transcript criado com sucesso! :white_check_mark:', embed) 
                        });
                    });
                });
            }
        }
        else {
            return message.reply(
                'Você não pode utilizar este comando aqui, apenas em um canal de ticket.',
            );
        }
    }
}
