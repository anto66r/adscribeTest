import { UserDao } from './User/UserDao';
import { GroupDao } from './Group/GroupDao';
import { RoleDao } from './Role/RoleDao';
import { DashboardDao } from './Dashboard/DashboardDao';
import {
  IUser, IRole, IDashboard, IUserGeneral,
} from '../services';
import { IError, ICollection } from './types';

const wrapCollection = (
  data:
  IRole |
  IRole[] |
  IUser |
  IUser[] |
  IDashboard |
  IDashboard[] |
  IUserGeneral |
  IUserGeneral[],
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
