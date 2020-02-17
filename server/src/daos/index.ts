import { UserDao } from './User/UserDao';
import { GroupDao } from './Group/GroupDao';
import { RoleDao } from './Role/RoleDao';
import { DashboardDao } from './Dashboard/DashboardDao';
import { IUser, IRole, IDashboard } from '../services';

interface IError {
  message?: string;
  technical?: string;
  code?: string;
  data?: object;
}

interface ICollection {
  data: IRole[] | IUser[] | IDashboard[];
  error?: IError;
}

const wrapCollection = (
  data: IRole[] | IUser[] | IDashboard[],
  error?: IError,
): ICollection => ({
  data,
  error,
});

export {
  UserDao,
  GroupDao,
  RoleDao,
  DashboardDao,
  IError,
  ICollection,
  wrapCollection,
};
