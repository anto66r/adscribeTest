import { CognitoAuthentication } from '../../context/UserContext/types';

export interface SecureFetchType {
  endpoint: string;
  cognito?: CognitoAuthentication;
  accessToken?: string;
  payload?: object;
  method?: string;
}
export interface HeaderType {
  headers: {
    accesstoken?: string;
    'Content-Type': string;
  };
  method?: string;
  body?: string;
}
