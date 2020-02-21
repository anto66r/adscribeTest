import { IDashboardCollection } from 'src/services';

export interface IDashboardDao {
  getByUserId: (_id: string) => Promise<IDashboardCollection>;
  add: (user: IDashboardCollection) => Promise<IDashboardCollection>;
  update: (user: IDashboardCollection) => Promise<IDashboardCollection>;
  delete: (_id: string) => Promise<void>;
}
