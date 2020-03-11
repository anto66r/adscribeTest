import { IGroupCollection } from 'src/services';

export interface IGroupDao {
  getAll: () => Promise<IGroupCollection>;
  add: (group: IGroupCollection) => Promise<IGroupCollection>;
  update: (group: IGroupCollection) => Promise<IGroupCollection>;
  delete: (_id: string) => Promise<void>;
}