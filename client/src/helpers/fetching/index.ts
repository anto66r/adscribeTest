import { cleanCookies } from 'helpers/cognito';
import { fetchMethod } from 'types';
import { getCookie, setCookie } from '../cookies';
import { HeaderType, SecureFetchType } from './types';

const secureFetch = ({
  endpoint,
  cognito,
  accessToken,
  payload,
  method,
}: SecureFetchType): Promise<any> => new Promise((resolve, reject) => {
  const params: HeaderType = {
    method: method || payload ? fetchMethod.POST : fetchMethod.GET,
    headers: {
      'Content-Type': 'application/json',
      accesstoken: getCookie('CognitoAccessToken')
        || cognito?.CognitoAccessToken || accessToken,
    },
  };

  if (payload && Object.keys(payload).length) {
    params.body = JSON.stringify(payload);
  }
  // @ts-ignore
  fetch(`${process.env.REACT_APP_API_URL}/${endpoint.replace(/^\//, '')}`, params)
    .then((res: Response) => {
      if (res.status !== 200) {
        throw res;
      }
      return res.json();
    })
    .then((res: Response) => {
      resolve(res);
    })
    // @ts-ignore
    .catch((err: any) => {
      // we redirect to login and save current location
      if (err.status === 404) reject(err);
      if (err.status === 401) {
        cleanCookies();
      }
      if (err.status === 500) reject(err);
      else if (err.message === 'Failed to fetch') {
        reject(err.message);
      } else {
        setCookie('CognitoRedirectCall', window.location.pathname, 1);
        window.location.href = '/';
      }
      reject(err);
    });
});


export {
  secureFetch,
};
