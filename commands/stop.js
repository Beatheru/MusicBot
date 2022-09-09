module.exports = async function (message, client, player) {
    message.delete();
    player.destroy();
}