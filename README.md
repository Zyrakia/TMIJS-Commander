This is an incredibly simple library to easily implement commands into a TMIJS client.
## Contents
This library has three files, that default export it's contents.

1. CommandManager.ts - The class used to manage commands for a TMIJS client.
2. CommandExecutor.ts - The interface that any class that handles a command will implement.
3. CommandOrigins.ts - The interface containing command origins. This is sent to the CommandExecutor `invoke()` method

You can take the code out of these files and implement them into your own project so they will work in your situation, modify them however you want. I am deciding to place these files into a public repository because it took me a while to find a command system I liked, and I thought maybe some people have the same issue.

## Guide
This is an example to register the command `!debug` to the CommandExecutor `DebugCommand`.
##### index.ts:
```javascript
const client = tmi.client(options);
const commandManager = new CommandManager(client);
client.connect().then(() => {
    commandManager.registerCommand("!debug", new DebugCommand());
    console.log("Client is ready.");
});
```
This would start the client, `options` being your own TMIJS client options, and register the command `!debug` to the executor `DebugCommand`.
##### DebugCommand.ts:
```javascript
export default class DebugCommand implements CommandExecutor {
    public invoke(origin: CommandOrigins) {
        origin.client.ping().then((ping) => {
            origin.client.say(origin.channel, `Latency: ${ping[0] * 1000}ms`);
        });
    }
}
```
Every executor must have a function of name `invoke` that is called when the manager detects their command has been run, this function should have an argument of type `CommandOrigins` so the manager can send the information you might need forward.
