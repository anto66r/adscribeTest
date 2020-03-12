import Permission from 'types/permission';
import IRole from 'types/role';

const getPermissions = (obj: string[] = []): string[] => Object.values(Permission)
  .filter((item: string) => obj.includes(item));

const getRoles = (obj: string[] = [], roles: IRole[]): IRole[] => roles.filter((item: IRole) => obj.includes(item._id));

export { getPermissions, getRoles };
