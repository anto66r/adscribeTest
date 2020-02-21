import { createContext, Context } from 'react';
import { getCookie } from '../../helpers/cookies';
import { IUserContextProps } from './types';


export const UserContext: Context<IUserContextProps> = createContext<IUserContextProps>({
  users: [],
  user: {
    username: getCookie('CognitoUsername'),
    id: '',
  },
  cognito: {
    cognitoUsername: '',
    cognitoAccessToken: '',
    cognitoIdToken: '',
    cognitoRefreshToken: '',
    cognitoId: '',
    userId: '',
    loginDate: undefined,
  },
  isLogged: false,
  setUser: () => {},
  setCognito: () => {},
  setLogged: () => {},
  dispatch: () => null,

});
