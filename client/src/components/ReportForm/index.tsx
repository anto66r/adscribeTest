import React, { useState, FunctionComponent } from 'react';

import IReport from 'types/report';

type ContentProps = {
  report: IReport;
  loading?: boolean;
  onSubmit: (report: IReport) => void;
  onCancel: () => void;
};

const ReportForm: FunctionComponent<ContentProps> = (props: ContentProps) => {
  const {
    report, loading, onSubmit, onCancel,
  } = props;

  const [formName, setFormName] = useState(report?.name || '');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => setFormName(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit({
      ...report,
      name: formName,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        onChange={handleNameChange}
        value={formName}
      />
      <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default ReportForm;
