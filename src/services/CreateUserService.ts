import User,{EUserType} from '../models/User.ts';
import UserRepository from '../repositories/UsersRepository.ts';
interface Request {
  name: string;
  email: string;
  password: string;
  type: EUserType;
}

class CreateUserService {
  private usersRepository:UserRepository
  constructor(usersRepository:UserRepository){
    this.usersRepository = usersRepository
  }
  public execute({name,email,password,type}:Request):User{
    const emailAlreadyExists = this.usersRepository.findByEmail(email)
    if(emailAlreadyExists){
      throw Error("Email already exist")
    }

    return this.usersRepository.create({name,email,password,type})
  }
}
export default CreateUserService;
