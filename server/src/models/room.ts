import mongoose, { Schema, Document } from 'mongoose';


export interface IRoom extends Document {
  roomName: string;
  currentUser?: Array<Schema.Types.ObjectId>,
}

const RoomScheme: Schema = new Schema({
  roomName: { type: String, required: true },
  currentUser: [{type: Schema.Types.ObjectId, ref:'User'}]
})

// Export the model and return your IRoom interface
export default mongoose.model<IRoom>('Room', RoomScheme);