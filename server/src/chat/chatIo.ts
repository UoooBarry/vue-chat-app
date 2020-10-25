import socketio from 'socket.io';
import http from 'http';
import app from '../app';
import message from '../models/message';
import socketioJwt, { ISocketCallback } from 'socketio-jwt';

import path from "path";
import Room, { IRoom } from '../models/room';
import { Types } from 'mongoose';

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const chatServer = http.createServer(app);
const io = socketio.listen(chatServer);

// Run when client connected
io.on('connection',
  socketioJwt.authorize({
    secret: <any>process.env.ACCESS_TOKEN_SECRET,
    timeout: 15000 // 15 seconds to send the authentication message
  }))
  .on('authenticated', (socket : any) => {
    socket.on('joinRoom', async (room_id: any) => {
      const room = await Room.findById(room_id);
      if (!room || !room.currentUser) throw 'No room';
      const user_id = socket.decoded_token.user._id;
      if (!room.currentUser.includes(user_id)) {
        room?.currentUser?.push(user_id);
        await room?.save();

      }
      //Broadcast when a user connect
      const joinMessage = new message('0', 'Chat bot', `${socket.decoded_token.user.firstName} has joined the chat`);
      socket.broadcast.to(room_id).emit('message', joinMessage);
      updateRoom(room_id);
      socket.join(room_id);

      //Runs when client disconnected
      socket.on('disconnect', async () => {
        const leftMessage = new message('0', 'Chat bot', `${socket.decoded_token.user.firstName} has left the chat`);
        if (!room || !room.currentUser) throw 'No room';

        room.currentUser = room.currentUser.filter((id) => {
          return id != user_id;
        })

        await room.save();

        updateRoom(room_id);
        socket.broadcast.to(room_id).emit('message', leftMessage);
      });

        // Listen for chat message
        socket.on("chatMessage", (msg: string) => {
          const chatMessage = new message(socket.decoded_token.user._id, socket.decoded_token.user.firstName, msg);
          io.to(room_id).emit('message', chatMessage);
        })
    })



  })

async function updateRoom(room_id: any) {
  const room = await Room.findById(room_id).populate('currentUser','firstName').exec();
  io.to(room_id).emit('roomUpdate', room);
}

export default io;
export { chatServer };