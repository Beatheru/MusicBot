const { Client, Intents} = require("discord.js");
const { Manager } = require("erela.js");

require('dotenv').config();
const TOKEN = process.env.TOKEN;

const DINOTOKEN = process.env.DINOTOKEN;

const commandHandler = require("./commands");

const client = new Client({intents: [Intents.FLAGS.GUILDS, "GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] });

client.manager = new Manager({
    nodes: [
      /* {
        host: "node1.kartadharta.xyz",
        port: 443,
        password: "kdlavalink",
        secure: true
      }, */
      
      {
        host: "lv.vellerius.tk",
        port: 2333,
        password: "derpilava",
        secure: false
      } /*
      {
        host: "lavalink.cloudblue.ml",
        port: 1555,
        password: "danbotbest",
        secure: false
      },
      {
        host: "lavalink.rukchadisa.live",
        port: 8080,
        password: "youshallnotpass",
        secure: false
      },
      {
        host: "audio.alexanderof.xyz",
        port: 2000,
        password: "lavalink",
        secure: false
      },
      {
        host: "lava-ny-01.thermalhosting.com",
        port: 4018,
        password: "thermalhosting.com",
        secure: false
      },
      {
        host: "116.202.215.103",
        port: 25580,
        password: "pieperjugend.de",
        secure: false
      } */
    ],
    // A send method to send data to the Discord WebSocket using your library.
    // Getting the shard for the guild and sending the data to the WebSocket.
    send(id, payload) {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    },
  });

client.manager.on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`));
client.manager.on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`));
client.manager.on("trackStart", (player, track) => {
    /* client.channels.cache
      .get(player.textChannel)
      .send(`Now playing: ${track.title}`); */

      console.log(`Now playing: ${track.title}`);
  });

client.manager.on("queueEnd", (player) => { player.destroy(); });


client.once("ready", () => {
  console.log("Ready!");
  client.manager.init(client.user.id);
});

client.on("raw", (d) => client.manager.updateVoiceState(d));
client.on("messageCreate", commandHandler);
client.login(TOKEN);

module.exports = { client };