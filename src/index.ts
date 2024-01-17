import { Client, GatewayIntentBits } from "@discordjs/core";
import { REST } from "@discordjs/rest";
import { WebSocketManager } from "@discordjs/ws";
import { registerGuildCreateListener } from "#listeners/guildCreate.js";
import { registerGuildDeleteListener } from "#listeners/guildDelete.js";
import { registerGuildEmojisUpdateListener } from "#listeners/guildEmojisUpdate.js";
import { registerGuildUpdateListener } from "#listeners/guildUpdate.js";
import { registerMessageCreateListener } from "#listeners/messageCreate.js";
import { registerReadyListener } from "#listeners/ready.js";
import { DISCORD_TOKEN } from "#utils/env.js";

const rest = new REST().setToken(DISCORD_TOKEN);
const gateway = new WebSocketManager({
	rest,
	intents:
		GatewayIntentBits.Guilds | // GUILD_CREATE, GUILD_DELETE, GUILD_UPDATE
		GatewayIntentBits.GuildEmojisAndStickers | // GUILD_EMOJIS_UPDATE
		GatewayIntentBits.GuildMessages | // MESSAGE_CREATE
		GatewayIntentBits.MessageContent,
	token: DISCORD_TOKEN,
});

const client = new Client({ gateway, rest });

registerReadyListener(client);
registerGuildCreateListener(client);
registerGuildDeleteListener(client);
registerGuildUpdateListener(client);
registerGuildEmojisUpdateListener(client);
registerMessageCreateListener(client);

await gateway.connect();
