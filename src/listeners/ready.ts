import { setInterval } from "node:timers";
import { type Client, GatewayDispatchEvents } from "@discordjs/core";
import { noop } from "#utils/common.ts";
import { Channels, Guilds, OFFICIAL_GUILDS, Time } from "#utils/constants.ts";
import { guilds } from "#utils/guilds.ts";
import { info, warn } from "#utils/logger.ts";

export function registerReadyListener(client: Client): void {
	client.once(GatewayDispatchEvents.Ready, ({ data }) => {
		info(`Logged in as ${data.user.username}`);

		setInterval(async () => {
			const mainGuild = guilds.get(Guilds.Cozyhive);
			if (!mainGuild) {
				warn("Could not find main guild");
				return;
			}

			info(`Updating topic for ${mainGuild.name}`);

			const formatter = new Intl.NumberFormat("en-US");
			const officialGuilds = [...guilds.entries()].filter(([guildId]) => OFFICIAL_GUILDS.includes(guildId));
			const totalEmojis = officialGuilds.reduce((acc, [, guild]) => guild.emojiCount + acc, 0);

			await client.api.channels
				.edit(Channels.General, {
					topic: `${formatter.format(mainGuild.memberCount)} Members | ${formatter.format(totalEmojis)} Emojis`,
				})
				.catch(noop);
		}, 30 * Time.Minutes);
	});
}
