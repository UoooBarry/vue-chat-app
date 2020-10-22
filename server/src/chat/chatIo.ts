import socketio from 'socket.io';
import http from 'http';
import app from '../app';
import message from '../models/message';
import socketioJwt from 'socketio-jwt';

import path from "path";
import Room from '../models/room';
import room from '../models/room';
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
    socket.on('joinRoom', async (room_id: string) => {
      const room = await Room.findById(room_id);
      const user_id = socket.decoded_token.user._id;
      room?.currentUser?.push(user_id);
      await room?.save();
      socket.join(room_id);
      //Broadcast when a user connect
      const joinMessage = new message('Chat bot', `${socket.decoded_token.user.firstName} has joined the chat`);
      socket.broadcast.to(room_id).emit('message', joinMessage);

      //Runs when client disconnected
      socket.on('disconnect', async () => {
        const leftMessage = new message('Chat bot', `${socket.decoded_token.user.firstName} has left the chat`);
        if (!room || !room.currentUser) throw 'No room';
        const index = room.currentUser.findIndex((id) => id == user_id); //only compare the value not type
        if (index !== -1) {
          room.currentUser.splice(index, 1);
          await room.save();
          socket.broadcast.emit('message', leftMessage);
        }    
      });

        // Listen for chat message
        socket.on("chatMessage", (msg: string) => {
          const chatMessage = new message(socket.decoded_token.user.firstName, msg);
          io.to(room_id).emit('message', chatMessage);
        })
    })



  })

export default io;
export { chatServer };