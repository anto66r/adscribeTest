import React, { FunctionComponent } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import IReport from 'types/report';
import ReportForm from 'components/ReportForm';
import useToast from 'hooks/useToast';
import { useItemAdmin, useReports } from 'hooks';
import useCurrentUser from 'hooks/useCurrentUser';

const ReportEdit: FunctionComponent = () => {
  const history = useHistory();
  const { reports, setReports } = useReports();
  const { id } = useParams<{ id: string }>();
  const { doSuccessToast, doErrorToast } = useToast();
  const currentUser = useCurrentUser();
  const goToReports = (): void => { history.push('/reports'); };

  const handleSuccess = (collection: IReport[]): void => {
    setReports(collection);
    doSuccessToast(id ? 'Report updated' : 'Role created');
    history.push('/reports');
  };
  const handleError = (message: string): void => { doErrorToast(message); };

  const { doUpdate, doCreate, loading } = useItemAdmin<IReport>({
    endpoint: '/reports',
  });

  const report = reports.find((item: IReport) => item?.id === id) || { userId: currentUser?.id || '' };
  const handleSubmit = (updatedReport: IReport): void => {
    if (id) {
      doUpdate({
        item: updatedReport,
        onSuccess: handleSuccess,
        onError: handleError,
      });
    } else {
      doCreate({
        item: updatedReport,
        onSuccess: handleSuccess,
        onError: handleError,
      });
    }
  };

  return (
    <ReportForm
      report={report}
      onSubmit={handleSubmit}
      onCancel={goToReports}
      loading={loading}
    />
  );
};

export default ReportEdit;
