import assert, { AssertionError } from "node:assert";
import { type Client, GatewayDispatchEvents, type Snowflake } from "@discordjs/core";
import { alertChannels } from "#utils/channels.ts";
import { noop } from "#utils/common.ts";
import {
	BoosterStatus,
	Channels,
	Emojis,
	Guilds,
	NIGHTHAWK_BOT_USER_ID,
	OFFICIAL_GUILDS,
	Roles,
	USER_ID_REGEX,
} from "#utils/constants.ts";
import { guilds } from "#utils/guilds.ts";
import { info } from "#utils/logger.ts";

export function registerMessageCreateListener(client: Client) {
	client.on(GatewayDispatchEvents.MessageCreate, async ({ api, data }) => {
		if (!data.guild_id || !OFFICIAL_GUILDS.includes(data.guild_id)) {
			return;
		}

		const alertsChannelId = alertChannels.get(data.guild_id);
		if (
			data.author.id !== NIGHTHAWK_BOT_USER_ID ||
			(alertsChannelId && data.channel_id !== alertsChannelId) ||
			(!data.content.includes("New Booster") && !data.content.includes("Stopped Boosting"))
		) {
			return;
		}

		try {
			const guild = guilds.get(data.guild_id);
			assert(guild, "Could not find guild");

			const userMatch = USER_ID_REGEX.exec(data.content);
			const userId = userMatch?.[1] as Snowflake | null;
			assert(userId, "Could not match user id from message");

			const boosterStatus = data.content.startsWith("New Booster")
				? BoosterStatus.Started
				: data.content.startsWith("Stopped Boosting")
					? BoosterStatus.Stopped
					: null;
			assert(boosterStatus !== null, "Could not determine if the message was a new booster or a stopped booster");

			const fetchedMember = await api.guilds.getMember(Guilds.Cozyhive, userId).catch(noop);
			assert(fetchedMember, "Could not fetch member");

			if (boosterStatus === BoosterStatus.Started) {
				await api.guilds.editMember(data.guild_id, userId, {
					roles: [...new Set([...fetchedMember.roles, Roles.Booster, Roles.SecondaryBooster])],
				});

				info(`New booster: ${userId} in ${guild.name}`);

				await api.channels
					.createMessage(Channels.NitroBoosters, {
						content: `${Emojis.NitroBoostHover} <@${userId}> just ascended and boosted the **${guild.name}** server! Well done, now make sure to check out <#${Channels.ColourRoles}>!`,
					})
					.catch(noop);

				return;
			}

			info(`Booster stopped: ${userId} in ${guild.name}`);

			const rolesToRemove: Snowflake[] = [];
			const has = (id: Snowflake): boolean => fetchedMember.roles.includes(id);

			if (!has(Roles.PrimaryBooster) && has(Roles.Booster)) rolesToRemove.push(Roles.Booster);
			if (has(Roles.SecondaryBooster)) rolesToRemove.push(Roles.SecondaryBooster);

			if (rolesToRemove.length > 1) {
				await api.guilds.editMember(data.guild_id, userId, {
					roles: fetchedMember.roles.filter((id) => !rolesToRemove.includes(id)),
				});
			} else if (rolesToRemove.length === 1) {
				await api.guilds.removeRoleFromMember(data.guild_id, userId, rolesToRemove[0]!);
			}
		} catch (error) {
			if (error instanceof AssertionError) {
				return;
			}

			throw error;
		}
	});
}
