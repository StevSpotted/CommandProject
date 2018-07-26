'use strict';
const Discord = require("discord.js");
const config = require("./config.json");
const cmds = require("./commands.js");
const music = require('./music.js')
const tool = require('./tool.js');
const prompt = require('prompt');
const colors = require("colors");
prompt.message = "";
prompt.colors = '';

const bot = new Discord.Client();

bot.on('ready',() => {
	console.log(`${bot.user.username} se lance`);
	console.log(`le bot se lance sur ${bot.guilds.size} server`)

	bot.user.setGame(config.prefix + 'help');
});

bot.on('message', msg => {
	if(msg.author.bot || msg.channel.type != 'text')
		return;

	if(!msg.content.startsWith(config.prefix))
		return;
	let cmd =msg.content.split(/\s+/)[0].slice(config.prefix.length).toLowerCase();
	getCmdFunction(cmd)(msg);
})

bot.on('error', (e) => console.log(e));
bot.on('warn', (e) => console.log(e));
//bot.on('debug', (e) => console.log(e));
bot.login(config.token);

function getCmdFunction(cmd){
	const COMMANDS = {
		'help': cmds.help,
		'music': music.processCommands,
		'debug': cmds.debug,
		'ban': cmds.ban,
		'kick': cmds.kick,

	}
	return COMMANDS[cmd] ? COMMANDS[cmd] : () => {};
}