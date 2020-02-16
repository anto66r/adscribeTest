import globalPermissions from 'config/permissions';

const getPermissions = (obj: string[] = []): string[] => globalPermissions.filter((item: string) => obj.includes(item));

export { getPermissions };
