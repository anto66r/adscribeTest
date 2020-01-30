import React, {useState} from "react"
import {getCookie} from "../../utils/general";



const TestApi = () => {

  const defaultUrl = "http://localhost:4000/api/hello";
  const [apiUrl, setApiUrl] = useState(defaultUrl);
  const [result, setResult] = useState('');

  const doFetch = () => {

    debugger;
    const headers = {
      accesstoken: getCookie('AuthToken'),
    }
    const params = {
      method: 'GET',
      accesstoken: getCookie('AuthToken'),
      headers,
    };

    // http://localhost:4000/users
    debugger;
    fetch(apiUrl, params)
      .then(res => {
        debugger;
        return res.json();
      })
      .then(res => {
        debugger;
        setResult(JSON.stringify(res))
      })
      .catch(err => {
        console.log(err);
        debugger;
      })

  }


  return (
    <div>
      Call: <input style={{width: 400}} onChange={(e) => setApiUrl(e.target.value)} value={apiUrl}/>
      <button className="btn btn-primary" onClick={doFetch}>Fetch</button>
      <br/>
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
  )
}

export {TestApi}
