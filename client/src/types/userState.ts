import { ICognitoAuthentication } from '../context/UserContext/types';

export interface IUserState {
  userId: string;
  isLogged: boolean;
  auth: ICognitoAuthentication;
}
