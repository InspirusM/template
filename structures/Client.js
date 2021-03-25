const { Client, Collection } = require('discord.js');
const Util = require('./Util.js');
const { registerCommands, registerEvents, connectMongo } = require('./Registry');


class BotClient extends Client {
  constructor(opt) {
    super(opt);

    this.commands = new Collection();
    this.aliases = new Collection();
    this.events = new Collection();
    this.config = require('../config');
    this.snek = require('axios');
    this.util = new Util(this);
  }

  async load() {
    await registerCommands(this, "../commands");
    await registerEvents(this, "../events");
    await connectMongo(this);
    this.login(this.config.token)
  }

  fetchCommand(cmd) {
    return this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));
  }

}

module.exports = BotClient;