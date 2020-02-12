import { wrapCollection } from "@daos";
import { Role, IRoleCollection } from "../../services";

export interface IRoleDao {
  getAll: () => Promise<IRoleCollection>;
  add: (role: IRoleCollection) => Promise<void>;
  update: (role: IRoleCollection) => Promise<void>;
  delete: (_id: string) => Promise<void>;
}

export class RoleDao implements IRoleDao {
  /**
   *
   */
  // eslint-disable-next-line class-methods-use-this
  public async getAll(): Promise<IRoleCollection> {
    return Role.find({})
      .lean()
      .then(roles => wrapCollection(roles, {}))
      .catch(err => wrapCollection([], { data: err }));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public add(role: IRoleCollection): Promise<void> {
    return {} as any;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public update(role: IRoleCollection): Promise<void> {
    // TODO
    return {} as any;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  public delete(_id: string): Promise<void> {
    // TODO
    return {} as any;
  }
}
