import { UserDao } from './User/UserDao';
import { GroupDao } from './Group/GroupDao';

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
