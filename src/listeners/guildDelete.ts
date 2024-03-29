import { type Client, GatewayDispatchEvents } from "@discordjs/core";
import { alertChannels } from "#utils/channels.js";
import { guilds } from "#utils/guilds.js";

export function registerGuildDeleteListener(client: Client) {
	client.on(GatewayDispatchEvents.GuildDelete, ({ data }) => {
		guilds.delete(data.id);
		alertChannels.delete(data.id);
	});
}
