import { wrapCollection } from '@daos';
import { IUserCollection, User, IUser } from '../../services';

export interface IUserDao {
  getAll: () => Promise<IUserCollection>;
  add: (user: IUser) => Promise<IUserCollection>;
  update: (user: IUser) => Promise<IUserCollection>;
  delete: (user: IUser) => Promise<IUserCollection>;
}

export class UserDao implements IUserDao {
  public async getAll(): Promise<IUserCollection> {
    return User.find({}).lean()
      .then((users) => wrapCollection(users) as IUserCollection)
      .catch((err) => wrapCollection([], err) as IUserCollection);
  }

  public async findUser(username: string): Promise<IUserCollection> {
    return User.find({ username }).lean()
      .then((user) => wrapCollection(user, {}) as IUserCollection)
      .catch((err) => wrapCollection([], err) as IUserCollection);
  }

  public async getUserContext(): Promise<IUserCollection> {
    // @ts-ignore
    return User.find({}).lean()
      .then((users) => wrapCollection(users, {}))
      .catch((err) => wrapCollection([], { data: err }));
  }

  public add(user: IUser): Promise<IUserCollection> {
    return User.create(user)
      .then(() => this.getAll())
      .catch((err) => wrapCollection([], err) as IUserCollection);
  }

  public update(user: IUser): Promise<IUserCollection> {
    // eslint-disable-next-line no-underscore-dangle
    return User.findOneAndUpdate({ _id: user._id }, user, { runValidators: true })
      .then(() => this.getAll())
      .catch((err) => wrapCollection([], err) as IUserCollection);
  }

  public delete(user: IUser): Promise<IUserCollection> {
    return User.deleteOne({ ...user })
      .then(() => this.getAll())
      .catch((err) => wrapCollection([], err) as IUserCollection);
  }
}
