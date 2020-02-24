import { wrapCollection } from '@daos';
import { IDomains, IUserDao } from 'src/daos/User/types';
import {
  Dashboard, IDashboard, IRole, IUser, IUserCollection, IUserGeneral, IUserGeneralCollection, Role, User,
} from 'src/services';

export class UserDao implements IUserDao {
  public async getAll(): Promise<IUserCollection> {
    return User.find({}).lean()
      .then((users) => wrapCollection(users) as IUserCollection)
      .catch((error) => wrapCollection([], error) as IUserCollection);
  }

  public async getById(_id: string): Promise<IUserCollection> {
    return User.find({ _id }).lean()
      .then((user) => wrapCollection(user, {}) as IUserCollection)
      .catch((error) => wrapCollection([], error) as IUserCollection);
  }

  public async getByCognitoId(cognitoId: string): Promise<IUserCollection> {
    return User.find({ cognitoId }).lean()
      .then((user) => wrapCollection(user) as IUserCollection)
      .catch((error: Error) => wrapCollection([], error) as IUserCollection);
  }

  public async getByUsername(username: string): Promise<IUserCollection> {
    return User.find({ username }).lean()
      .then((user) => wrapCollection(user, {}) as IUserCollection)
      .catch((error) => wrapCollection([], error) as IUserCollection);
  }

  public async getDomains(_id: string): Promise<IDomains> {
    const users = await User.find({}).lean<IUser>();
    const dashboards = await Dashboard.find({ userId: _id }).lean<IDashboard>() || {};
    const roles = await Role.find({}).lean<IRole>();
    return {
      users,
      dashboards,
      roles,
    };
  }

  public async getUserContext(_id: string): Promise<IUserGeneralCollection> {
    const user = await User.findById({ _id }).lean<IUser>();
    if (!user) throw Error(`No user found with id ${_id}`);
    const domains = await this.getDomains(_id);
    const userData: IUserGeneral = {
      user,
      domains,
    };
    return wrapCollection(userData, {}) as IUserGeneralCollection;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public add(user: IUser): Promise<IUserCollection> {
    // @ts-ignore
    return {} as IUserCollection;
  }

  public update(user: IUser): Promise<IUserCollection> {
    // eslint-disable-next-line no-underscore-dangle
    return User.findOneAndUpdate({ _id: user._id }, user, { runValidators: true })
      .then(() => this.getAll())
      .catch((error) => wrapCollection([], error) as IUserCollection);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public delete(_id: string): Promise<IUserCollection> {
    // @ts-ignore
    return {} as IUserCollection;
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
