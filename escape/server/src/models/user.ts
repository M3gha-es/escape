import { Schema, model, Model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserInterface extends Document {
  firstName: string,
  lastName: string,
  userName?:string|undefined,
  email: string,
  password: string,
}

const userSchema = new Schema<UserInterface>({
  firstName: String,
  lastName: String,
  userName:String,
  email: String,
  password: String,
  //tokens: [{token: String}]
  }, { collection: process.env.USER_OLLECTION});

  userSchema.pre('save', async function (next) {
      this.password = await bcrypt.hash(this.password, 8)
    next()
  })


  export const User = model<UserInterface>('User', userSchema);
