import { IRole, IRoleCollection } from 'src/services';

export interface IRoleDao {
  getAll: () => Promise<IRoleCollection>;
  add: (role: IRole) => Promise<IRoleCollection>;
  update: (role: IRole) => Promise<IRoleCollection>;
  delete: (role: IRole) => Promise<IRoleCollection>;
}
