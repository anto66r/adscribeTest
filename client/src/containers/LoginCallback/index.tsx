import React from "react";
import { getUrlParamByName, setCookie } from "../../utils/general";


// http://localhost:3000/login/callback?code=6d30de35-2b90-4a1d-8af5-22e9eb0efb0b
const CognitoExampleCallback = () => {




  const code = getUrlParamByName('code')

  const params = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        code
    })
  }
  fetch('http://localhost:4000/auth',params)
    .then(res => res.json())
    .then(res => {
      debugger;
      // here should come the auth token for all calls and should be stored
      const token = res.token;
      setCookie('ClientAccessToken', token, 30);

    })

  // setCookie('ClientAccessToken', token, 30); // todo: change to global variable

  return (
  <div>
    Hallo! Logged!
  </div>
  )
}

export { CognitoExampleCallback }
