import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IError } from '@daos';
import { IDashboard } from 'src/services/Dashboard';
import { IRole } from 'src/services/Role';

const { Schema } = mongoose;


interface IUser {
  id?: string;
  authId?: string;
  name: string;
  email: string;
  roles?: string[];
  phoneNumber?: string;
}

interface IUserCollection {
  data: IUser[];
  error: IError;
}

interface IUserGeneral {
  user: IUser;
  domains: {
    dashboards?: IDashboard[];
    users?: IUser[];
    roles?: IRole[];
  };
}

interface IUserGeneralCollection {
  data: IUserGeneral;
  error: IError;
}


const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: uuid,
    },
    name: {
      type: String,
      trim: true,
    },
    roles: {
      type: [String],
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    authId: {
      type: String,
      required: true,
      unique: true,
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
  IUserGeneral,
  IUserGeneralCollection,
};
