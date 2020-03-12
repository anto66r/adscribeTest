export interface IUser {
  name: string;
  id?: string;
  roles?: string[];
  email: string;
  isNew?: boolean;
  authId?: string;
}
