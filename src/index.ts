import "dotenv/config.js";

import { ok as assert } from "node:assert";
import { setInterval } from "node:timers";
import { Client, Events, GatewayIntentBits, type Snowflake } from "discord.js";
import { noop } from "./utils/common.js";
import {
	ALERTS_CHANNEL_NAME,
	BoosterStatus,
	Channels,
	Emojis,
	Guilds,
	NIGHTHAWK_BOT_USER_ID,
	OFFICIAL_GUILDS,
	Roles,
	Time,
	USER_ID_REGEX,
} from "./utils/constants.js";

const client = new Client({
	intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
});

client.once(Events.ClientReady, (client) => {
	console.info("Bot is ready");

	setInterval(async () => {
		const mainGuild = client.guilds.cache.get(Guilds.Cozyhive);
		if (!mainGuild) return;

		const formatter = new Intl.NumberFormat("en-US");
		const guilds = client.guilds.cache.filter((guild) => OFFICIAL_GUILDS.includes(guild.id));
		const totalEmojis = guilds.reduce((acc, guild) => guild.emojis.cache.size + acc, 0);

		await mainGuild.channels
			.edit(Channels.General, {
				topic: `${formatter.format(mainGuild.memberCount)} Members | ${formatter.format(totalEmojis)} Emojis`,
			})
			.catch(noop);
	}, 30 * Time.Minutes);
});

client.on(Events.Error, console.error);

client.on(Events.MessageCreate, async (message) => {
	if (
		!message.inGuild() ||
		!OFFICIAL_GUILDS.includes(message.guildId) ||
		message.channel.name !== ALERTS_CHANNEL_NAME ||
		message.author.id !== NIGHTHAWK_BOT_USER_ID ||
		(!message.content.includes("New Booster") && !message.content.includes("Stopped Boosting"))
	) {
		return;
	}

	const userMatch = USER_ID_REGEX.exec(message.content);
	const userId = userMatch?.[1] as Snowflake | null;
	assert(userId, "Could not match user id from message");

	const boosterStatus = message.content.startsWith("New Booster")
		? BoosterStatus.Started
		: message.content.startsWith("Stopped Boosting")
		? BoosterStatus.Stopped
		: null;
	assert(boosterStatus !== null, "Could not determine if the message was a new booster or a stopped booster");

	const mainGuild = client.guilds.cache.get(Guilds.Cozyhive);
	assert(mainGuild, "Could not find main guild");

	const channel = mainGuild.channels.cache.get(Channels.NitroBoosters);

	const fetchedMember = await mainGuild.members.fetch({ cache: false, user: userId }).catch(noop);
	assert(fetchedMember, "Could not fetch member");

	if (boosterStatus === BoosterStatus.Started) {
		await fetchedMember.roles.add([Roles.Booster, Roles.SecondaryBooster]);

		if (channel?.isTextBased()) {
			await channel
				.send(
					`${Emojis.NitroBoostHover} <@${userId}> just ascended and boosted the **${message.guild.name}** server! Well done, now make sure to check out <#${Channels.ColourRoles}>!`,
				)
				.catch(noop);
		}

		return;
	}

	const rolesToRemove: Snowflake[] = [];
	const has = (id: Snowflake): boolean => fetchedMember.roles.cache.has(id);

	if (!has(Roles.PrimaryBooster) && has(Roles.Booster)) rolesToRemove.push(Roles.Booster);
	if (has(Roles.SecondaryBooster)) rolesToRemove.push(Roles.SecondaryBooster);

	if (rolesToRemove.length) await fetchedMember.roles.remove(rolesToRemove);
});

await client.login();
