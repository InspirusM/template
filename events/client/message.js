const BaseEvent = require('../../base/Event');

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('message');
  }
  
  async run(client, message) {
    if (message.channel.type === 'dm' || !message.channel.viewable || message.author.bot) return;
    if (message.webhookID) return;

    if(!message.channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES'])) return;
    
    const mentionRegex = new RegExp(`^<@!?${client.user.id}>$`);
    const mentionRegexPrefix = new RegExp(`^<@!?${client.user.id}> `);

    client.prefix = client.config.prefix;

    if (message.content.match(mentionRegex)) return message.channel.send(`My prefix for ${message.guild.name} is \`${client.prefix}\`.`);

    const prefix = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : client.prefix;

    if (!message.content.startsWith(prefix)) return;
      const [cmdName, ...cmdArgs] = message.content
      .slice(prefix.length)
      .trim()
      .split(/\s+/);
      const command = client.fetchCommand(cmdName);
      if(!command || command.length === 0) return; 
      const permission = command.checkPermissions(message);
      if(!permission) return;

      try {
      command.run(message, cmdArgs);
      } catch(e) {
        msg.channel.send({embed: {
          color: client.color.error,
          description: `${client.emoji.error} | Something went wrong!`
        }});

        console.log(`Something went wrong: \n${e.stack}`)
      }
  }
}