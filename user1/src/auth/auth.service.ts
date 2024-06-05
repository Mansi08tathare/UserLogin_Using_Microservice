import { loginDto } from "./login.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { CommonService } from "src/common-service/common-service";
import { HttpStatus } from "@nestjs/common";
import { CONSTANT_MSG } from "src/common-dto/common-dto";
import * as bcrypt from 'bcrypt';
import { ConfigService } from "@nestjs/config";
import { JwtService } from '@nestjs/jwt/dist';
export class AuthService{
    constructor(
        private commonService:CommonService,
        private configService: ConfigService,
        private jwtService: JwtService,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        ){}

        
   async signIn(body:loginDto)  
   {
   try{
    const{Email,Password}=body;
   const user=await this.userRepository.findOne({where:{Email}});
   console.log("email",user);
   if(!user)
   {
    return this.commonService.errorMessage('', CONSTANT_MSG.EMAIL_NOT_FOUND, HttpStatus.NOT_FOUND)
  
   }

   console.log('Password1:', user.Password);
      console.log('Password2:', Password);


      let isPasswordMatch = await  bcrypt.compare(Password,user.Password)
      
     console.log("isPasswordMatch",isPasswordMatch);
      
      if(!isPasswordMatch)
      {
        return this.commonService.errorMessage('',CONSTANT_MSG.UNAUTHORIZED,HttpStatus.NOT_FOUND)
      }

      const payload = { id: user.id, Email: user.Email,
        //  role:user.role
         };
         console.log("payload",payload);

         const expiresIn = this.configService.get("JWT_EXPIRES_IN");
         console.log("expiresIn", expiresIn);
         
         const secretKey=this.configService.get("JWT_SECRET_KEY");
        console.log("secret key",secretKey)

        const accessToken = await this.jwtService.signAsync(payload, { secret: secretKey });
 
       // const accessToken = this.jwtService.sign(payload, { expiresIn: this.configService.get("JWT_EXPIRES_IN") });
        console.log("accessToken",accessToken);
      if(!accessToken)
      {
        return this.commonService.errorMessage('',CONSTANT_MSG.FAIL_TO_LOGIN,HttpStatus.BAD_REQUEST)
      }
      else{
       
        return this.commonService.successMessage(accessToken,CONSTANT_MSG.LOGIN,HttpStatus.OK)
      }
    }
   catch(error)
   {
    console.log("err",error)
    return error;
   }
}
}
