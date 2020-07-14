import CommandOrigins from "./CommandOrigins";

export default interface CommandExecutor {
    invoke(origins: CommandOrigins): void;
}
