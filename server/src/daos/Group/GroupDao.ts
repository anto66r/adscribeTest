import { wrapCollection } from '@daos';
import { IGroupDao } from 'src/daos/Group/types';
// eslint-disable-next-line no-unused-vars
import { Group, IGroupCollection } from '@services';

export class GroupDao implements IGroupDao {
  /**
   *
   */
  public async getAll(): Promise<IGroupCollection> {
    return Group.find({}).lean()
      .then((groups) => wrapCollection(groups, {}) as IGroupCollection)
      .catch((err: Error) => wrapCollection([], { data: err }) as IGroupCollection);
  }

  /**
   *
   * @param group
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public add(group: IGroupCollection): Promise<IGroupCollection> {
    return {} as any;
  }

  /**
   *
   * @param group
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public update(group: IGroupCollection): Promise<IGroupCollection> {
    // TODO
    return {} as any;
  }

  /**
   *
   * @param groupId
   */
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  public delete(id: string): Promise<void> {
    // TODO
    return {} as any;
  }
}
