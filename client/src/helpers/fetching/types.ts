import { fetchMethod } from 'types';
import { CognitoAuthentication } from '../../context/UserContext/types';

export interface SecureFetchType {
  endpoint: string;
  cognito?: CognitoAuthentication;
  accessToken?: string;
  payload?: any;
  method?: fetchMethod;
}
export interface HeaderType {
  headers: {
    accesstoken?: string;
    'Content-Type': string;
  };
  method?: fetchMethod;
  body?: string;
}
