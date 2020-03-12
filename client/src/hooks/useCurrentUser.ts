import useUsers from 'hooks/useUsers';
import { useStore } from 'store';
import { IUser } from 'types';

const useCurrentUser = (): IUser | undefined => {
  const { users } = useUsers();
  const [state] = useStore();

  const { user } = state;
  const currentUser = users.find((item: IUser) => item.id === user.userId);
  return currentUser;
};

export default useCurrentUser;
