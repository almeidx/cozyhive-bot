import type { Snowflake } from "@discordjs/core";

/** A map of guild ids to the channel ids of the alert channels for that guild */
export const alertChannels = new Map<Snowflake, Snowflake>();
