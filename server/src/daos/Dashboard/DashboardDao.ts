import { wrapCollection } from '@daos';
import { Dashboard, IDashboardCollection } from '@services';
import { IDashboardDao } from './types';

export class DashboardDao implements IDashboardDao {
  public async getByUserId(_id: string): Promise<IDashboardCollection> {
    return Dashboard.find({ userId: _id }).lean()
      .then((dashboards) => wrapCollection(dashboards) as IDashboardCollection)
      .catch((err: Error) => wrapCollection([], { data: err }) as IDashboardCollection);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public add(user: IDashboardCollection): Promise<IDashboardCollection> {
    return {} as any;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public update(user: IDashboardCollection): Promise<IDashboardCollection> {
    // TODO
    return {} as any;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public delete(_id: string): Promise<void> {
    // TODO
    return {} as any;
  }
}
