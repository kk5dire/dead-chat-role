//set login token
const AuthDetails = require("./auth.js").getAuthDetails();
//const token = AuthDetails.bot_token;
const token = 'PUT YOUR TOKEN HERE' // YOUR TOKEN GOES HERE
//load required modules
const fs = require('fs');
const Discord = require('discord.js');
const tools = require('./tools');
const { send } = require('process');
//create a client, the bot itself
const client = new Discord.Client();

//load commands and make a list of cooldowns for them
const cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./cmds/${file}`);
    client.commands.set(command.name, command);
}
// Main status array
 const activities_list = [
"All Systems Operational",
"v106.52 BRANCH 5"
    ]; // creates an arraylist containing phrases you want your bot to switch through.


const lastDel = new Discord.Collection();
client.lastDel = lastDel;

//and edited messages for the editsnipe command
const lastEdits = new Discord.Collection();
client.lastEdits = lastEdits;


//basic command handler. https://discordjs.guide/command-handling/
const handleCommand = (message) => {
    //ignore non command messages and bot messages to prevent loops
   // if (!message.content.startsWith('d')) return;
    if (message.author.bot) return;

    //separate command and its arguments from the message
    const args = message.content.slice(''.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    //find the command from the loaded command files
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.name.startsWith(commandName))
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    //if the command isn't found or its requirements aren't met, exit
    if (!command) return;
    if (command.ownerOnly && message.author.id !== '686039988605026304') return tools.errorMessage(message, 'this command is set to bot owner only');
    if (command.guildOnly && message.channel.type !== 'text') return tools.errorMessage(message, 'this command is set to server only');
    if (command.nsfw && message.channel.type == 'text' && !message.channel.nsfw) return tools.errorMessage(message, 'this command is set to nsfw channel only');
    if (command.requires && !message.member.permissions.has(command.requires)) return tools.errorMessage(message, `this command requires the ${command.requires} permission`);
    if (command.args && !args.length) return tools.errorMessage(message, `this command requires arguments\nusage: \`${command.usage}\``);
    if (command.minArgs && args.length < command.minArgs) return tools.errorMessage(message, `too few arguments, min ${command.minArgs}`);
    if (command.maxArgs && args.length > command.maxArgs) return tools.errorMessage(message, `too many arguments, max ${command.maxArgs}`);

    //if command is on cooldown for that user, exit
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 2) * 1000;
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = expirationTime - now;
		const embede = new Discord.MessageEmbed()
        .setColor(0x7289DA)
        .setImage('https://i.ibb.co/FKhrgfD/Screenshot-2020-09-02-at-8-50-37-PM-01.jpg')
        .setFooter('Join null: null_link');
return message.channel.send(`> <a:NO:737449203726549122> ***\`this command is in cooldown for ${timeLeft} ms\`***`, embede);
            //return tools.errorMessage();
        }
    }
    
    //execute command and add the cooldown timer
    command.execute(message, args);
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
}

/* client.on('guildMemberAdd', member => {
      const embedm = new Discord.MessageEmbed()
        .setColor(0x7289DA)
        .setTitle(`<:join:739933481626501151> Welcome to the null server`)
        .setDescription(`Welcome ${member}! This is the server where we will null`)
        .setThumbnail('https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/waving-hand-sign_1f44b.png')
        .setFooter('Join null: null_link');
   member.send('Type \`-verify\` in <#737028828584476702> to get started!', embedm);
    console.log(` ${member} has joined the testing server`);
});
*/

// when message deleted
 
            

// Main status 
  client.on('ready', () => {
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setActivity(activities_list[index]); // sets bot's activities to one of the phrases in the arraylist.
    }, 10000); // Runs this every 10 seconds.
    }); 

// alt status 
/* const setStatus = () => client.user.setActivity(`to Matinence`, {type: 'LISTENING'});
 client.on('guildCreate', guild => setStatus());
client.on('guildDelete', guild => setStatus());

*/

//log the ready message and set status on startup
client.on('ready', () => {
    console.log('[☺] Bot Starting up');
    console.log('[&] Bot Online');
    console.log(' :)))) Watching for "dead chat"');
});


//if amount of accessible guilds changes, update the count
//handle a possible command when a message is received
client.on('message', (message) => {
    handleCommand(message);
});

//add deleted messages to the list so the snipe command can load them
client.on('messageDelete', (message) => {
    client.lastDel.set(message.channel.id, {author: message.author.tag, content: message.content, attachments: message.attachments});
});

//add edited messages to the list for the editsnipe command, and try to handle a command
client.on('messageUpdate', (oldMsg, newMsg) => {
    client.lastEdits.set(oldMsg.channel.id, {author: oldMsg.author.tag, oldContent: oldMsg.content, newContent: newMsg.content});
    handleCommand(newMsg);
});

//log in to Discord with the bot token in config.json
//go to https://discordapp.com/developers/applications to get your own bot
client.login(token);
