import { type Client, GatewayDispatchEvents } from "@discordjs/core";
import { guilds } from "#utils/guilds.ts";

export function registerGuildUpdateListener(client: Client) {
	client.on(GatewayDispatchEvents.GuildUpdate, ({ data }) => {
		const guild = guilds.get(data.id);

		if (!guild) {
			return;
		}

		if (guild.name !== data.name) {
			guild.name = data.name;
		}

		if (data.approximate_member_count !== undefined && guild.memberCount !== data.approximate_member_count) {
			guild.memberCount = data.approximate_member_count;
		}
	});
}
