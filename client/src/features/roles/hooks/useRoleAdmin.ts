import { useState } from 'react';
import { secureFetch } from 'helpers/fetching';
import { useStore } from 'store';
import { setRoles } from 'store/actions';

import IRole from 'types/role';

const actionToMethod = (action: string): string => {
  switch (action) {
    case 'DELETE':
      return 'DELETE';
    case 'CREATE':
      return 'POST';
    case 'UPDATE':
      return 'PATCH';
    default:
      return '';
  }
};

type hookReturn = {
  handleSubmit: (role: IRole) => Promise<void>;
  error: string;
}

const useRoleAdmin = ({ action, onActionDone }: {action: string; onActionDone?: () => void}): hookReturn => {
  const [error, setError] = useState('');
  const [, dispatch] = useStore();

  const handleSubmit = async (role: IRole): Promise<void> => {
    try {
      const response = await secureFetch({
        endpoint: '/roles',
        payload: role,
        method: actionToMethod(action),
      });
      if (response.error) throw Error(response.error.errmsg);
      dispatch(setRoles(response.data));
      if (onActionDone) onActionDone();
    } catch (e) {
      setError(e.message);
    }
  };

  return { handleSubmit, error };
};

export default
useRoleAdmin;
