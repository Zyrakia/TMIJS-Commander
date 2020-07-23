[![Npm Version](https://img.shields.io/npm/v/tmijs-commander.svg?style=flat)](https://www.npmjs.org/package/tmijs-commander) [![Downloads](https://img.shields.io/npm/dm/tmijs-commander.svg?style=flat)](https://www.npmjs.org/package/tmijs-commander)

## Introduction

Commander is a library to simplify command integration into a [tmi.js](https://github.com/tmijs/tmi.js) client (Twitch Bot).

Features:

-   Easily register chat commands
-   Parse arguments into an accessible array
-   Handle command execution with a class or function
-   Limit a command to only work in certain channels
-   Disable and enable commands through code
-   Written in Typescript, with type definitions included

## Installation

**NPM**

```bash
$ npm i tmijs-commander --save
```

**YARN**

```bash
$ yarn add tmijs-commander
```

**Build Yourself (Windows / [Git ](https://git-scm.com/downloads) / [NodeJS](https://nodejs.org/en/download/) )**

```bash
$ git clone https://github.com/Zyrakia/TMIJS-Commander.git
$ cd tmijs-commander
$ npm install
```

## Get Started

View the quick start guide below, or view the full [docs](https://github.com/Zyrakia/TMIJS-Commander/blob/master/DOCS.md) to get a broader insight on what Commander can do for you.

## Quick Start

This snippet demonstrate how to register the command `!hello` to your client. I will be using Typescript, because it is what the library is built it, and I highly recommend you do the same.

```javascript
import tmi from "tmi.js"
import { Commander, CommandExecutor, CommandOrigins } from "tmijs-commander";

const options = {YOUR CLIENT OPTIONS HERE};
const client = tmi.client(options);

client.connect().then(() => {
    const commander = new Commander(client);
    commander.registerCommand("!hello", new HelloCommand());
});

class HelloCommand extends CommandExecutor {
    public invoke(origins: CommandOrigins) {
        origins.client.say(origins.channel, "Hello World!");
    }
}
```

When a user now executes the command `!hello` the `invoked` method will be called on the linked executor, which says `Hello World!` in the channel that the command was sent in.
