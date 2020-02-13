import { GroupDao } from './Group/GroupDao';
import { UserDao } from './User/UserDao';

interface ICollectionError {
  message?: string;
  technical?: string;
  code?: string;
  data?: object;
}

interface ICollection {
  data: any[];
  error: ICollectionError;
}

const wrapCollection = (data: any[], error: ICollectionError = {}) => ({
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
