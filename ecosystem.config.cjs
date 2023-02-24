exports.apps = [
	{
		autorestart: true,
		env: {
			NODE_ENV: "production",
		},
		node_args: "--enable-source-maps",
		name: "cozyhive-bot",
		script: "yarn start",
	},
];
