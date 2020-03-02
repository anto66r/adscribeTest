export interface IUser {
  name: string;
  _id?: string;
  roles?: string[];
  email: string;
  isNew?: boolean;
  authId?: string;
}
