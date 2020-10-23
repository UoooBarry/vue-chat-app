import mongoose, { Schema, Document } from 'mongoose';
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    login: ILogin;
}
export interface ILogin {
    username: string;
    password: string;
}
declare const UserSchema: Schema;
declare const _default: mongoose.Model<IUser, {}>;
export default _default;
export { UserSchema };
