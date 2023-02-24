# Table of Contents

- [Table of Contents](#table-of-contents)
  - [Overview](#overview)
    - [Local setup](#local-setup)
      - [Cloning repository](#cloning-repository)
      - [Running the bot](#running-the-bot)
    - [Deployment with PM2](#deployment-with-pm2)
    - [Author](#author)

---

## Overview

This repository houses the source code for the [Cozyhive] Discord bot, which has the responsibility of syncing boosts across the multiple Discord servers, amongst other things.

---

### Local setup

This setup assumes you have [Git], and [Node.js] setup on your machine. This repository requires [Node.js] version 18 or higher, and uses the [Yarn 3] package manager, so you should have basic knowledge about how to use them.

#### Cloning repository

- `git clone git@github.com:almeidx/cozyhive-bot.git`
- `cd cozyhive-bot`
- `yarn`

Note: If you don't have yarn installed globally, you'll have to run `corepack enable`.

#### Running the bot

- `yarn start-dev`

---

### Deployment with PM2

- `pm2 start ecosystem.config.cjs`

---

### Author

**cozyhive-bot** © [almeidx], released under the [GNU AGPLv3] license.

> GitHub [@almeidx]

[cozyhive]: https://discord.gg/cozyhive
[git]: https://git-scm.com/
[node.js]: https://nodejs.org
[yarn 3]: https://yarnpkg.com
[gnu agplv3]: https://github.com/almeidx/pepe-website/blob/main/LICENSE
[almeidx]: https://almeidx.dev
[@almeidx]: https://github.com/almeidx
