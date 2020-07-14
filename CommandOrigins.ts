import { Userstate, Client } from "tmi.js";

export default interface CommandOrigins {
    command: string;
    arguments: string[];
    channel: string;
    user: Userstate;
    client: Client;
}
