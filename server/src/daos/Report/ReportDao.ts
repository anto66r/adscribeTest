import { wrapCollection } from '@daos';
import { IReportDao } from 'src/daos/Report/types';
import {
  Report, IReport, IReportCollection,
} from '@services';

export class ReportDao implements IReportDao {
  public async add(report: IReport): Promise<IReportCollection> {
    return Report.create(report)
      .then(() => this.getByUserId(report.userId))
      .catch((err) => wrapCollection([], err) as IReportCollection);
  }

  public async update(report: IReport): Promise<IReportCollection> {
    // eslint-disable-next-line no-underscore-dangle
    return Report.findOneAndUpdate({ id: report.id }, report, { runValidators: true })
      .then(() => this.getByUserId(report.userId))
      .catch((err) => wrapCollection([], err) as IReportCollection);
  }

  public async delete(report: IReport): Promise<IReportCollection> {
    return Report.deleteOne({ ...report })
      .then(() => this.getByUserId(report.userId))
      .catch((err) => wrapCollection([], err) as IReportCollection);
  }

  public async getByUserId(id: string): Promise<IReportCollection> {
    return Report.find({ userId: id }).lean()
      .then((reports) => wrapCollection(reports) as IReportCollection)
      .catch((err: Error) => wrapCollection([], { data: err }) as IReportCollection);
  }

  public async getById(id: string): Promise<IReportCollection> {
    return Report.find({ id }).lean()
      .then((reports) => wrapCollection(reports) as IReportCollection)
      .catch((err: Error) => wrapCollection([], { data: err }) as IReportCollection);
  }
}
