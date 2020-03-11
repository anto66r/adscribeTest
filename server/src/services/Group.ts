import * as mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IError } from '@daos';

const { Schema } = mongoose;


interface IGroup {
  id?: string;
  groupId?: number;
  name: string;
}

interface IGroupCollection {
  data: IGroup[];
  error: IError;
}

const groupSchema = new Schema(
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
    groupId: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Group = mongoose.model('Group', groupSchema);

interface IGroup {
  groupId?: number;
  name: string;
}

export {
  Group,
  IGroup,
  IGroupCollection,
};
