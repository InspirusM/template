module.exports = class BaseCommand {
  constructor(options = {}) {
    this.name = options.name;
    this.aliases = options.aliases || [];
    this.description = options.description || 'No description provided.';
    this.category = options.category || 'General';
    this.usage = options.usage || ['No usage provided'];
    this.userPerms = options.userPerms || ["SEND_MESSAGES"];
    this.clientPerms = options.botPerms || ['SEND_MESSAGES']
  }
  async run(client, message, args) {
    throw new Error(`Command ${this.name} doesn't provide a run method!`);
  }
};