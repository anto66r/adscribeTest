import { ICognitoAuthentication } from '../../context/UserContext/types';

export interface SecureFetchType {
  endpoint: string;
  auth?: ICognitoAuthentication;
  accessToken?: string;
  payload?: any;
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
export interface IAxiosConfig {
  headers: {
    accesstoken?: string;
    'Content-Type': string;
  };
  method?: string;
  data: any | undefined;
  body?: string;
  url: string;
}
