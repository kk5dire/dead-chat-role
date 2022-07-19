const Discord = require('discord.js');
const tools = require('../tools');
const request = require('request')
const cheerio = require('cheerio')

module.exports = {
    name: 'ns',
    aliases: [''],
    description: 'ns',
    usage: 'ns',
    nsfw: false,
    image: false,
    args: false,
    guildOnly: false,
    ownerOnly: false,
    async execute(message, args, request, cheerio) {
        try {
       
         
         
         function image(message) {
        
               var options = {
                   url: "http://results.dogpile.com/serp?qc=images&q=" + "nsfw",
                   method: "GET",
                   headers: {
                       "Accept": "text/html",
                       "User-Agent": "Chrome"
                   }
               };
               
               
               request(options, function(error, response, responseBody) {

                 if(error) {
                     return
                 }


                 $ = cheerio.load(responseBody);


                 var links = $(".image a.link");

                 var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

                 console.log(urls);
                 if(!urls.length) {
                     return
                 }

                 message.channel.send( urls[Math.floor(Math.random() * urls.length)]);

               });
            
            }

    


        } catch (err) {
            return tools.errorMessage(message, err);
        }
    },
};
