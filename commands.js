'use strict';

const config = require('./config.json');
const commandHelp = require('./help.js');
const tool = require('./tool.js');
const rp = require('request-promise');
const stripInDent = require('strip-indent');
const os = require('os');

module.exports = {
	'debug': debug,
	'help': help,
	'ban': ban,
	'kick': kick
}

function debug(msg, bot){

 let upTime = Math.round(os.uptime());
 let upTime1 = Math.round(process.uptime());
    console.log(upTime);
     let upTimeSeconds2 = upTime1;
        let upTimeOutput2 = "";
        if (upTime<60) {
            upTimeOutput2 = `${upTime1}s`;
        } else if (upTime1<3600) {
            upTimeOutput2 = `${Math.floor(upTime1/60)}m ${upTime1%60}s`;
        } else if (upTime1<86400) {
            upTimeOutput2 = `${Math.floor(upTime1/3600)}h ${Math.floor(upTime1%3600/60)}m ${upTime1%3600%60}s`;
        } else if (upTime1<604800) {
            upTimeOutput2 = `${Math.floor(upTime1/86400)}d ${Math.floor(upTime1%86400/3600)}h ${Math.floor(upTime1%86400%3600/60)}m ${upTime%86400%3600%60}s`;
        }
         let upTimeSeconds = upTime;
        let upTimeOutput = "";

        if (upTime<60) {
            upTimeOutput = `${upTime}s`;
        } else if (upTime<3600) {
            upTimeOutput = `${Math.floor(upTime/60)}m ${upTime%60}s`;
        } else if (upTime<86400) {
            upTimeOutput = `${Math.floor(upTime/3600)}h ${Math.floor(upTime%3600/60)}m ${upTime%3600%60}s`;
        } else if (upTime<604800) {
            upTimeOutput = `${Math.floor(upTime/86400)}d ${Math.floor(upTime%86400/3600)}h ${Math.floor(upTime%86400%3600/60)}m ${upTime%86400%3600%60}s`;
        }
let embed_fields = [{
                name: "System info:",
                value: `${process.platform}-${process.arch} with ${process.release.name} version ${process.version.slice(1)}`,
                inline: true
            },
            {
                name: "Process info: PID",
                value: `${process.pid}`,
                inline: true
            },
            {
                name: "Process memory usage:",
                value: `${Math.ceil(process.memoryUsage().heapTotal / 1000000)} MB`,
                inline: true
            },
            {
                name: "System memory usage:",
                value: `${Math.ceil((os.totalmem() - os.freemem()) / 1000000)} of ${Math.ceil(os.totalmem() / 1000000)} MB`,
                inline: true
            },
            {
                name: "Uptime bot:",
                value: `:clock12: ${upTimeOutput}`,
                inline: true
            },
            {
                name: "Uptime computer:",
                value: `:clock1230: ${upTimeOutput2}`,
                inline: true
            },{
                name: 'Lib',
                value: `**Discord.js**`
            }
        ];

        msg.channel.send({
            embed: {
                author: {
                    name: msg.author.username,
                    icon_url: msg.author.avatarUrl,
                    url:'http://google.fr'
                },
                color: 0x00FF00,
                fields: embed_fields
            }
        });
}

function help(msg){
	let args = msg.content.split(/\s+/).slice(1);

	let helpStr;
	if(args.length == 1){
		if(args[0].charAt(0) == config.prefix) //['L', 'efjofefe']
			args[0] = args[0].slice(1);
		helpStr = commandHelp[args[0]];
	    
	}
	if(helpStr)
		helpStr(msg);
	else 
		msg.channel.send({embed: {
    color: 3447003,
    title: "Help",
    fields: [{
    		name: "Musique",
			value: `${config.prefix}help music`,
			inline: true
      	},
      	{ 
       		name: "Ban",
	   		value: `${config.prefix}help ban`,
	   		inline: true
      	},
      	{
        	name: "Kick",
			value: `${config.prefix}help kick`,
			inline: true
      	},
      	{
			name: "debug",
			value: `${config.prefix}debug`
      	}
    	],
    	timestamp: new Date(),
    footer: {
      text: "©Steve & Co"
    }
  	}
});
}


function ban(msg){
	if ( !msg.member.hasPermission('BAN_MEMBERS')){
		return msg.channel.send(`Vous n'avez pas la permission de ban`)
	}
	let memberToBan = msg.mentions.members.first();
	if(memberToBan && memberToBan.bannable && (msg.member.highestRole.calculatedPosition >
            memberToBan.highestRole.calculatedPosition || msg.guild.ownerID == msg.author.id)){
		let reason = tool.parseOptionArg('raison', msg.content);
	    let days = parseInt(tool.parseOptionArg('days', msg.content))

	    let banOptions = {
	    	days : days ? days : 0,
	    	reason: reason ? reason: 'none'
	    };
	    memberToBan.ban(banOptions);
	    msg.channel.send(` L\'utilisateur ${memberToBan} à bien été bani`)
	}
}

function kick(msg){
	if ( !msg.member.hasPermission('KICK_MEMBERS')){
		return msg.channel.send(`Vous n'avez pas la permission de kick`)
	}
	let memberToKick = msg.mentions.members.first();
	if(memberToKick && memberToKick.kickable && (msg.member.highestRole.calculatedPosition >
            memberToKick.highestRole.calculatedPosition || msg.guild.ownerID == msg.author.id)){
		let reason = tool.parseOptionArg('raison', msg.content);

	    let kickOptions = {
	    	reason: reason ? reason: 'none'
	    };
	    memberToKick.kick(kickOptions);
	    msg.channel.send(` L\'utilisateur ${memberToKick} à bien été kick`)
	}
}