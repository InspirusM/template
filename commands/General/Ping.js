const Command = require("../../base/Command.js");

class Ping extends Command {
    constructor() {
        super({
            name: "ping",
            description: "Get bot latency.",
            category: 'General',
            aliases: ["pong", "latency"],
            enabled: true
        });
    }

    async run(client, msg, args) {

     return msg.channel.send({embed:{
        description: `My ping is ${Math.round(client.ws.ping)}ms`,
        color: 0x00ff27
      }});
    }

}

module.exports = Ping;
