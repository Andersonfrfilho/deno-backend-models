import users from './users.routes.ts';

const data = {
  users: users.prefix('/users')
}

export default data
