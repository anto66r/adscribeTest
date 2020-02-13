import { ICollectionError } from '@daos';
import mongoose from 'mongoose';

const { Schema } = mongoose;


interface IUser {
  _id?: string;
  cognitoId?: string;
  username: string;
}

interface IUserCollection {
  data: IUser[];
  error: ICollectionError;
}

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
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

interface IUser {
  cognitoId?: string;
  username: string;
}

export {
  User,
  IUser,
  IUserCollection,
};
