"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatServer = void 0;
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("../app"));
const message_1 = __importDefault(require("../models/message"));
const socketio_jwt_1 = __importDefault(require("socketio-jwt"));
const path_1 = __importDefault(require("path"));
const room_1 = __importDefault(require("../models/room"));
require('dotenv').config({ path: path_1.default.resolve(__dirname, '../../.env') });
const chatServer = http_1.default.createServer(app_1.default);
exports.chatServer = chatServer;
const io = socket_io_1.default.listen(chatServer);
// Run when client connected
io.on('connection', socketio_jwt_1.default.authorize({
    secret: process.env.ACCESS_TOKEN_SECRET,
    timeout: 15000 // 15 seconds to send the authentication message
}))
    .on('authenticated', (socket) => {
    socket.on('joinRoom', (room_id) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const room = yield room_1.default.findById(room_id);
        if (!room || !room.currentUser)
            throw 'No room';
        const user_id = socket.decoded_token.user._id;
        if (!room.currentUser.includes(user_id)) {
            (_a = room === null || room === void 0 ? void 0 : room.currentUser) === null || _a === void 0 ? void 0 : _a.push(user_id);
            yield (room === null || room === void 0 ? void 0 : room.save());
        }
        //Broadcast when a user connect
        const joinMessage = new message_1.default('0', 'Chat bot', `${socket.decoded_token.user.firstName} has joined the chat`);
        socket.broadcast.to(room_id).emit('message', joinMessage);
        updateRoom(room_id);
        socket.join(room_id);
        //Runs when client disconnected
        socket.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
            const leftMessage = new message_1.default('0', 'Chat bot', `${socket.decoded_token.user.firstName} has left the chat`);
            if (!room || !room.currentUser)
                throw 'No room';
            room.currentUser = room.currentUser.filter((id) => {
                return id != user_id;
            });
            yield room.save();
            updateRoom(room_id);
            socket.broadcast.to(room_id).emit('message', leftMessage);
        }));
        // Listen for chat message
        socket.on("chatMessage", (msg) => {
            const chatMessage = new message_1.default(socket.decoded_token.user._id, socket.decoded_token.user.firstName, msg);
            io.to(room_id).emit('message', chatMessage);
        });
    }));
});
function updateRoom(room_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const room = yield room_1.default.findById(room_id).populate('currentUser', 'firstName').exec();
        io.to(room_id).emit('roomUpdate', room);
    });
}
exports.default = io;
