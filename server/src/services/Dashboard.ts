import * as mongoose from 'mongoose';
import { IError } from '@daos';

const { Schema } = mongoose;


interface IDashboard {
  _id?: string;
  groupId?: number;
  name: string;
}

interface IDashboardCollection {
  data: IDashboard[];
  error: IError;
}

const groupSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Dashboard = mongoose.model('Dashboard', groupSchema);

interface IDashboard {
  name: string;
  userId: string;
}

export {
  Dashboard,
  IDashboard,
  IDashboardCollection,
};
