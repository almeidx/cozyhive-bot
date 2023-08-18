import { guilds } from "#utils/guilds.js";
import { type Client, GatewayDispatchEvents } from "@discordjs/core";

export function registerGuildEmojisUpdateListener(client: Client) {
	client.on(GatewayDispatchEvents.GuildEmojisUpdate, ({ data }) => {
		const guild = guilds.get(data.guild_id);

		if (guild) {
			guild.emojiCount = data.emojis.length;
		}
	});
}
