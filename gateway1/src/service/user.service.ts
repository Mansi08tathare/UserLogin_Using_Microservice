import { HttpStatus, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { loginDto } from "src/dto/login.dto";
import { UserDto } from "src/dto/user.dto";

export class UserService{
    constructor(
      
        @Inject('USER_SERVICE')
        private readonly deviceProxy: ClientProxy,

      ) {}
    
      async addUser(body:UserDto) {
        try {
        console.log("body",body);
          let resp = await this.deviceProxy.send({ cmd: 'addUser' }, body).toPromise()
          return resp;
        } catch (err) {
            return err;
        }
      }


      async signIn(body:loginDto)
      {
        try{
          console.log("body",body);
          let resp = await this.deviceProxy.send({ cmd: 'signIn' }, body).toPromise();
          return resp;
        }
        catch(error)
        {
        return error;
        }
      }


     

    

}