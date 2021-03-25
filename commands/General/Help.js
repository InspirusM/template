const Command = require("../../base/Command.js");
const { MessageEmbed } = require('discord.js');

class Ping extends Command {
    constructor() {
        super({
            name: "help",
            description: "Shows all the commands available",
            usage: ["[command]"],
            category: 'General',
            aliases: ["help"],
            enabled: true
        });
    }

    async run(client, msg, args) {

      if(args[0]) {
          let cmd = client.fetchCommand(args[0]);
          if(!cmd) return msg.channel.send(new MessageEmbed()
              .setColor('RED')
              .setDescription(`No command found with name or alias \`${args[0]}\``)
              .setFooter(msg.author.tag, msg.author.avatarURL({ dynamic: true }))
            );

          return msg.channel.send(new MessageEmbed()
            .setColor('BLUE')
            .setDescription(`
             Name: ${client.util.toProperCase(cmd.name)}
             Description: ${cmd.description}
             Alias: ${cmd.aliases.length > 0 ? cmd.aliases.join(', '): 'No aliases'}
             Usage: ${cmd.usage.length > 1 ? cmd.usage.join(', ') : cmd.usage}
            `)
            .setFooter(msg.author.tag, msg.author.avatarURL({ dynamic: true }))
            )
      }

      let categories = client.commands.map(c => c.category).filter((item, pos, self) => {
        return self.indexOf(item) == pos;
      });
     let embed = new MessageEmbed()
     .setAuthor(`Available commands for ${msg.guild.name}`, msg.guild.iconURL({ dynamic: true }))
     .setDescription(`Prefix: ${msg.client.prefix}`) //do styling
     .setTimestamp()
     .setFooter(msg.author.tag, msg.author.avatarURL({ dynamic: true }))
     .setColor('BLUE');
     
     for (const category of categories) {
       embed.addField(`${category} [${client.commands.filter(c => c.category === category).size}]`, `> \`\`\`${client.commands.filter(c => c.category === category).map(c => c.name).join(', ')}\`\`\``)
     }  
     return msg.channel.send(embed);

    }

}

module.exports = Ping;
