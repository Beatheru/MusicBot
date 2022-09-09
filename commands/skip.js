module.exports = async function (message, client, player) {
    message.delete();
    
    //player.connect(); check voice channel

    if (player.playing) {
        if (player.queue.totalSize == 1)
            player.destroy();

        player.stop();
    }
}