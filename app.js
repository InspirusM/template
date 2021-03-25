const BotClient = require('./structures/Client');

const client = new BotClient();

client.load();

process.on("uncaughtException", err => {
  console.log(`An exception occured: \n${err.stack}`)
});

process.on("unhandledRejection", err => {
  console.log(`An unhandled rejection occured: \n${err.stack}`)
});