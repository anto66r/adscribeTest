import { wrapCollection } from '@daos';
// eslint-disable-next-line no-unused-vars
import { Group, IGroupCollection } from '../../services';

export interface IGroupDao {
  getAll: () => Promise<IGroupCollection[]>;
  add: (group: IGroupCollection) => Promise<void>;
  update: (group: IGroupCollection) => Promise<void>;
  delete: (_id: string) => Promise<void>;
}

export class GroupDao implements IGroupDao {
  /**
   *
   */
  // eslint-disable-next-line class-methods-use-this
  public async getAll(): Promise<IGroupCollection[]> {
    // @ts-ignore
    return Group.find({}).then((groups) => wrapCollection(groups, {})) // todo, check! removing ts-ignore
      .catch((err: any) => wrapCollection([], { data: err }));
  }

  /**
   *
   * @param group
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public add(group: IGroupCollection): Promise<void> {
    return {} as any;
  }

  /**
   *
   * @param group
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public update(group: IGroupCollection): Promise<void> {
    // TODO
    return {} as any;
  }

  /**
   *
   * @param groupId
   */
  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-unused-vars
  public delete(_id: string): Promise<void> {
    // TODO
    return {} as any;
  }
}
