import { getCookie, setCookie } from '../cookies';
import { getCognitoSignInUri } from '../cognito';

const secureFetch = (apiEndpoint: string) => new Promise((resolve, reject) => {
  const params = {
    method: 'GET',
    headers: {
      accesstoken: getCookie('CognitoAccessToken'),
    },
  };

  fetch(`${process.env.REACT_APP_API_URL}/${apiEndpoint.replace(/^\//, '')}`, params)
    .then((res) => {
      if (res.status !== 200) {
        throw res;
      }
      return res.json();
    })
    .then((res) => {
      resolve(res);
    })
    .catch((err: any) => {
      // we redirect to login and save current location

      if (err.status === 500) {
        // internal error
        console.log(err);
        reject(err);
      } else {
        setCookie('CognitoRedirectCall', window.location.href, 1);
        window.location.href = getCognitoSignInUri();
      }
      reject(err);
    });
});


export {
  secureFetch,
};
