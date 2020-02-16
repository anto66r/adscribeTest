/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer, useContext } from 'react';
import { secureFetch } from 'helpers/fetching';
import { UserContext } from 'context/UserContext';
import { fetchMethod } from 'types';

type DoFetchProps<T> = {
  endpoint: string;
  payload?: T;
  method?: fetchMethod;
  onSuccess?: (data: T[]) => void;
  onError?: (message: string) => void;
}

type State<T> = {
  loading: boolean;
  data: T[];
  error?: Error;
}

type Error = {
  message?: string;
  technical?: string;
  code?: string;
  data?: object;
}

const initState = {
  data: [],
  loading: false,
};

type Response = {
  data: any;
  error?: ICollectionError;
};

interface ICollectionError {
  message?: string;
  technical?: string;
  code?: string;
  data?: object;
}

type UseFetchReturn<T> = {
  loading: boolean;
  data: T[];
  error?: Error;
  doFetch: ({ endpoint, payload, method }: DoFetchProps<T>) => void;
}

type Action<T> =
  | { type: 'request' }
  | { type: 'success'; payload: T[] }
  | { type: 'failure'; error: string };

function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'request':
      return {
        ...state,
        error: {},
        loading: true,
      };
    case 'success':
      return {
        error: {},
        loading: false,
        data: action.payload,
      };
    case 'failure':
      return {
        ...state,
        loading: false,
        error: { message: action.error },
      };
    default:
      return state;
  }
};

function useFetch<T>(): UseFetchReturn<T> {
  const [{ loading, error, data }, dispatch] = useReducer<React.Reducer<State<T>, Action<T>>>(reducer, initState);
  const { cognito } = useContext(UserContext);

  function doFetch<T>({
    endpoint, payload, method, onSuccess, onError,
  }: DoFetchProps<T>): void {
    const fetchData = async (): Promise<void> => {
      try {
        dispatch({ type: 'request' });
        const results: Response = await secureFetch({
          endpoint,
          payload,
          cognito,
          method,
        });
        if (results.error && !results.error.message) throw Error(results.error.message);
        setTimeout(
          () => {
            dispatch({
              type: 'success',
              payload: results.data,
            });
            if (onSuccess) onSuccess(results.data);
          },
          1000,
        );
      } catch (message) {
        dispatch({ type: 'failure', error: message });
        console.log(message);
        if (onError) onError(message);
      }
    };
    fetchData();
  }
  return {
    loading,
    data,
    error,
    doFetch,
  };
};

export default useFetch;
