import { secureFetch } from 'helpers/fetching';
import { useStore } from 'store';
import { setRoles } from 'store/actions';

import IRole from 'types/role';

const actionToMethod: { [key: string]: string } = {
  DELETE: 'DELETE',
  CREATE: 'POST',
  UPDATE: 'PATCH',
};

type hookReturn = {
  handleSubmit: (role: IRole) => Promise<void>;
}

type hookProps = {
  action: string;
  onError?: (message: string) => void;
  onSuccess?: () => void;
}

const useRoleAdmin = ({ action, onSuccess, onError }: hookProps): hookReturn => {
  const [, dispatch] = useStore();

  const handleSubmit = async (role: IRole): Promise<void> => {
    try {
      const response = await secureFetch({
        endpoint: '/roles',
        payload: role,
        method: actionToMethod[action],
      });
      if (response.error) throw Error(response.error.errmsg || response.error.message || response.error.errors?.message);
      dispatch(setRoles(response.data));
      if (onSuccess) onSuccess();
    } catch (e) {
      if (onError) onError(e.message);
    }
  };

  return { handleSubmit };
};

export default
useRoleAdmin;
