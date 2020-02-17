import { createContext } from 'react';
import { getCookie } from '../../helpers/cookies';
import { IUserContextProps } from './types';


export const UserContext = createContext<IUserContextProps>({
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
    loginDate: undefined,
    remember: false,
  },
  remember: false,
  isLogged: false,
  setUser: () => {},
  setCognito: () => {},
  setRemember: () => {},
  setLogged: () => {},
  dispatch: () => null,

});
