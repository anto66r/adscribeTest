import {
  IDashboard, IRole, IUser, IUserCollection,
} from 'src/services';

export interface IUserDao {
  add: (user: IUser) => Promise<IUserCollection>;
  update: (user: IUser) => Promise<IUserCollection>;
  delete: (_id: string) => Promise<IUserCollection>;
  getAll: () => Promise<IUserCollection>;
  getById: (_id: string) => Promise<IUserCollection> ;
  getByCognitoId: (cognitoId: string) => Promise<IUserCollection> ;
  getByUsername: (username: string) => Promise<IUserCollection>;
}

export type TRequestParams = {
  _id: string;
};

export interface IDomains {
  users?: IUser[];
  dashboard?: IDashboard;
  roles?: IRole[];
}
