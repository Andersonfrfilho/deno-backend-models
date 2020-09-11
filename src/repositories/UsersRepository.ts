import User,{EUserType} from '../models/User.ts';

interface CreateUserDTO{
  name:string;
  email:string;
  password:string;
  type:EUserType
}

class UsersRepository {
  private users: Array<User>;

  constructor(){
    this.users = [];
  }
  public all():Array<User>{
    return this.users;
  }
  public findByEmail(email:string):User | null{
    return this.users.find(user=>user.email.toLowerCase()===email.toLowerCase()) || null;
  }
  public create({name,email,password,type}:CreateUserDTO): User{
    const user = new User({name,email,password,type});
    this.users.push(user)
    return user
  }
}

export default UsersRepository
