import { IReport, IReportCollection } from 'src/services';

export interface IReportDao {
  getById: (id: string) => Promise<IReportCollection>;
  getByUserId: (userId: string) => Promise<IReportCollection>;
  add: (report: IReport) => Promise<IReportCollection>;
  update: (report: IReport) => Promise<IReportCollection>;
  delete: (report: IReport) => Promise<IReportCollection>;
}
