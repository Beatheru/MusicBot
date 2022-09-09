module.exports = async function (message, client, player) {
    message.delete();

    if (player.playing)
        player.pause(true);
}