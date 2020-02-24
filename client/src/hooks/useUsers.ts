import { useStore } from 'store';
import { setUsers } from 'store/actions';
import { IUser } from 'types';

type hookReturn = {
  users: IUser[];
  setUsers: (users: IUser[]) => void;
}

const useUsers = (): hookReturn => {
  const [state, dispatch] = useStore();
  return {
    users: state.domains?.users || [],
    setUsers: (users: IUser[]): void => { dispatch(setUsers(users)); },
  };
};

export default useUsers;
