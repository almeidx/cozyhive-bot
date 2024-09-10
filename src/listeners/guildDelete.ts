import { type Client, GatewayDispatchEvents } from "@discordjs/core";
import { alertChannels } from "#utils/channels.ts";
import { guilds } from "#utils/guilds.ts";

export function registerGuildDeleteListener(client: Client) {
	client.on(GatewayDispatchEvents.GuildDelete, ({ data }) => {
		guilds.delete(data.id);
		alertChannels.delete(data.id);
	});
}
