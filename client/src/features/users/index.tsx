import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { secureFetch } from '../../helpers/fetching';

const Users = () => {
  const [result, setResult] = useState('');
  const { cognito } = useContext(UserContext);


  const fetchUsers = async () => {
    const newResult = await secureFetch({
      endpoint: '/users',
      cognito,
    });
    setResult(JSON.stringify(newResult, null, 2));
  };

  useEffect(() => {
    fetchUsers();
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

export default Users;
