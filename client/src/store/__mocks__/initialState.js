export default {
  user: {
    auth: {},
  },
  domains: {
    users: [{
      username: 'User 1',
      _id: '2',
      roles: ['1234'],
    }, {
      username: 'User 2',
      _id: '3',
      roles: ['1235', '1234'],
    }],
    roles: [{
      name: 'Role name',
      _id: '1234',
      permissions: ['permission A'],
    }, {
      name: 'another role',
      _id: '1235',
      permissions: ['permission A', 'permission D'],
    }],
  },
};
