import { UserContext } from 'context/UserContext';
import React, { useContext, useState } from 'react';
import { secureFetch } from '../../helpers/fetching';

const TestApi = () => {
  const defaultUrl = 'http://localhost:5000/api/users';
  const [apiUrl, setApiUrl] = useState(defaultUrl);
  const [result, setResult] = useState('');

  const { cognito } = useContext(UserContext);

  const doFetch = async () => {
    const newResult = await secureFetch({
      endpoint: '/users',
      cognito,
    });
    setResult(JSON.stringify(newResult, null, 2));
  };

  return (
    <div>
      Call:
      <input
        style={{ width: 400 }}
        onChange={e => setApiUrl(e.target.value)}
        value={apiUrl}
      />
      <button className="btn btn-primary" onClick={doFetch}>
        Fetch
      </button>
      <br />
      {result && (
        <>
          <h4>Result</h4>
          <pre>{result}</pre>
        </>
      )}
    </div>
  );
};

export default TestApi;
