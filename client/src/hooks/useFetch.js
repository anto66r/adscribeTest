import {
  useContext,
  useReducer,
} from 'react';
import {
  secureFetch,
} from 'helpers/fetching';
import { UserContext } from '../context/UserContext';

const reducer = (state, {
  type,
  payload,
}) => {
  switch (type) {
    case 'fetch':
      return {
        loading: true,
      };
    case 'success':
      return {
        loading: false,
        data: payload,
      };
    case 'failure':
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

const useFetch = url => {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const { cognito } = useContext(UserContext);
  const doLoad = async () => {
    dispatch({
      type: 'fetch',
    });
    try {
      const response = await secureFetch({
        endpoint: url,
        cognito,
      });
      setTimeout(
        () => dispatch({
          type: 'success',
          payload: response.data,
        }),
        1000,
      );
    } catch (e) {
      dispatch({
        type: 'failure',
        payload: e,
      });
    }
  };
  return {
    ...state,
    doLoad,
  };
};

export default useFetch;
