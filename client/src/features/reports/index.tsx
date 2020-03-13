import React, { FunctionComponent } from 'react';
import {
  Route, useRouteMatch, Switch, Redirect,
} from 'react-router-dom';

import { useReports } from 'hooks';
import usePermissions from 'hooks/usePermissions';
import Permission from 'types/permission';
import ReportsList from './ReportsList';
import ReportsEdit from './ReportsEdit';

const Reports: FunctionComponent = () => {
  const { path } = useRouteMatch();
  const { checkPermissions } = usePermissions();
  const { reports } = useReports();

  return (
    <>
      <h1>Reports</h1>
      <Switch>
        {
          checkPermissions(Permission.REPORTS__VIEW)
          && (
          <Route exact path={path}>
            <ReportsList reports={reports} />
          </Route>
          )
        }
        {
          checkPermissions(Permission.REPORTS__CREATE)
          && <Route exact path={`${path}/create`} component={ReportsEdit} />
        }
        {
          checkPermissions(Permission.REPORTS__UPDATE)
          && <Route exact path={`${path}/edit/:id`} component={ReportsEdit} />
        }
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};
export default Reports;
