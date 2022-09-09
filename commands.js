require('dotenv').config();
const CHANNEL_ID = process.env.CHANNEL_ID;

const play = require("./commands/play");
const queue = require("./commands/queue");
const shuffle = require("./commands/shuffle");
const skip = require("./commands/skip");
const playtop = require("./commands/playtop");
const clear = require("./commands/clear");
const stop = require("./commands/stop");
const pause = require("./commands/pause");
const resume = require("./commands/resume");

const commands = {
    play,
    queue,
    shuffle,
    skip,
    playtop,
    clear,
    stop,
    pause,
    resume,
};

module.exports = async function (message) {
    const { client } = require("./index");

    if (message.channel.id == CHANNEL_ID) {
        // Create a new player. Returns the player if it already exists.
        const player = client.manager.create({
            guild: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id
        });

        if (message.content === "wo") {
            commands[message.content](message, client, player);
        }

        let tokens = message.content.split(" ");
        let command = tokens.shift();

        if (command.charAt(0) == "!") {
            command = command.substring(1);
            commands[command](message, client, player);
        }
    }
}