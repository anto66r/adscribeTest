import { useStore } from 'store';
import { setRoles } from 'store/actions';
import { IRole } from 'types';

jest.mock('store/initialState');

type hookReturn = {
  roles: IRole[];
  setRoles: (roles: IRole[]) => void;
}

const useRoles = (): hookReturn => {
  const [state, dispatch] = useStore();
  return {
    roles: state.domains?.roles || [],
    setRoles: (roles: IRole[]): void => { dispatch(setRoles(roles)); },
  };
};

export default useRoles;
