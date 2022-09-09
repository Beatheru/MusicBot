module.exports = async function (message, client, player) {
    message.delete();
    
    //player.connect(); check if player is in voice channel

    player.queue.clear();
    console.log("Cleared");

    //console.log(player.queue);


    /* if (!player.playing && !player.paused && !player.queue.size)
        player.play(); */
}