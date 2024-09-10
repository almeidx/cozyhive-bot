import { type Client, GatewayDispatchEvents } from "@discordjs/core";
import { alertChannels } from "#utils/channels.ts";
import { ALERTS_CHANNEL_NAME, OFFICIAL_GUILDS } from "#utils/constants.ts";
import { guilds } from "#utils/guilds.ts";

export function registerGuildCreateListener(client: Client) {
	client.on(GatewayDispatchEvents.GuildCreate, ({ data }) => {
		if (!OFFICIAL_GUILDS.includes(data.id)) {
			return;
		}

		guilds.set(data.id, {
			emojiCount: data.emojis.length,
			memberCount: data.member_count,
			name: data.name,
		});

		const alertsChannel = data.channels.find((channel) => channel.name === ALERTS_CHANNEL_NAME);
		if (alertsChannel) {
			alertChannels.set(data.id, alertsChannel.id);
		}
	});
}
