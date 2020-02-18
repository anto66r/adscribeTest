import globalPermissions from 'config/permissions';
import IRole from 'types/role';

const getPermissions = (obj: string[] = []): string[] => globalPermissions.filter((item: string) => obj.includes(item));

const getRoles = (obj: string[] = [], roles: IRole[]): IRole[] => roles.filter((item: IRole) => obj.includes(item._id));

export { getPermissions, getRoles };
