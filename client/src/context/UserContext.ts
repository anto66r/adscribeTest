import { createContext, Dispatch, SetStateAction } from "react";
import { getCookie } from "../helpers/cookies";

interface UserType {
  username: string;
}

interface CognitoAuthentication {
  CognitoUsername?: string;
  CognitoAccessToken?: string;
  CognitoIdToken?: string;
  CognitoRefreshToken?: string;
}

type ContextProps = {
  users: UserType[];
  user: UserType;
  cognito: CognitoAuthentication;
  remember: boolean;
  setUser: Dispatch<SetStateAction<UserType>>;
  setCognito: Dispatch<SetStateAction<CognitoAuthentication>>;
  setRemember: Dispatch<SetStateAction<boolean>>;
  dispatch: any;
};

export const UserContext = createContext<ContextProps>({
  users: [],
  user: {
    username: getCookie("CognitoUsername")
  },
  cognito: {
    CognitoUsername: "",
    CognitoAccessToken: "",
    CognitoIdToken: "",
    CognitoRefreshToken: ""
  },
  remember: false,
  setUser: () => {},
  setCognito: () => {},
  setRemember: () => {},
  dispatch: () => null
});
