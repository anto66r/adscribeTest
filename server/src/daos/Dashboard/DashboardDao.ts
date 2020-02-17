import { wrapCollection } from '@daos';
import { Dashboard, IDashboardCollection } from '../../services';

export interface IDashboardDao {
  getByUser: (userId: string) => Promise<IDashboardCollection>;
  add: (user: IDashboardCollection) => Promise<void>;
  update: (user: IDashboardCollection) => Promise<void>;
  delete: (_id: string) => Promise<void>;
}

export class DashboardDao implements IDashboardDao {
  public async getByUser(userId: string): Promise<IDashboardCollection> {
    return Dashboard.find({ userId }).lean()
      .then((dashboards) => wrapCollection(dashboards) as IDashboardCollection)
      .catch((err: Error) => wrapCollection([], { data: err }) as IDashboardCollection);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public add(user: IDashboardCollection): Promise<void> {
    return {} as any;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public update(user: IDashboardCollection): Promise<void> {
    // TODO
    return {} as any;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public delete(_id: string): Promise<void> {
    // TODO
    return {} as any;
  }
}
