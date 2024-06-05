import { Controller, HttpCode, HttpStatus } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";


import { loginDto } from "./login.dto";
import { AuthService } from "./auth.service";
import { CONSTANT_MSG } from "src/common-dto/common-dto";
import { CommonService } from "src/common-service/common-service";


@Controller('user')
export class AuthController{
    constructor(
        private readonly authService:AuthService,
        private readonly commonService:CommonService
    ){}

   

    @MessagePattern({cmd:'signIn'})
    async signIn(body:loginDto)
    {
        try{
         
            let resp = await this.authService.signIn(body);
            // if(resp)
            // {
            //     return this.commonService.successMessage(resp,CONSTANT_MSG.LOGIN,HttpStatus.OK)
            // }
            // else{
            //     return this.commonService.errorMessage('',CONSTANT_MSG.NOT_FOUND,HttpStatus.NOT_FOUND)
            // }
           return resp
            }catch(err){
             console.log("err",err);
             return err;
            }
    }



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