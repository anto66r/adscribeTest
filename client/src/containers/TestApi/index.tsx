import React, { useState } from 'react';
import { secureFetch } from '../../helpers/fetching';

const Index = () => {
  const defaultUrl = 'http://localhost:5000/api/users';
  const [apiUrl, setApiUrl] = useState(defaultUrl);
  const [result, setResult] = useState('');

  const doFetch = async () => {
    const newResult = await secureFetch('/users');
    setResult(JSON.stringify(newResult, null, 2));
  };

  return (
    <div>
      Call:
      <input style={{ width: 400 }} onChange={(e) => setApiUrl(e.target.value)} value={apiUrl} />
      <button className="btn btn-primary" onClick={doFetch}>Fetch</button>
      <br />
      {
        result && (
          <>
            <h4>Result</h4>
            <pre>
              {result}
            </pre>
          </>
        )
      }
    </div>
  );
};

export { Index };
