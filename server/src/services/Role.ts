import mongoose from 'mongoose';
import { IError } from '@daos';

const { Schema } = mongoose;

interface IRole {
  _id?: string;
  permissions?: string[];
  name: string;
}

interface IRoleCollection {
  data: IRole[];
  error: IError;
}

const roleSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    permissions: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

const Role = mongoose.model('Role', roleSchema);

export {
  Role, IRole, IRoleCollection,
};
