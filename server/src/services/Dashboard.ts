import * as mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IError } from '@daos';

const { Schema } = mongoose;


interface IDashboardCollection {
  data: IDashboard[];
  error: IError;
}

const dashboardSchema = new Schema(
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
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Dashboard = mongoose.model('Dashboard', dashboardSchema);

interface IDashboard {
  id?: string;
  name?: string;
  userId?: string;
}

export {
  Dashboard,
  IDashboard,
  IDashboardCollection,
};
