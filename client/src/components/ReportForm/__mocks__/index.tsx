import React, { FunctionComponent } from 'react';

import IReport from 'types/report';

type ContentProps = {
  report: IReport;
  loading?: boolean;
  onSubmit: (report: IReport) => void;
  onCancel: () => void;
};

const ReportForm: FunctionComponent<ContentProps> = (props: ContentProps) => {
  const { onCancel, onSubmit } = props;
  return (
    <form
      data-testid="pl2-report-form"
      onSubmit={
      (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); onSubmit({ name: 'Name', userId: '2' });
      }
    }
    >
      <button type="submit" data-testid="pl2-report-form--save">Save</button>
      <button onClick={onCancel} data-testid="pl2-report-form--cancel">Cancel</button>
    </form>
  );
};

export default ReportForm;
