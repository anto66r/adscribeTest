export default {
  user: {
    auth: {},
  },
  domains: {
    reports: [{
      id: '1',
      name: 'Report for user 1',
      userId: '2',
    }, {
      id: '2',
      name: 'Report for user 2',
      userId: '3',
    }],
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
      permissions: ['permission A', 'users::view'],
    }, {
      name: 'another role',
      id: '1235',
      permissions: ['permission A', 'permission D'],
    }],
  },
};
