module.exports = async function (message, client, player) {
    message.delete();

    const url = message.content.split(" ")[1];
    const res = await client.manager.search(url, message.author);

    // Connect to the voice channel.
    player.connect();

    //console.log(res.playlist);
    //console.log(res.tracks);
    //console.log(res.loadType);

    // Adds all playlist tracks if result is a playlist, else just add the first track found.
    if (res.loadType == "PLAYLIST_LOADED") {
        var match = url.match(/index=(\d)+$/)

        if (match) {
            const index = match[0].slice(6) - 1;
            player.queue.add(res.tracks[index], 0);
            console.log(`Enqueuing track ${res.tracks[index].title}.`);
        } else {
            player.queue.add(res.tracks, 0)

            for (const track of res.tracks)
            console.log(`Enqueuing track ${track.title}.`);
        }
    }
    else if (res.loadType == "SEARCH_RESULT" || res.loadType == "TRACK_LOADED") {
        player.queue.add(res.tracks[0], 0);
        console.log(`Enqueuing track ${res.tracks[0].title}.`);
    } else {
        message.channel.send("No result")
        return;
    }

    /* message.channel.send(`Enqueuing track ${res.tracks[0].title}.`); */

    // Plays the player (plays the first track in the queue).
    if (!player.playing && !player.paused && !player.queue.size)
        player.play();

    // For playlists you'll have to use slightly different if statement
    if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length)
        player.play();
}