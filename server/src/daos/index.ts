import { UserDao } from './User/UserDao';
import { GroupDao } from './Group/GroupDao';

interface ICollectionError {
  message?: string;
  technical?: string;
  code?: string;
  data?: object;
}

interface ICollection {
  data: object;
  error: ICollectionError;
}

const wrapCollection = (data: [], error: ICollectionError = {}) => ({
  data,
  error,
});

export {
  UserDao,
  GroupDao,
  ICollectionError,
  ICollection,
  wrapCollection,
};
