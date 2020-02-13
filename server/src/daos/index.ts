import { UserDao } from './User/UserDao';
import { GroupDao } from './Group/GroupDao';
import { RoleDao } from './Role/RoleDao';
import { IUser, IRole } from '../services';

interface IError {
  message?: string;
  technical?: string;
  code?: string;
  data?: object;
}

interface ICollection {
  data: IRole[] | IUser[];
  error?: IError;
}

const wrapCollection = (data: IRole[] | IUser[], error?: IError): ICollection => ({
  data,
  error,
});

export {
  UserDao,
  GroupDao,
  RoleDao,
  IError,
  ICollection,
  wrapCollection,
};
