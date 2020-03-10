import { wrapCollection } from '@daos';
import { IRoleDao } from 'src/daos/Role/types';
import {
  Role, IRole, IRoleCollection,
} from '@services';

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
