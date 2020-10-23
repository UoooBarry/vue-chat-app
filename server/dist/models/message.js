"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class message {
    constructor(user_id, user, msg) {
        this.user_id = user_id;
        this.user = user,
            this.msg = msg,
            this.timestamp = new Date();
    }
}
exports.default = message;
