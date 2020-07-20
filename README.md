# Commander

### TMI.js client command integration simplified.

# Installation

### **NPM**

```bash
$ npm i tmijs-commander --save
```

### **YARN**

```bash
$ yarn add tmijs-commander
```

# Guide

This guide will show you how to register the `!debug` command the command executor `DebugCommand`.

## **Initializing a commander**

Import necessary modules

```javascript
import { Commander, CommandExecutor, CommandOrigins } from 'tmijs-commander';
```

To begin you must initialize a new Commander and link it with a TMIJS Client. Then you have to register the command after the client connects, with an identifier and an executor.

Example with class based executor

```javascript
//Initialize client and commander
const client = tmi.client(yourOptions);
const commander = new Commander(client);

//Connect client and register command
client.connect().then(() => {
	commander.registerCommand('!debug', new DebugCommand());
});
```

## **Creating the executor**

As you saw above, we registered the `!debug` command to an instance of the the executor `DebugCommand`, but now we must create that executor. An executor can either be an anonymous function, or in this case a class that extends `CommandExecutor`.

A command executor class will have a single required function by the name of `invoke`, this function will be called when the linked command is executed.

The invoke method inside an executor, or the anonymous function, can have the `CommandOrigins` parameter, this will give the method access to all command details, like the channel, author, arguments, and the base client.

This is the `DebugCommand` class we referenced earlier.

```javascript
class DebugCommand extends CommandExecutor {
    //This function will be called when !debug is executed
    public invoke(origins: CommandOrigins) {
        origins.client.ping().then((ping) => {
			origins.client.say(origins.channel, `Latency: ${ping[0] * 1000}ms`);
		});
    }
}
```

These couple of lines will implement the debug command into your client so it will be ran when a user types `!debug` in any channel your client has joined.
