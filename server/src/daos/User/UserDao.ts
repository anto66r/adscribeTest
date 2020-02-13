import { wrapCollection } from '@daos';
import { IUserCollection, User } from '../../services';

export interface IUserDao {
  getAll: () => Promise<IUserCollection>;
  add: (user: IUserCollection) => Promise<void>;
  update: (user: IUserCollection) => Promise<void>;
  delete: (_id: string) => Promise<void>;
}

export class UserDao implements IUserDao {
  /**
   *
   */
  // eslint-disable-next-line class-methods-use-this
  public async getAll(): Promise<IUserCollection> {
    return User.find({}).lean()
      .then((users) => wrapCollection(users) as IUserCollection)
      .catch((err) => wrapCollection([], { data: err }) as IUserCollection);
  }

  public async findUser(username: string): Promise<IUserCollection> {
    return User.find({ username }).lean()
      .then((user) => wrapCollection(user, {}) as IUserCollection)
      .catch((err) => wrapCollection([], { data: err }) as IUserCollection);
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

  // public async createUser(username: string, cognitoId: string): Promise<IUserCollection> {
  //   // Find if exists
  //   const possibleUser = await User.find({ username });

  //   if (possibleUser.length) {
  //     throw Error('User exists');
  //   }

  //   const user = await User.create({
  //     username,
  //     cognitoId,
  //   });

  //   return wrapCollection([user]);
  // }
}
