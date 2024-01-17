import assert from "node:assert";
import { env } from "node:process";

assert(typeof env.DISCORD_TOKEN === "string", "DISCORD_TOKEN must be set");

export const DISCORD_TOKEN = env.DISCORD_TOKEN;
