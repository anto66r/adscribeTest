import * as mongoose from 'mongoose';
import { ICollectionError } from '@daos';

const { Schema } = mongoose;


interface IGroup {
  groupId?: number;
  name: string;
}

interface IGroupCollection {
  data: IGroup;
  error: ICollectionError;
}

const groupSchema = new Schema(
  {
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
