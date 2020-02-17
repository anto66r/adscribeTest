import { FetchMethod } from 'types';
import { CognitoAuthentication } from '../../context/UserContext/types';

export interface SecureFetchType {
  endpoint: string;
  cognito?: CognitoAuthentication;
  accessToken?: string;
  payload?: any;
  method?: FetchMethod;
}
export interface HeaderType {
  headers: {
    accesstoken?: string;
    'Content-Type': string;
  };
  method?: FetchMethod;
  body?: string;
}
