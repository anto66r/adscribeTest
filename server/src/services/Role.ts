import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IError } from '@daos';

const { Schema } = mongoose;

interface IRole {
  id?: string;
  permissions?: string[];
  name: string;
  noDelete: boolean;
  isSuper?: boolean;
}

interface IRoleCollection {
  data: IRole[];
  error: IError;
}

const roleSchema = new Schema(
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
      required: true,
      unique: true,
      minlength: 1,
    },
    permissions: {
      type: [String],
    },
    isSuper: {
      type: Boolean,
      default: false,
    },
    noDelete: {
      type: Boolean,
      default: false,
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
