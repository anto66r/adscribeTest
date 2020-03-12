import { useStore } from 'store';
import { setUsers } from 'store/actions';
import { IUser } from 'types';

const useUsers = (): {
  users: IUser[];
  setUsers: (users: IUser[]) => void;
} => {
  const [state, dispatch] = useStore();
  return {
    users: state.domains?.users || [],
    setUsers: (users: IUser[]): void => { dispatch(setUsers(users)); },
  };
};

export default useUsers;
