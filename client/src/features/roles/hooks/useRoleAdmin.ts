import { useStore } from 'store';
import { setRoles } from 'store/actions';

import { FetchAction, FetchMethod } from 'types';
import { useFetch } from 'hooks';

const actionToMethod: { [key: string]: FetchMethod } = {
  DELETE: FetchMethod.DELETE,
  CREATE: FetchMethod.POST,
  UPDATE: FetchMethod.PATCH,
};

type hookReturn<T> = {
  handleSubmit: (item: T) => Promise<void>;
  loading: boolean;
}

type hookProps = {
  action: FetchAction;
  onError?: (message: string) => void;
  onSuccess?: () => void;
}

function useRoleAdmin<T>({
  action,
  onSuccess,
  onError,
}: hookProps): hookReturn<T> {
  const [, dispatch] = useStore();
  const {
    loading, doFetch,
  } = useFetch<T>();

  const handleSuccess = (data: T[]): void => {
    dispatch(setRoles(data));
    if (onSuccess) onSuccess();
  };

  const handleError = (e: string): void => {
    if (onError) onError(e);
  };

  const handleSubmit = async (item: T): Promise<void> => {
    doFetch({
      endpoint: '/roles',
      payload: item,
      method: actionToMethod[action],
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return { handleSubmit, loading };
};

export default useRoleAdmin;
