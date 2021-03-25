const BaseEvent = require('../../base/Event');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready');
  }
  async run (client) {
    console.log(client.user.tag + ' has logged in.');

		 client.user.setPresence({activity: 
      { 
        name: `our services on ${client.guilds.cache.size.toLocaleString()} servers`, 
        type: "WATCHING"
      }
   });
  }
}