# TMIJS-Commander Documentation

Below are the different components of the library, with their available methods or code.

These modules include:

-   [Commander](<#Commander-(Class)>)
-   [Command](<#Command-(Class)>)
-   [CommandOrigins](<#CommandOrigins-(Interface)>)
-   [CommandExecutor](<#CommandExecutor-(Abstract-Class)>)
-   [AnonymousCommandExecutor](<#AnonymousCommandExecutor-(Function-Interface)>)

# Commander (Class)

**Contents**

-   [registerCommand](<#registerCommand():-void>) - Register a new command
-   [getID](<#getID():-number>) - Get the Commander's ID
-   [getCommand](<#getCommand():-Command>) - Get a specific command by identifier
-   [getCommands](<#getCommands():-Map<string,-Command>) - Get all registered commands
-   [getCommander](<#getCommander():-Commander>) - Get a specific commander by ID
-   [getCommanders](<#getCommanders():-Map<number,-Commander>) - Get all registered commanders

## Constructor

Create a new Commander by calling the constructor.

**Parameters:**

-   `client` - a tmi.js client

```java
const commander = new Commander(client);
```

## registerCommand(): void

Register a new command to the Commander.

**Parameters:**

-   `identifier`: _string_ - The command identifier
-   `executor`: _CommandExecutor | AnonymousCommandExecutor_ - The executor that will handle this command
-   `channels?`: _string[] | undefined_ - The channels this command can be run in

```javascript
commander.registerCommand('!hello', new HelloCommand(), ['#thisguy', '#thatguy']);
```

## getID(): number

Get the ID of a Commander.

```javascript
console.log(commander.getID());
```

## getCommand(): Command

Get a command by identifier.

**Parameters:**

-   `identifier`: _string_ - The command identifier

```javascript
console.log(commander.getCommand('!hello'));
```

## getCommands(): Map<string, Command>

Get all registered commands for a Commander.

```javascript
console.log(commander.getCommands());
```

## getCommander(): Commander

Get a Commander by ID. (STATIC METHOD)

**Parameters:**

-   `id`: _number_ - The Commander's ID.

```javascript
console.log(Commander.getCommander(0));
```

## getCommanders(): Map<number, Commander>

Get all registered commanders. (STATIC METHOD)

```javascript
console.log(Commander.getCommanders());
```

# Command (Class)

This class acts as a mediator between the Commander and the executor to parse and validate command information to make sure it can run.

I will not specify it's constructor here because it is only used by the Commander when registering new commands.

**Contents**

-   [run](<#run():-void>) - Validate and send run request to the commands executor
-   [setEnabled](<#setEnabled():-void>) - Set the commands enabled status
-   [getEnabled](<#getEnabled():-boolean>) - Get the commands enabled status
-   [getExecutor](<#getExecutor():-CommandExecutor-|-AnonymousCommandExecutor>) - Get the commands executor
-   [getAllowedChannels](<#getAllowedChannels():-string[]>) - Get all the channels the command can run in

## run(): void

Checks if the command can be run, if yes then it sends the command to the executor.

**Parameters:**

-   `origins`: _CommandOrigins_ - The origins of the command, this will be sent on to the executor.

```javascript
command.run(origins);
```

## setEnabled(): void

Set the commands enabled status.

**Parameters:**

-   `enabled`: _boolean_ - If you want the command to be enabled or disabled.

```javascript
command.setEnabled(false);
```

## getEnabled(): boolean

Get the commands enabled status.

```javascript
console.log(command.getEnabled());
```

## getExecutor(): CommandExecutor | AnonymousCommandExecutor

Gets the commands executor.

```javascript
console.log(command.getExecutor());
```

## getAllowedChannels(): string[]

Get the channels that the command is allowed to run in.

```javascript
console.log(command.getAllowedChannels());
```

# CommandOrigins (Interface)

```javascript
interface CommandOrigins {
	identifier: string;
	arguments: string[];
	channel: string;
	author: Userstate;
	client: Client;
}
```

# CommandExecutor (Abstract Class)

```javascript
abstract class CommandExecutor {
	abstract invoke(origins: CommandOrigins): void;
}
```

# AnonymousCommandExecutor (Function Interface)

```javascript
interface AnonymousCommandExecutor {
	(origins: CommandOrigins): void;
}
```
