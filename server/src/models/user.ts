import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  login: ILogin
}

export interface ILogin {
  username: string;
  password: string;
}

const loginScheme: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String,
    required: true
  }
})

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  login: {type: loginScheme, required: true}
});

// Export the model and return your IUser interface
export default mongoose.model<IUser>('User', UserSchema);