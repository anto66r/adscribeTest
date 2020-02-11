import { useReducer } from "react";

interface UserType {
  username?: string;
}

interface CognitoAuthentication {
  CognitoUsername?: string;
  CognitoAccessToken?: string;
  CognitoIdToken?: string;
  CognitoRefreshToken?: string;
}

type State = {
  users: UserType[];
  user: UserType;
  // cognito: CognitoAuthentication;
  // remember: boolean;
  // setUser: Dispatch<SetStateAction<UserType>>;
  // setCognito: Dispatch<SetStateAction<CognitoAuthentication>>;
  // setRemember: Dispatch<SetStateAction<boolean>>;
};

const initState: State = {
  users: [],
  user: {}
  // cognito: {}
};

type Action = { type: "setUsers"; payload: UserType[] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "setUsers":
      return {
        ...state,
        users: action.payload
      };
  }
  return state;
}

function useGlobalState(): { state: State; dispatch: any } {
  const [state, dispatch] = useReducer(reducer, initState);
  return { state, dispatch };
}

export default useGlobalState;
