import * as cognito from './cognito';
import * as cookies from './cookies';
import * as fetching from './fetching';

export default {
  ...cookies,
  ...cognito,
  ...fetching,
};
