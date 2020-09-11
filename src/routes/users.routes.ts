import { oak } from '../../modules.ts';
import { Request, Response } from "http://deno.land/x/oak/mod.ts";

import UsersRepository from '../repositories/UsersRepository.ts';
import CreateUserService from '../services/CreateUserService.ts';
const router = new oak.Router();
const usersRepository = new UsersRepository();
router
.get('/',({ request,response }: { request:Request,response: Response })=>{
  response.body = usersRepository.all()
})
.post('/', async ({ request, response }: { request: Request; response: Response })=>{
  try{

    const {name,email,password,type} = await request.body().value;
    //transformações de dados ficam aqui
    if (!request.hasBody) {
      response.status = 400;
      response.body = {
        success: false,
        message: "No data provided",
      }
      return;
    }
    const createUser = new CreateUserService(usersRepository);

    const user = createUser.execute({name,email,password,type})

    response.body=user
  }catch (err) {
    response.status = 400;
    response.body = {
      success: false,
      message: "No data provided",
    }
    return;
  }
})
export default router
