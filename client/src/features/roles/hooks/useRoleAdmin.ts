import { useStore } from 'store';
import { setRoles } from 'store/actions';

import { IRole, FetchAction, FetchMethod } from 'types';
import { useFetch } from 'hooks';

const actionToMethod: { [key: string]: FetchMethod } = {
  DELETE: FetchMethod.DELETE,
  CREATE: FetchMethod.POST,
  UPDATE: FetchMethod.PATCH,
};

type hookReturn = {
  handleSubmit: (role: IRole) => Promise<void>;
  loading: boolean;
}

type hookProps = {
  action: FetchAction;
  onError?: (message: string) => void;
  onSuccess?: () => void;
}

const useRoleAdmin = ({ action, onSuccess, onError }: hookProps): hookReturn => {
  const [, dispatch] = useStore();
  const {
    loading, doFetch,
  } = useFetch<IRole>();

  const handleSuccess = (data: IRole[]): void => {
    dispatch(setRoles(data));
    if (onSuccess) onSuccess();
  };

  const handleError = (e: string): void => {
    if (onError) onError(e);
  };

  const handleSubmit = async (role: IRole): Promise<void> => {
    doFetch({
      endpoint: '/roles',
      payload: role,
      // method: FetchMethod[actionToMethod[action]],
      method: actionToMethod[action],
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return { handleSubmit, loading };
};

export default useRoleAdmin;
