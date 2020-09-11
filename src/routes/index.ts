import users from './users.routes.ts';
import sessions from './sessions.routes.ts';
const data = {
  users: users.prefix('/users'),
  sessions: sessions.prefix('/sessions')
}

export default data
