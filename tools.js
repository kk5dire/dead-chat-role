const Discord = require('discord.js');

module.exports = {
    // Creates an error message embed and sends it.
    // For this to work, the bot must have access to the icon emotes server https://discord.gg/TVQdyea

    // message: the command message that created the error
    // err: the error message
    async errorMessage(message, err) {
        const embed = new Discord.MessageEmbed()
        .setColor(0x7289DA)
        .setTitle('<:notlikebean:827055430915719248>  A Error Occured While Doing The Action')
        .setDescription(`${err}`)
        .setFooter('A Non-Fatal Error occured while doing this command');
        const outMsg = await this.sendEmbed(message.channel, embed);
        outMsg.delete({timeout: 200000});
        if(message.channel.type == 'text') message.delete({timeout: 200000});
    },

    // Creates an embed template (doesn't send it).

    // title: the title for the embed, usually has an emoji at the start
    // desc: the embed description
    // footer: the bottom text of the embed, leave blank for the current date/time
    // channel: channel to send to, returns embed if not defined
    makeEmbed(title, desc, footer, channel) {
        if (!title) title = '';
        if (!desc) desc = '';
        if (!footer) footer = 'Please note: This bot is depricated ';
        const embed = new Discord.MessageEmbed()
        .setColor(0x7289DA)
        .setTitle(title)
        .setDescription(desc)
        .setFooter('hello');
        if(channel) {channel.send(embed)} else {return embed};
    },

    //Sends an embed message, or a normal text message if the bot doesn't have permissions.
    sayMessage(message, to) {
        
        if (!message) message = '';
        
        let channel = message.guild.channel.find(
  channel => channel.name.toLowerCase() === to
        )
        if (!to) channel = message.channel
        if(to) {to.send(message)} else {return message.channel.send(message)};
    },
    //channel: the channel to send to
    //embed: the embed to be sent
    sendEmbed(channel, embed) {
        return channel.send(embed).catch(e => {
            channel.send(` >>> **${embed.title}**\n${embed.description}\n${embed.footer ? embed.footer.text+'\n' : ''}`+
            `  I couldnt send the embed make sure i have permissions.\n(${e})  `)
        })
    }
}
