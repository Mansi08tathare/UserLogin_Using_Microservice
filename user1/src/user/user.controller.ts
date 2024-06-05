import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { UserService } from "./user.service";
import { UserDto } from "./user.dto";


@Controller('user')
export class UserController{
    constructor(
        private readonly userService:UserService,
    ){}

    @MessagePattern({cmd:'addUser'})
    async addUser(body:UserDto){
        try{
        //const{role,email,password,name,mobile,agency,department}=body;
        let resp = await this.userService.addUser(body);
        return resp;
        }catch(err){
         console.log("err",err);
         return err;
        }
    }


    // @MessagePattern({cmd:'signIn'})
    // async signIn(body:UserDto)
    // {
    //     try{
    //         let resp = await this.userService.signIn(body);
    //         return resp;
    //         }catch(err){
    //          console.log("err",err);
    //          return err;
    //         }
    // }



    // @MessagePattern({ cmd: 'login' })
    // async signIn(data: { email: string; password: string }) {
    //   try {
    //     console.log("data", data)
    //    let resp = await this.userService.signIn(data);
       
    //    console.log("resp",resp)
    //    return resp
    //   } catch (error) {
    //     console.log(error)
    //     return error
    //   }
    // }










}