import { env } from "node:process";

if (!env.DISCORD_TOKEN) {
	throw new Error("DISCORD_TOKEN environment variable is required");
}

export const DISCORD_TOKEN = env.DISCORD_TOKEN;
