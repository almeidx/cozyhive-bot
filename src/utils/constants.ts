import type { Snowflake } from "@discordjs/core";

export const enum Guilds {
	Cozyhive = "493351982887862283",
	Flags = "653681924384096287",
	Pepe2 = "513338222810497041",
	Pepe3 = "523043978178723840",
	Pepe4 = "718076393295970376",
	Pepe5 = "803251072877199400",
	Pepe6 = "991663653629722724",
	Pepe7 = "991663743538831421",
	Pepe8 = "991663828976816188",
	Pepe9 = "991663910425985125",
	Pride = "850117043717275729",
	Signs = "750492934343753798",
	Xmas = "786212572285763605",
}

export const OFFICIAL_GUILDS: Snowflake[] = [
	Guilds.Cozyhive,
	Guilds.Pepe2,
	Guilds.Pepe3,
	Guilds.Pepe4,
	Guilds.Pepe5,
	Guilds.Pepe6,
	Guilds.Pepe7,
	Guilds.Pepe8,
	Guilds.Pepe9,
	Guilds.Flags,
	Guilds.Signs,
	Guilds.Xmas,
	Guilds.Pride,
];

export const enum Channels {
	ColourRoles = "829693921079853106",
	General = "493351982887862287",
	NitroBoosters = "585529480001355776",
}

export const enum Roles {
	Booster = "678539342666530816",
	PrimaryBooster = "585529237096628235",
	SecondaryBooster = "678539154258264095",
}

export const enum Emojis {
	NitroBoostHover = "<a:aPES_NitroBoostHover:760847016644313088>",
}

export const ALERTS_CHANNEL_NAME = "alerts";
export const NIGHTHAWK_BOT_USER_ID = "740892250820706345";
export const USER_ID_REGEX = /User: (\d{16,20})$/;

export const enum BoosterStatus {
	Started,
	Stopped,
}

export const enum Time {
	Seconds = 1_000,
	Minutes = 60 * Seconds,
	Hours = 60 * Minutes,
	Days = 24 * Hours,
	Weeks = 7 * Days,
	Months = 30 * Days,
	Years = 365 * Days,
}
