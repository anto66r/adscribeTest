enum Permission {
  USERS__CREATE = 'users::create',
  USERS__DELETE = 'users::delete',
  USERS__UPDATE = 'users::update',
  USERS__VIEW = 'users::view',
  USERS__DETAIL = 'users::detail',
  USERS_ROLES__ASSIGN = 'users|roles::assign',
  ROLES__CREATE = 'roles::create',
  ROLES__DELETE = 'roles::delete',
  ROLES__UPDATE = 'roles::update',
  ROLES__VIEW = 'roles::view',
  ROLES__DETAIL = 'roles::detail',
  REPORTS__VIEW = 'reports::view',
  REPORTS__UPDATE = 'reports::update',
  REPORTS__DELETE = 'reports::delete',
  REPORTS__CREATE = 'reports::create',
}

export default Permission;
