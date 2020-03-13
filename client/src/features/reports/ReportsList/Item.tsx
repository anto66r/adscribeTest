import React, { FunctionComponent } from 'react';

import { IReport } from 'types';
import useToast from 'hooks/useToast';
import { useItemAdmin, useReports } from 'hooks';
import usePermissions from 'hooks/usePermissions';
import Permission from 'types/permission';
import { useRouteMatch, Link } from 'react-router-dom';

type PropsType = {
  report: IReport;
};

const Item: FunctionComponent<PropsType> = props => {
  const { report } = props;
  const { setReports } = useReports();
  const { url } = useRouteMatch<{ url: string }>();
  const { checkPermissions } = usePermissions();
  const { doSuccessToast, doErrorToast } = useToast();

  const { doDelete, loading } = useItemAdmin<IReport>({
    endpoint: '/reports',
  });
  const handleDelete = (): void => {
    doDelete({
      item: report,
      onSuccess: (collection: IReport[]): void => {
        setReports(collection);
        doSuccessToast('Report deleted');
      },
      onError: (message: string): void => { doErrorToast(message); },
    });
  };

  return (
    <li key={report.id}>
      {
        checkPermissions(Permission.REPORTS__UPDATE)
          ? (
            <Link to={`${url}/edit/${report.id}`} data-testid="pl2-report-item--updateLink">
              {report.name}
            </Link>
          )
          : report.name
      }
      {
        checkPermissions(Permission.REPORTS__DELETE) && (
          <button disabled={loading} onClick={handleDelete} data-testid="pl2-report-item--delete">
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        )
      }
    </li>
  );
};

export default Item;
