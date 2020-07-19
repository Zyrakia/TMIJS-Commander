"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandManager = void 0;
var CommandManager = /** @class */ (function () {
    function CommandManager(client) {
        var _this = this;
        this.client = client;
        this.commandsMap = new Map();
        this.client.addListener('chat', function (channel, userstate, message, self) {
            _this.parseChatEventToRegisteredCommand(channel, userstate, message, self, _this.client);
        });
    }
    CommandManager.prototype.registerCommand = function (command, executor) {
        if (!command || command.includes(' '))
            return;
        this.commandsMap.set(command.toLowerCase(), executor);
    };
    CommandManager.prototype.parseChatEventToRegisteredCommand = function (channel, userstate, message, self, client) {
        if (self)
            return;
        var messageArr = message.split(' ');
        var command = messageArr.shift();
        var args = __spreadArrays(messageArr);
        if (!command || !args)
            return;
        var origins = {
            command: command.toLowerCase(),
            arguments: args,
            channel: channel,
            user: userstate,
            client: client,
        };
        this.runCommand(origins);
    };
    CommandManager.prototype.runCommand = function (origins) {
        var command = this.commandsMap.get(origins.command);
        if (!command)
            return;
        command.invoke(origins);
    };
    CommandManager.prototype.getRegisteredCommandsAsArray = function () {
        return Array.from(this.commandsMap.keys());
    };
    return CommandManager;
}());
exports.CommandManager = CommandManager;
//# sourceMappingURL=CommandManager.js.map