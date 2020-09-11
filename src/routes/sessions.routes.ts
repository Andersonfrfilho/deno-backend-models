import { oak } from '../../modules.ts';
import { Request, Response } from "http://deno.land/x/oak/mod.ts";

import AuthenticateUserService from '../services/AuthenticateUserService.ts';
import UsersRepository from '../repositories/UsersRepository.ts';
const router = new oak.Router();
const usersRepository = new UsersRepository();
router
.post('/', async ({ request, response }: { request: any; response: any })=>{
  try{
    const {email,password} = await request.body().value;
    const authenticateUser = new AuthenticateUserService(usersRepository);
    console.log(authenticateUser)
    const {user,token} = await authenticateUser.execute({
      email,
      password
    })
    response.body={user,token}
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
