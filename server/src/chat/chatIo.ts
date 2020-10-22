import socketio from 'socket.io';
import http from 'http';
import app from '../app';
import message from '../models/message';
import socketioJwt from 'socketio-jwt';

import path from "path";
import { Secret } from 'jsonwebtoken';
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const chatServer = http.createServer(app);
const io = socketio(chatServer);

// Run when client connected
io.on('connection',
  socketioJwt.authorize({
    secret: <any>process.env.ACCESS_TOKEN_SECRET,
    timeout: 15000 // 15 seconds to send the authentication message
  }))
  .on('authenticated', (socket: any) => {
    console.log('New WS Connection');
    //Broadcast when a user connect
    const joinMessage = new message('Chat bot', 'A user has joined the chat');
    socket.broadcast.emit('message', joinMessage);

    //Runs when client disconnected
    socket.on('disconnect', () => {
      const leftMessage = new message('Chat bot', 'A user has left the chat');
      socket.broadcast.emit('message', leftMessage);
    });

    // Listen for chat message
    socket.on("chatMessage", (msg: string) => {
      const chatMessage = new message(socket.decoded_token.user.firstName, msg);
      io.emit('message', chatMessage);
    })
  })

export default io;
export { chatServer };