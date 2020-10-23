"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("./config/mongodb");
const authentication_1 = __importDefault(require("./routes/authentication"));
const chatIo_1 = require("./chat/chatIo");
const room_1 = __importDefault(require("./routes/room"));
const port = 3000;
const app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: false
}));
app.use('/api/auth/', authentication_1.default);
app.use('/api/room/', room_1.default);
app.listen(port, () => {
    console.log(`Seed server is listening at http://localhost:${port}`);
});
chatIo_1.chatServer.listen(port + 1, () => {
    console.log(`Seed chat server is listening at http://localhost:${port + 1}`);
});
exports.default = app;
