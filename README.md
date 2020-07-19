A super simple library to easily implement commands into a TMIJS client. I wanted to turn this into an NPM module, but I don't think it's useful enough for that. This sort of manager and executor model can be applied to any text based command service really, it is used in SpigotMC for Minecraft and I have also implemented this into a Discord bot with minor changes
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
