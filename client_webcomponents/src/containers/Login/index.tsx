import * as React from 'react';

type LoginModel = {
  result: boolean;
  message: string;
}

const doApiCall = () => {

  const apiUrl = `localhost:4000/api/hello`;
  const headers = {}
  const params = {
    method: 'GET',
    headers,
    mode: 'cors',
  };

  fetch(`http://swapi.co/api/people/1/`)
    .then(res => res.json())
    .then(res => {
      const result: LoginModel = res;
      debugger;

    });
}


export const Login = () => {
  const [response, setResponse] = useState(0);
  return (
    <>
      <h1>Auth example</h1>
      <h3>Method: /api/hello</h3>

      <h4>Call example:</h4>
      <pre>
        {`
        app.controller("MyFirstAPI", function($scope, $http, $cookies) {
            $http({
                method: "GET",
                url: "/api/myfirstapi",
                headers: {
                    accesstoken: $cookies.get("ClientAccessToken") 
                    }
                }
            }).then(
                function success(response) {
                    //Authenticated. Do something with the response. 
                },
                function error(err) {
                    console.error(err);
                }
            );
        });
        `}

      </pre>
      <button onClick={doApiCall}>Test call</button>
      <code>
        {response}
      </code>
    </>
  );
};
