import * as cognito from './cognito/login';
import * as cookies from './cookies';
import * as fetching from './fetching';
import * as roles from './roles';

export default {
  ...cookies,
  ...cognito,
  ...fetching,
  ...roles,
};
