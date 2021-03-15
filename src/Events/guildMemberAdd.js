const Event = require('../structures/Event'),
    { MessageEmbed } = require('discord.js'),
    { orange } = require('../../config.json');

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            once: true
        })
    }

    async run(member) {
        const icon = "https://cdn.discordapp.com/attachments/569290453506064384/779195443820888134/full-trophy_0.png"
        const embed = new MessageEmbed()

        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(icon)
        .setDescription(`<:m_world:776971960214355968> Registro concluído com sucesso!\n\`\`\`\nOlá aventureiro(a), seja muito bem-vindo(a) ao BhowkMC! Um mundo cheio de aventuras e missões de alto nível, que só você pode realizá-las.\n\nOs canais foram liberados para que você possa bater um papo com outros(as) aventureiros(as)!\`\`\`\nAtualmente nós temos **${member.guild.memberCount}** jogadores em nosso servidor Discord. Podemos contar com sua ajuda? Convide seus companheiros para o nosso servidor e domine este vasto mundo cheio de aventuras juntos!\n\n<a:mw_irongolem:776979898279264256> Antes de tudo, por favor, certifique-se de ler as nossas regras para que não seja punido. Vá até: <#781454363100708884>`)
        .setColor(orange)

        member.send(embed);
    }
};
