import { createContext } from 'react';
import { getCookie } from '../../helpers/cookies';
import { UserContextProps } from './types';


export const UserContext = createContext<UserContextProps>({
  user: {
    username: getCookie('CognitoUsername'),
  },
  cognito: {
    CognitoUsername: '',
    CognitoAccessToken: '',
    CognitoIdToken: '',
    CognitoRefreshToken: '',
  },
  remember: false,
  isLogged: false,
  setUser: () => {},
  setCognito: () => {},
  setRemember: () => {},
  setLogged: () => {},
});
