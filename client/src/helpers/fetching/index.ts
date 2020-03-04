import { FetchMethod } from 'types';
import { refreshSession } from 'helpers/cognito/login';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ICognitoSessionModel } from 'helpers/cognito/types';
import { getCookie } from '../cookies';
import { HeaderType, SecureFetchType, IAxiosConfig } from './types';
import { cleanCookies } from '../cognito/utils';

const secureFetch = ({
  endpoint,
  auth,
  accessToken,
  payload,
  method,
}: SecureFetchType): Promise<any> => new Promise((resolve, reject) => {
  let fetchMethod = method;
  if (!method) fetchMethod = payload ? FetchMethod.POST : FetchMethod.GET;
  const params: HeaderType = {
    method: fetchMethod,
    headers: {
      'Content-Type': 'application/json',
      accesstoken: getCookie('CognitoAccessToken')
        || auth?.cognitoAccessToken || accessToken,
    },
  };

  const axiosConfig: IAxiosConfig = {
    ...params,
    url: `${process.env.REACT_APP_API_URL}/${endpoint.replace(/^\//, '')}`,
    data: payload,
  };

  // Intercept 401 and resend refresh token
  // @ts-ignore
  axios.interceptors.response.use(null, (error: AxiosError) => {
    if (error?.config?.url?.includes('/api/users/login')) {
      return Promise.reject(error);
    }
    if (error.config && error.response && error.response.status === 401) {
      return refreshSession()
        .then((newSession: ICognitoSessionModel) => {
          error.config.headers.accesstoken = newSession.accessToken.jwtToken;
          return axios.request(error.config);
        })
        .catch(e => {
          cleanCookies();
          window.location.href = '/';
        });
    }
    // we redirect to login and save current location
    if (error?.response?.status === 404) return Promise.reject(error);
    if (error?.response?.status === 500) return Promise.reject(error);
    return Promise.reject(error);
  });

  axios.request(axiosConfig as AxiosRequestConfig)
    .then((res: AxiosResponse) => {
      resolve(res.data);
    })
    .catch((err: Error) => {
      reject(err);
    });
});

export {
  secureFetch,
};
