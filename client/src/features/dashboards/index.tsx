import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { secureFetch } from '../../helpers/fetching';
import { useStore } from '../../store';

const Dashboards = () => {
  const [result, setResult] = useState('');
  const [state, dispatch] = useStore();

  const fetchDashboards = async () => {
    console.log(state);
    const { userId, user } = state;
    const { auth } = user;
    const newResult = await secureFetch({
      endpoint: '/dashboards',
      payload: {
        userId,
      },
      auth,
    });
    setResult(JSON.stringify(newResult, null, 2));
  };

  useEffect(() => {
    fetchDashboards();
  }, []);


  return (
    <div>
      {result && (
        <>
          <h4>Result</h4>
          <pre>{result}</pre>
        </>
      )}
    </div>
  );
};

export default Dashboards;
