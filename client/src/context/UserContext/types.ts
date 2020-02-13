import { Dispatch, SetStateAction } from 'react';

export interface UserType {
  username: string;
}

export interface CognitoAuthentication {
  CognitoUsername?: string;
  CognitoAccessToken?: string;
  CognitoIdToken?: string;
  CognitoRefreshToken?: string;
}

export interface UserContextProps {
  users: UserType[];
  user: UserType;
  cognito: CognitoAuthentication;
  remember: boolean;
  isLogged: boolean;
  setUser: Dispatch<SetStateAction<UserType>>;
  setCognito: Dispatch<SetStateAction<CognitoAuthentication>>;
  setRemember: Dispatch<SetStateAction<boolean>>;
  setLogged: Dispatch<SetStateAction<boolean>>;
  dispatch: any;
}
