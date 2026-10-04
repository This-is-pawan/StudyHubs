import { models, model, Schema, Document } from "mongoose";
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}
const userShema = new Schema<IUser>({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    trim:true,
  },
});

export const User = models.User || model<IUser>("User", userShema);
