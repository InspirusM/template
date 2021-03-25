const path = require('path');
const fs = require('fs').promises;
const BaseCommand = require('../base/Command');
const BaseEvent = require('../base/Event');
const mongoose = require('mongoose');

async function registerCommands(client, dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerCommands(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Command = require(path.join(filePath, file));
      if (Command.prototype instanceof BaseCommand) {
        const cmd = new Command();
        client.commands.set(cmd.name.toLowerCase(), cmd);
        cmd.aliases.forEach((alias) => {
          client.aliases.set(alias, cmd.name.toLowerCase());
        });
      }
    }
  }
}

async function registerEvents(client, dir = '') {
  const filePath = path.join(__dirname, dir);
  const files = await fs.readdir(filePath);
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file));
    if (stat.isDirectory()) registerEvents(client, path.join(dir, file));
    if (file.endsWith('.js')) {
      const Event = require(path.join(filePath, file));
      if (Event.prototype instanceof BaseEvent) {
        const event = new Event();
        client.events.set(event.name, event);
        client.on(event.name, event.run.bind(event, client));
      }
    }
  }
}

async function connectMongo(client) {
   const connection = await mongoose.connect(client.config.dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
   if(connection.readyState === 0) client.log(`MongoDB`, `Database has been disconnected!`);
   else if(connection.readyState === 1) client.log(`MongoDB`, `Database has been connected!`);
   else if(connection.readyState === 2) client.log(`MongoDB`, `Attempting connection to database!`);
   else client.log(`MongoDB`, `Database has been disconnected!`);
}

module.exports = { 
  registerCommands, 
  registerEvents,
  connectMongo,
};