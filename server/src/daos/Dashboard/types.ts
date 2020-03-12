import { IDashboardCollection } from 'src/services';

export interface IDashboardDao {
  getByUserId: (id: string) => Promise<IDashboardCollection>;
  add: (user: IDashboardCollection) => Promise<IDashboardCollection>;
  update: (user: IDashboardCollection) => Promise<IDashboardCollection>;
  delete: (id: string) => Promise<void>;
}
