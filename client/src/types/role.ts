
interface IRole {
  name: string;
  id: string;
  permissions?: string[];
  noDelete?: boolean;
}

export default IRole;
