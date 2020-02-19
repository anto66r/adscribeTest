import mongoose from 'mongoose';
import { IError } from '@daos';

const { Schema } = mongoose;


interface IUser {
  _id?: string;
  cognitoId?: string;
  username: string;
  roles: string[];
}

interface IUserCollection {
  data: IUser[];
  error: IError;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    roles: {
      type: [String],
    },
    cognitoId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model('User', userSchema);

export {
  User,
  IUser,
  IUserCollection,
};
