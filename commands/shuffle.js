module.exports = async function (message, client, player) {
    message.delete();
    
    //player.connect(); check if player is in voice channel

    player.queue.shuffle();
    console.log("Shuffled");
}