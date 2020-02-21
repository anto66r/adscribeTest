import { Dispatch, SetStateAction } from 'react';

export interface UserType {
  username: string;
  id: string;
}

export interface ICognitoAuthentication {
  cognitoUsername: string;
  cognitoId: string;
  cognitoAccessToken: string;
  cognitoIdToken: string;
  cognitoRefreshToken: string;
  userId: string;
  loginDate?: Date | undefined;
}

export interface IUserContextProps {
  users: UserType[];
  user: UserType;
  cognito: ICognitoAuthentication;
  isLogged: boolean;
  setUser: Dispatch<SetStateAction<UserType>>;
  setCognito: Dispatch<SetStateAction<ICognitoAuthentication>>;
  setLogged: Dispatch<SetStateAction<boolean>>;
  dispatch: any;
}
