import UserRepository from '../repositories/UsersRepository.ts';
import { bcrypt,djwt } from '../../modules.ts';
import { Jose, Payload } from "https://deno.land/x/djwt/create.ts";
import User from '../models/User.ts';
interface Request {
  email:string;
  password:string;
}
interface Response {
  user:User,
  token:string
}
const key = "your-secret";

const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};

class AuthenticateUserService{
  private usersRepository:UserRepository
  constructor(usersRepository:UserRepository){
    this.usersRepository = usersRepository
  }
  public async execute({email,password}:Request):Promise<Response>{
    const user = this.usersRepository.findByEmail({email})
    if(!user){
      throw new Error('Incorrect email/password combination.')
    }
    const passwordMatched = await bcrypt.compare(password,user.password)
    if(!passwordMatched){
      throw new Error('Incorrect email/password combination.')
    }
    const payload: Payload = {
      iss: user.id,
      exp: djwt.setExpiration(60),
    };
    const token = await djwt.makeJwt({ header, payload, key })
    return {
      user,
      token
    }
  }
}
export default AuthenticateUserService
