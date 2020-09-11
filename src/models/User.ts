import { uuid } from '../../modules.ts';
enum EUserType {
  ADMIN="ADMIN",
  CLIENT="CLIENT"
}

class User{
  id:string;
  email:string;
  name:string;
  password:string;
  type:EUserType;
  constructor({name,email,password,type}:Omit<User,'id'>){
    this.id = uuid.v4.generate();
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }
}
export {
  User as default,
  EUserType
}
