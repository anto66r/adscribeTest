import {
  useReducer,
} from 'react';
import {
  secureFetch,
} from 'helpers/fetching';

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
  const doLoad = async () => {
    dispatch({
      type: 'fetch',
    });
    try {
      const response = await secureFetch(url);
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
