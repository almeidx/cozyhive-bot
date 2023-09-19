# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Local setup](#local-setup)
      - [Cloning repository](#cloning-repository)
      - [Running the bot locally](#running-the-bot-locally)
    - [Author](#author)

---

## Overview

This repository houses the source code for the [Cozyhive] Discord bot, which has the responsibility of syncing boosts across the multiple Discord servers, amongst other things.

---

### Local setup

This setup assumes you have [Git], and [Node.js] setup on your machine. This repository requires [Node.js] version 20 or higher, and uses the [pnpm] package manager, so you should have basic knowledge about how to use them.

#### Cloning repository

- `git clone git@github.com:almeidx/cozyhive-bot.git`
- `cd cozyhive-bot`
- `pnpm i`

Note: If you don't have corepack enabled, you can do it with `corepack enable`.

#### Running the bot locally

- `pnpm build`

Then:

- if you're using pm2, you can use:
  - `pm2 start ecosystem.config.cjs`

- if your environment variables are stored on the .env file, you can use:
  - `pnpm start:env`

- otherwise, use:
  - `pnpm start`

---

### Author

**cozyhive-bot** © [almeidx], released under the [GNU AGPLv3] license.

> GitHub [@almeidx]

[cozyhive]: https://discord.gg/cozyhive
[git]: https://git-scm.com/
[node.js]: https://nodejs.org
[pnpm]: https://pnpm.io/
[gnu agplv3]: https://github.com/almeidx/pepe-website/blob/main/LICENSE
[almeidx]: https://almeidx.dev
[@almeidx]: https://github.com/almeidx
