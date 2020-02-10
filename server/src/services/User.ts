import mongoose from 'mongoose';
import { ICollectionError } from '@daos';

const { Schema } = mongoose;


interface IUser {
  cognitoId?: string;
  name: string;
}

interface IUserCollection {
  data: IUser;
  error: ICollectionError;
}

const userSchema = new Schema(
  {
    name: {
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
  name: string;
}

export {
  User,
  IUser,
  IUserCollection,
};
