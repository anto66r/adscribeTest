import { UserDao } from './User/UserDao';
import { RoleDao } from './Role/RoleDao';
import { ReportDao } from './Report/ReportDao';
import { DashboardDao } from './Dashboard/DashboardDao';
import {
  IUser, IRole, IDashboard, IUserGeneral, IReport,
} from '../services';
import { IError, ICollection } from './types';

const wrapCollection = (
  data:
  IRole |
  IRole[] |
  IUser |
  IUser[] |
  IReport[] |
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
  RoleDao,
  ReportDao,
  DashboardDao,
  IError,
  ICollection,
  wrapCollection,
};
