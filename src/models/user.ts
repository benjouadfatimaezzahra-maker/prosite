import { Schema, model, models, type Model, type Document, type Types } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
}

const UserSchema = new Schema<IUser, Model<IUser>>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const User = (models.User as Model<IUser>) || model<IUser>("User", UserSchema);
