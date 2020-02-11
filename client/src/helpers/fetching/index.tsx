import { getCookie, setCookie } from '../cookies';

const secureFetch = (apiEndpoint: string) => new Promise((resolve, reject) => {
  const params = {
    method: 'GET',
    headers: {
      accesstoken: getCookie('CognitoAccessToken'),
    },
  };


  // @ts-ignore
  fetch(`${process.env.REACT_APP_API_URL}/${apiEndpoint.replace(/^\//, '')}`, params)
    .then(res => {
      if (res.status !== 200) {
        throw res;
      }
      return res.json();
    })
    .then(res => {
      resolve(res);
    })
    // @ts-ignore
    .catch((err: any) => {
      // we redirect to login and save current location
      if (err.status === 500) {
        // internal error
        console.log(err);
        reject(err);
      } else if (err.message === 'Failed to fetch') {
        reject(err.message);
      } else {
        setCookie('CognitoRedirectCall', window.location.href, 1);
        window.location.href = '/login';
      }
      reject(err);
    });
});


export {
  secureFetch,
};
