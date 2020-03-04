import {
  IDashboard, IRole, IUser, IUserCollection,
} from 'src/services';

export interface IUserDao {
  add: (user: IUser) => Promise<IUserCollection>;
  update: (user: IUser) => Promise<IUserCollection>;
  delete: (_id: string) => Promise<IUserCollection>;
  getAll: () => Promise<IUserCollection>;
  getById: (_id: string) => Promise<IUserCollection> ;
  getByAuthId: (authId: string) => Promise<IUserCollection> ;
  getByEmail: (email: string) => Promise<IUserCollection>;
}

export type TRequestParams = {
  _id: string;
};

export interface IDomains {
  users?: IUser[];
  dashboards?: IDashboard[];
  roles?: IRole[];
}
