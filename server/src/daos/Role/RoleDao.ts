import { wrapCollection } from '@daos';
import {
  Role, IRole, IRoleCollection,
} from '../../services';


export interface IRoleDao {
  getAll: () => Promise<IRoleCollection>;
  add: (role: IRole) => Promise<IRoleCollection>;
  update: (role: IRole) => Promise<IRoleCollection>;
  delete: (role: IRole) => Promise<IRoleCollection>;
}

export class RoleDao implements IRoleDao {
  public async getAll(): Promise<IRoleCollection> {
    return Role.find({})
      .lean()
      .then((roles) => wrapCollection(roles) as IRoleCollection)
      .catch((err) => wrapCollection([], err) as IRoleCollection);
  }

  public add(role: IRole): Promise<IRoleCollection> {
    return Role.create(role)
      .then(() => this.getAll())
      .catch((err) => wrapCollection([], err) as IRoleCollection);
  }

  public update(role: IRole): Promise<IRoleCollection> {
    // eslint-disable-next-line no-underscore-dangle
    return Role.findOneAndUpdate({ _id: role._id }, role, { runValidators: true })
      .then(() => this.getAll())
      .catch((err) => wrapCollection([], err) as IRoleCollection);
  }

  public delete(role: IRole): Promise<IRoleCollection> {
    return Role.deleteOne({ ...role, noDelete: false })
      .then(() => this.getAll())
      .catch((err) => wrapCollection([], err) as IRoleCollection);
  }
}
