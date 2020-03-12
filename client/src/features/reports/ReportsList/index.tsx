import React, { FunctionComponent } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import IReport from 'types/report';
import Permission from 'types/permission';
import usePermissions from 'hooks/usePermissions';
import Item from './Item';

type ContentProps = {
  reports: IReport[];
};

const ReportsList: FunctionComponent<ContentProps> = ({ reports }) => {
  const { url } = useRouteMatch<{ url: string }>();
  const { checkPermissions } = usePermissions();

  return (
    <>
      <ul>
        {reports
          && reports.map((report: IReport) => <Item key={report.name} report={report} />)}
      </ul>
      {checkPermissions(Permission.REPORTS__CREATE) && <Link to={`${url}/create`}>Create new</Link>}
    </>
  );
};

export default ReportsList;
