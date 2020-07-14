import CommandExecutor from "./CommandExecutor";
import CommandOrigins from "./CommandOrigins";
import { Client, ChatUserstate } from "tmi.js";

export default class CommandManager {
    private commandsMap: Map<string, CommandExecutor>;
    private client: Client;

    constructor(client: Client) {
        this.client = client;
        this.commandsMap = new Map();
        this.client.addListener("chat", (channel, userstate, message, self) => {
            //TODO
            //? check if there is a better way to pass in the commandsMap and client without them being undefined
            //? if you overload the function and use (this.) in the function it is out of scope and therefor undefined
            //TODO
            this.parseChatEventToRegisteredCommand(
                channel,
                userstate,
                message,
                self,
                this.commandsMap,
                this.client
            );
        });
    }

    public registerCommand(command: string, executor: CommandExecutor) {
        if (!command || command.includes(" ")) return;
        this.commandsMap.set(command.toLowerCase(), executor);
    }

    private parseChatEventToRegisteredCommand(
        channel: string,
        userstate: ChatUserstate,
        message: string,
        self: boolean,
        commandsMap: Map<string, CommandExecutor>,
        client: Client
    ) {
        if (self) return;

        const messageArr = message.split(" ");
        const cmd = messageArr.shift();
        const args = [...messageArr];
        if (!cmd || !args) return;

        const origins: CommandOrigins = {
            command: cmd,
            arguments: args,
            channel: channel,
            user: userstate,
            client: client,
        };

        if (!commandsMap.has(origins.command.toLowerCase())) return false;

        this.runCommand(origins);
    }

    private runCommand(origins: CommandOrigins) {
        this.commandsMap.get(origins.command)!.invoke(origins);
    }

    public getRegisteredCommandsAsArray() {
        return Array.from(this.commandsMap.keys());
    }
}
