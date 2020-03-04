import { createContext, Context } from 'react';
import { getCookie } from '../../helpers/cookies';
import { IUserContextProps } from './types';


export const UserContext: Context<IUserContextProps> = createContext<IUserContextProps>({
  users: [],
  user: {
    email: getCookie('CognitoEmail'),
    id: '',
  },
  cognito: {
    cognitoEmail: '',
    cognitoAccessToken: '',
    authIdToken: '',
    cognitoRefreshToken: '',
    authId: '',
    userId: '',
    loginDate: undefined,
  },
  isLogged: false,
  setUser: () => {},
  setCognito: () => {},
  setLogged: () => {},
  dispatch: () => null,

});
