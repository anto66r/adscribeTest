import React from 'react';
import { IDashboard } from './types';
import { useStore } from '../../store';

const Dashboards = () => {
  const [state] = useStore();
  const { loaded, dashboards } = state.domains;
  return (
    <div>
      {loaded && (
        <>
          <h4>Result</h4>
          {
            dashboards.map((dashboard: IDashboard) => <li key={dashboard.name}>{dashboard.name}</li>)
          }
        </>
      )}
    </div>
  );
};

export default Dashboards;
