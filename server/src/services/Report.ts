import * as mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import { IError } from '@daos';

const { Schema } = mongoose;


interface IReportCollection {
  data: IReport[];
  error: IError;
}

const reportSchema = new Schema(
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

const Report = mongoose.model('Report', reportSchema);

interface IReport {
  id?: string;
  name?: string;
  userId?: string;
}

export {
  Report,
  IReport,
  IReportCollection,
};
