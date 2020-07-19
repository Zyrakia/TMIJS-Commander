"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var CommandManager = /** @class */ (function () {
    function CommandManager(client) {
        var _this = this;
        this.client = client;
        this.commandsMap = new Map();
        this.client.addListener('chat', function (channel, userstate, message, self) {
            //TODO
            //? check if there is a better way to pass in the commandsMap and client without them being undefined
            //? if you overload the function and use (this.) in the function it is out of scope and therefor undefined
            //TODO
            _this.parseChatEventToRegisteredCommand(channel, userstate, message, self, _this.commandsMap, _this.client);
        });
    }
    CommandManager.prototype.registerCommand = function (command, executor) {
        if (!command || command.includes(' '))
            return;
        this.commandsMap.set(command.toLowerCase(), executor);
    };
    CommandManager.prototype.parseChatEventToRegisteredCommand = function (channel, userstate, message, self, commandsMap, client) {
        if (self)
            return;
        var messageArr = message.split(' ');
        var cmd = messageArr.shift();
        var args = __spreadArrays(messageArr);
        if (!cmd || !args)
            return;
        var origins = {
            command: cmd,
            arguments: args,
            channel: channel,
            user: userstate,
            client: client,
        };
        if (!commandsMap.has(origins.command.toLowerCase()))
            return false;
        this.runCommand(origins);
    };
    CommandManager.prototype.runCommand = function (origins) {
        this.commandsMap.get(origins.command).invoke(origins);
    };
    CommandManager.prototype.getRegisteredCommandsAsArray = function () {
        return Array.from(this.commandsMap.keys());
    };
    return CommandManager;
}());
exports.default = CommandManager;
//# sourceMappingURL=CommandManager.js.map