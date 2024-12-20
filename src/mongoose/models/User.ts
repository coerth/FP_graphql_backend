import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
  sub: string;
  email: string;
  name: string;
  nickname: string;
  timestamp: Date;
}

const UserSchema: Schema = new Schema({
  sub: { type: String, required: true, unique: true },
  email: { type: String, required: true,},
  name: { type: String, required: true },
  nickname: { type: String, required: true },
  timestamp: { type: Date, required: true, default: Date.now },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;