const Discord = require('discord.js');
const tools = require('../tools');
const bot = new Discord.Client();

module.exports = {
    name: 'dead',
    aliases: ['r'],
    description: 'command_placeholder',
    usage: '-command_handle',
    nsfw: false,
    image: false,
    args: false,
    guildOnly: false,
    ownerOnly: false,
       async execute(message, args) {
         try {

     if (args[0] == 'chat') {
      console.log('[📥] Keyword Triggered, Starting Proccess!')
            let target = 'YOUR ROLE ID HERE';  // REPLACE THIS WITH YOUR ROLE ID !!! REPLACE THIS WITH YOUR ROLE ID
        
        // assuming role.id is an actual ID of a valid role:
        if (target === undefined) throw message.channel.send(tools.errorMessage('Undefined Paramters'));
        if(message.member.roles.cache.has(target)) { // crew role
            console.log(`[!]ERROR: User already has role Aborting Proccess!`);
          let role = message.guild.roles.cache.get(target); // access role
          let member = message.member;
          var embed = tools.makeEmbed('DEBUG: Already have role')
        //  const user = bot.users.cache.get('798785877047246868');
        //  user.send(embed);
          
       
        
          
         
           return;
          } else {
            console.log(`[+] Adding role`);
          let role = message.guild.roles.cache.get(target); // access role
          let member = message.member;
        //  const user = bot.users.cache.get('798785877047246868');
           member.roles.add(role.id)
          var embed = tools.makeEmbed('DEBUG: Added role')
        //  user.send(embed);    
          console.log("[🕒] Starting role removal tick...")     
          setTimeout(() => {    member.roles.remove(role.id) }, 15000);
          setTimeout(() => { console.log("[-] removed role") }, 15000);
        //  setTimeout(() => { user.send(tools.makeEmbed('DEBUG: Removed role')) }, 15000);
         } 

    }
        } catch (err) {
            return tools.errorMessage(message, err);
        }

  
    },
};
