import { wrapCollection } from '@daos';
import { User, IUserCollection } from '../../services';

export interface IUserDao {
  getAll: () => Promise<IUserCollection[]>;
  add: (user: IUserCollection) => Promise<void>;
  update: (user: IUserCollection) => Promise<void>;
  delete: (_id: string) => Promise<void>;
}

export class UserDao implements IUserDao {
  /**
   *
   */
  // eslint-disable-next-line class-methods-use-this
  public async getAll(): Promise<IUserCollection[]> {
    // @ts-ignore
    return User.find({}).then((users) => wrapCollection(users, {})) // todo, check! removing ts-ignore
      .catch((err) => wrapCollection([], { data: err }));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public add(user: IUserCollection): Promise<void> {
    return {} as any;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public update(user: IUserCollection): Promise<void> {
    // TODO
    return {} as any;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public delete(_id: string): Promise<void> {
    // TODO
    return {} as any;
  }
}
