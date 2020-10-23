/// <reference types="node" />
import socketio from 'socket.io';
import http from 'http';
declare const chatServer: http.Server;
declare const io: socketio.Server;
export default io;
export { chatServer };
