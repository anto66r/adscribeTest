import React, {useState} from "react";
import {getCookie} from "../../utils/general";
import {isLogged} from "../../api/users";
import Login from "../Login";

type LoginModel = {
  result: boolean;
  message: string;
}


export const CognitoExample = () => {
  const [response, setResponse] = useState({});

  const doApiCall = () => {

    const apiUrl = `http://localhost:4000/api/hello`;
    const headers = {}
    const params = {
      method: 'GET',
      accesstoken: getCookie('ClientAccessToken'),
      headers,
    };

    // http://localhost:4000/users
    fetch(apiUrl, params)
      .then(res => res.json())
      .then(res => {
        const result: LoginModel = res;
        setResponse(result);
      })
      .catch(err => {
        console.log(err);
        debugger;
      })
  }


  return isLogged() ? (

    <>
      <h1>Auth example</h1>
      <h3>Method: /api/hello</h3>

      <h4>Call example:</h4>
      <pre>
        GET localhost:4000/api/hello
      </pre>
      <button onClick={() => doApiCall()}>Test call</button>
      <pre>
        {JSON.stringify(response)}
      </pre>
    </>

  ) : (
    <Login/>
  )

};
