import { useMemo } from 'react';
import { IRole } from 'types';
import Permission from 'types/permission';
import useCurrentUser from './useCurrentUser';
import useRoles from './useRoles';

const usePermissions = (): {
  checkPermissions: (permission: Permission) => boolean;
} => {
  const { roles: allRoles } = useRoles();
  const currentUser = useCurrentUser();
  const userRoles = (currentUser?.roles);

  const permissions = useMemo(() => allRoles.reduce(
    (acc: string[], cur: IRole) => {
      if (userRoles?.includes(cur.id)) acc.push(...cur.permissions || []);
      return acc;
    }, [] as string[],
  ), [userRoles]);

  const checkPermissions = (permission: Permission): boolean => permissions.includes(permission);
  return { checkPermissions };
};

export default usePermissions;
