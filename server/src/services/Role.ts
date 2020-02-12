import mongoose from "mongoose";
import { ICollectionError } from "@daos";

const { Schema } = mongoose;

interface IRole {
  _id?: string;
  //TODO what to do with this 'any'
  permissions?: any;
  name: string;
}

interface IRoleCollection {
  data: IRole[];
  error: ICollectionError;
}

const roleSchema = new Schema(
  {
    name: {
      type: String,
      trim: true
    },
    permissions: {
      type: [String],
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Role = mongoose.model("Role", roleSchema);

export { Role, IRole, IRoleCollection };
