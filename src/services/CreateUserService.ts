import User,{EUserType} from '../models/User.ts';
import UserRepository from '../repositories/UsersRepository.ts';
import { bcrypt } from '../../modules.ts';
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
  public async execute({name,email,password,type}:Request):Promise<User>{
    const emailAlreadyExists = this.usersRepository.findByEmail({email})
    if(emailAlreadyExists){
      throw Error("Email already exist")
    }
    const hashPassword = await bcrypt.hash(password)
    return this.usersRepository.create({name,email,password:hashPassword,type})
  }
}
export default CreateUserService;
