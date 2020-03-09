import { useMemo } from 'react';
import { IRole } from 'types';
import useCurrentUser from './useCurrentUser';
import useRoles from './useRoles';

const usePermissions = (): {
  checkPermissions: (route: string) => boolean;
} => {
  const { roles: allRoles } = useRoles();
  const currentUser = useCurrentUser();
  const userRoles = (currentUser?.roles);

  const permissions = useMemo(() => allRoles.reduce(
    (acc: string[], cur: IRole) => {
      if (userRoles?.includes(cur._id)) acc.push(...cur.permissions || []);
      return acc;
    }, [] as string[],
  ), [userRoles]);

  const checkPermissions = (route: string): boolean => permissions.includes(route);
  return { checkPermissions };
};

export default usePermissions;
