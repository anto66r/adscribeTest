import * as AWS from 'aws-sdk';
import { wrapCollection } from '@daos';
import { IDomains, IUserDao } from 'src/daos/User/types';
import {
  Dashboard, IDashboard, IRole, IUser, IUserCollection, IUserGeneral, IUserGeneralCollection, Role, User,
} from '@services';

AWS.config.update({
  accessKeyId: process.env.COGNITO_SERVER_APP_CLIENT_ID,
  secretAccessKey: process.env.COGNITO_SERVER_APP_CLIENT_SECRET,
  region: process.env.COGNITO_REGION,
});

const cognito = new AWS.CognitoIdentityServiceProvider();

export class UserDao implements IUserDao {
  public async getAll(): Promise<IUserCollection> {
    return User.find({}).lean()
      .then((users) => wrapCollection(users) as IUserCollection)
      .catch((error) => wrapCollection([], error) as IUserCollection);
  }

  public async getById(id: string): Promise<IUserCollection> {
    return User.find({ id }).lean()
      .then((user) => wrapCollection(user, {}) as IUserCollection)
      .catch((error) => wrapCollection([], error) as IUserCollection);
  }

  public async getByAuthId(authId: string): Promise<IUserCollection> {
    return User.find({ authId }).lean()
      .then((user) => wrapCollection(user) as IUserCollection)
      .catch((error: Error) => wrapCollection([], error) as IUserCollection);
  }

  public async getByEmail(email: string): Promise<IUserCollection> {
    return User.find({ email }).lean()
      .then((user) => wrapCollection(user, {}) as IUserCollection)
      .catch((error) => wrapCollection([], error) as IUserCollection);
  }

  public async getDomains(id: string): Promise<IDomains> {
    const users = await User.find({}).lean<IUser>();
    const dashboards = await Dashboard.find({ userId: id }).lean<IDashboard>() || {};
    const roles = await Role.find({}).lean<IRole>();
    return {
      users,
      dashboards,
      roles,
    };
  }

  public async getUserContext(id: string): Promise<IUserGeneralCollection> {
    const user = await User.find({ id }).lean<IUser>();
    if (!user || user.length === 0) throw Error(`No user found with id ${id}`);
    const domains = await this.getDomains(id);
    const userData: IUserGeneral = {
      user: user[0],
      domains,
    };
    return wrapCollection(userData, {}) as IUserGeneralCollection;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public async add(user: IUser): Promise<IUserCollection> {
    const {
      name, email, authId,
    } = user;

    // First we create the user in cognito
    if (!authId) {
      try {
        const userPoolId = process.env.COGNITO_USER_POOL;
        if (!userPoolId) {
          return wrapCollection([], {
            message: 'User Pool Id does not exist',
          }) as IUserCollection;
        }
        const createUserConfig = {
          DesiredDeliveryMediums: ['EMAIL'],
          ForceAliasCreation: true,
          UserAttributes: [
            {
              Name: 'name',
              Value: name,
            },
            {
              Name: 'email',
              Value: email,
            },
          ],
          Username: email,
          UserPoolId: userPoolId,
        };
        const result = await cognito.adminCreateUser(createUserConfig).promise();

        if (!result?.User?.Username) {
          return wrapCollection([], {
            message: 'User Login does not exist',
          }) as IUserCollection;
        }
        user.authId = result.User.Username;
      } catch (error) {
        if (error.code !== 'UserNotFoundException') {
          return wrapCollection([], error) as IUserCollection;
        }
      }
    }

    try {
      // Next we add it in mongo
      await User.create(user);
      const users = await this.getAll();
      return wrapCollection(users.data) as IUserCollection;
    } catch (error) {
      return wrapCollection([], error) as IUserCollection;
    }
  }

  public update(user: IUser): Promise<IUserCollection> {
    // eslint-disable-next-line no-underscore-dangle
    return User.findOneAndUpdate({ id: user.id }, user, { runValidators: true })
      .then(() => this.getAll())
      .catch((error) => wrapCollection([], error) as IUserCollection);
  }

  public async delete(id: string): Promise<IUserCollection> {
    // First we try to remove AWS credentials
    try {
      const userCollection = await this.getById(id);
      const user = userCollection.data[0];
      const { email } = user;

      await cognito.adminDeleteUser({
        UserPoolId: process.env.COGNITO_USER_POOL || '',
        Username: email,
      }).promise();
    } catch (error) {
      if (error.code !== 'UserNotFoundException') {
        return wrapCollection([], error) as IUserCollection;
      }
    }
    // Next we delete the user
    try {
      await User.deleteOne({ id });
      const users = await this.getAll();
      return wrapCollection(users.data) as IUserCollection;
    } catch (error) {
      return wrapCollection([], error) as IUserCollection;
    }
  }

  // public async createUser(username: string, authId: string): Promise<IUserCollection> {
  //   // Find if exists
  //   const possibleUser = await User.find({ username });

  //   if (possibleUser.length) {
  //     throw Error('User exists');
  //   }

  //   const user = await User.create({
  //     username,
  //     authId,
  //   });

  //   return wrapCollection([user]);
  // }
}
