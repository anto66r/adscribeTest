import { useContext, useReducer } from 'react';
import { secureFetch } from 'helpers/fetching';
import { UserContext } from '../context/UserContext';
import { CognitoAuthentication } from '../context/UserContext/types';

interface ICollectionError {
  message?: string;
  technical?: string;
  code?: string;
  data?: object;
}

interface IFetchError {
  message: string;
}

type State<T> = {
  data: T[];
  isLoading: boolean;
  error?: IFetchError;
};

type Response<T> = {
  data: T[];
  error?: ICollectionError;
};

const initState = {
  data: [],
  isLoading: false,
};

type Action<T> =
  | { type: 'request' }
  | { type: 'success'; results: Response<T> }
  | { type: 'failure'; error: string };

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'request':
      return {
        ...state,
        error: undefined,
        isLoading: true,
      };
    case 'failure':
      return {
        data: [],
        error: { message: action.error },
        isLoading: false,
      };
    case 'success':
      console.log(action);
      return {
        data: action.results.data,
        error: undefined,
        isLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
}

async function getJSON<T>(url: string, cognito: CognitoAuthentication): Promise<Response<T>> {
  return ((await secureFetch({
    endpoint: url,
    cognito,
  })) as unknown) as Response<T>;
}

// TODO: cuidadín con este any
function useFetch<T>(
  url: string,
  options?: any,
): { state: State<T>; doFetch: Function } {
  const [state, dispatch] = useReducer<React.Reducer<State<T>, Action<T>>>(
    reducer,
    initState,
  );

  const { cognito } = useContext(UserContext);

  function doFetch(): void {
    const FetchData = async () => {
      try {
        dispatch({ type: 'request' });
        const results: Response<T> = await getJSON<T>(url, cognito);
        dispatch({ type: 'success', results });
      } catch (error) {
        dispatch({ type: 'failure', error });
      }
    };
    FetchData();
  }

  return { state, doFetch };
}

export default useFetch;
