export default {
  user: {
    auth: {},
  },
  domains: {
    users: [{
      name: 'User 1',
      id: '2',
      roles: ['1234'],
    }, {
      name: 'User 2',
      id: '3',
      roles: ['1235', '1234'],
    }],
    roles: [{
      name: 'Role name',
      id: '1234',
      permissions: ['permission A'],
    }, {
      name: 'another role',
      id: '1235',
      permissions: ['permission A', 'permission D'],
    }],
  },
};
