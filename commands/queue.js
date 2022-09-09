const { MessageEmbed } = require('discord.js');

module.exports = function (message, client, player) {
    message.delete();

    const embed = new MessageEmbed();

    if (player.queue.length == 0) {
        message.channel.send("No queue");
        return;
    }

    if (player.queue.length > 15) {
        for (i = 0; i < 15; i++) {
            const duration = durationToTime(player.queue[i].duration / 1000);
            embed.addField(`${player.queue[i].title} - ${duration}`, `${player.queue[i].uri}`, false);
        }
    } else {
        for (const track of player.queue) {
            const duration = durationToTime(track.duration / 1000);
            embed.addField(`${track.title} - ${duration}`, `${track.uri}`, false);
        }
    }

    message.channel.send({ embeds: [embed] });

    function durationToTime(duration) {
        var hours = Math.floor(duration / 3600);
        var minutes = Math.floor((duration - (hours * 3600)) / 60);
        var seconds = duration - (hours * 3600) - (minutes * 60);

        if (hours < 10) {hours = "0" + hours;}
        if (minutes < 10) {minutes = "0" + minutes;}
        if (seconds < 10) {seconds = "0" + seconds;}

        if (hours == "00") {
            if (minutes == "00")
                return seconds;

            return minutes + ':' + seconds;
        }

        return hours + ':' + minutes + ':' + seconds;
    }
}

