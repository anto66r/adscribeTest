import { IUserCollection } from '../../../../server/src/services';
import { ICognitoAuthentication } from '../../context/UserContext/types';

export interface ILoginResult {
  user: IUserCollection;
  auth: ICognitoAuthentication;
}

export interface ICognitoSessionModel {
  accessToken: {
    jwtToken: string;
  };
  idToken: {
    jwtToken: string;
    payload?: {
      email: string;
      'cognito:username': string;
    };
  };
  refreshToken: {
    token: string;
  };
}
