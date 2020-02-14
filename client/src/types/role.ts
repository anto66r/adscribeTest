interface IRole {
  name: string;
  _id?: string;
  permissions?: string[];
  noDelete?: boolean;
}

export default IRole;
