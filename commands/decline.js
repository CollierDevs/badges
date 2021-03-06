const Discord = require('discord.js');
const fse = require('fs-extra');

module.exports = {
    name: "decline",
    description: "Declines a user.",
    usage: '<mention or tag or id> [reason]',
    category: 'dbl',

    async code(client, message, args) {
        let user = message.mentions.users.first();
        if (!user) {
            const errEmbed = new Discord.MessageEmbed()
                .setColor('36393f')
                .setDescription(`<:tickNo:700331270210846780> I may be blind, but I don't see that user here.`)

            return message.channel.send(errEmbed).catch(err => err);
        }
        fse.readJson(`reasons.json`, async(err, reasons) => {
            let reason = args.slice(1).join(' ');

            /*
             * ! Case is not defined, someone please fix.
             * Fixed. Case isn't supposed to be be in this one.
             */
            let declineEmbed = new Discord.MessageEmbed()
                .setTitle(`Decline`)
                .setColor('#dd2e44')
            declineEmbed.addField("Bot", `${user.tag} (${user})`, true);
            if (!reason) {
                reason = reasons.declineReason[Math.floor(Math.random() * (1 - 0) + 0)];
            }
            declineEmbed.addField(`Moderator`, `${message.author.tag}`, true);
            declineEmbed.addField(`Reason`, reason);
            declineEmbed.setTimestamp();
            await message.channel.send(declineEmbed);
        });
    }
}