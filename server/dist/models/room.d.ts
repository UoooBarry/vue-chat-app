import mongoose, { Schema, Document } from 'mongoose';
export interface IRoom extends Document {
    roomName: string;
    currentUser?: Array<Schema.Types.ObjectId>;
}
declare const _default: mongoose.Model<IRoom, {}>;
export default _default;
