exports.apps = [
	{
		name: "cozyhive-bot",
		script: "./dist/index.js",
		node_args: "--enable-source-maps --env-file=.env",
	},
];
