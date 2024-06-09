import mongoose, { Schema } from "mongoose";

export interface User {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
}


const UserSchema = new mongoose.Schema<User>(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
