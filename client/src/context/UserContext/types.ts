import { Dispatch, SetStateAction } from 'react';

export interface UserType {
  username: string;
  id: string;
}

export interface ICognitoAuthentication {
  cognitoUsername?: string;
  cognitoAccessToken?: string;
  cognitoIdToken?: string;
  cognitoRefreshToken?: string;
  loginDate?: Date | undefined;
  remember: boolean;
}

export interface IUserContextProps {
  users: UserType[];
  user: UserType;
  cognito: ICognitoAuthentication;
  remember: boolean;
  isLogged: boolean;
  setUser: Dispatch<SetStateAction<UserType>>;
  setCognito: Dispatch<SetStateAction<ICognitoAuthentication>>;
  setRemember: Dispatch<SetStateAction<boolean>>;
  setLogged: Dispatch<SetStateAction<boolean>>;
  dispatch: any;
}
