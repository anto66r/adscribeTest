import {
  IDashboard, IRole, IUser, IUserGeneral,
} from 'src/services';

export interface IError {
  message?: string;
  technical?: string;
  code?: string;
  data?: object;
}

export interface ICollection {
  data:
  IRole | IRole[] |
  IUser | IUser[] |
  IDashboard | IDashboard[] |
  IUserGeneral | IUserGeneral[] ;
  error?: IError;
}
